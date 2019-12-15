import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {validate} from 'email-validator';
import Papa from 'papaparse';
// COMPONENTS
import EmployeeForm from 'components/forms/EmployeeForm';
import EmployeesTable from 'components/common/EmployeesTable';
import Alert from 'components/common/Alert';
import UploadBlock from './UploadBlock';
import message from 'components/common/message';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
// import Downloading from './Downloading';
import DownloadEmployees from './DownloadEmployees';
// APOLLO
import {graphql, Query} from 'react-apollo';
import compose from 'lodash/flowRight';
import newEmployeesUpload from 'ApolloClient/Mutations/newEmployeesUpload';
import employeesQuery from 'ApolloClient/Queries/employees';
import saveEmployee from 'ApolloClient/Mutations/saveEmployee';
import updateEmployeesUpload from 'ApolloClient/Mutations/updateEmployeesUpload';
import checkEmployeesCSV from 'ApolloClient/Mutations/checkEmployeesCSV';
import singleUpload from 'ApolloClient/Mutations/singleUpload';
import saveAttachment from 'ApolloClient/Mutations/saveAttachment';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
import ErrorHelpers from 'lib/helpers/ErrorHelpers';

const PinkText = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
  cursor: pointer;
  color: ${p => p.theme.colors.support2};
  &:hover {
    color: ${p => p.theme.colors.support1};
  }
`;

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${p => p.theme.colors.primary1};
`;

/**
 * 1. Check if we have correct number of columns
 * 2. Check if all emails are valid
 * 3. Check that all values exist in each row?
 * 4. Check if any of the employees already exist
 */

class Employees extends React.PureComponent {
  state = {
    loading: false,
    editManually: false,
    selectedEmployee: null,
    //
    skip: 0,
    current: 1,
    sortBy: 'lastNameAscend',
    updateErrors: [],
  };
  /**
   * formatRow takes in a CSV row and parses it into a structure we want for passing into the mutation
   */
  formatRow = row => {
    return {
      firstName: row['First Name'],
      lastName: row['Last Name'],
      //email: row['E-Mail'],
      email: `arcomito+${row['EAID']}@gmail.com`,
      assignedId: row['EAID'],
      assignedCustomerId: row['COID'],
      gender: row['Gender'] === 'M' ? 'male' : 'female',
      hireDate: moment(row['Hire Date YYYYMMDD'], 'YYYYMMDD')
        .valueOf()
        .toString(),
      dob: moment(row['Birth Date YYYYMMDD'], 'YYYYMMDD')
        .valueOf()
        .toString(),
      street: row[' Address'],
      zip: row['Zip Code'],
      state: row['State '],
      ssn: row['SSN/Fed ID'],
      city: row['City'],
      status: row['Status'],
    };
  };
  /**
   * getInvalidEmails takes in the parsed result and will check for invalid emails each row
   */
  getInvalidEmails = results => {
    let invalidEmails = [];
    results.data.forEach((item, i) => {
      let email = item['E-Mail'];
      if (item['EAID']) {
        if (!email) {
          invalidEmails.push(`Email does not exist for row ${i + 2}`);
        }
        if (email && !validate(email)) {
          invalidEmails.push(`Email is invalid for row ${i + 2}: ${email}`);
        }
      }
    });
    return invalidEmails;
  };
  /**
   *
   */
  getFormatted = results => {
    let formattedData = [];
    results.data.forEach(item => {
      if (item['EAID']) {
        formattedData.push(this.formatRow(item));
      }
    });
    return formattedData;
  };

  /**
   * afterParse is called when adding new employees, right after papaparse finishes parsing the CSV
   */
  afterParseAdd = async (results, file) => {
    try {
      // 1. make sure the spreadsheet has the correct number of columns
      if (results.meta.fields.length !== 15) {
        return this.setState({
          errors: [
            `This spreadsheet contains ${results.meta.fields.length} columns, not the required 15`,
          ],
        });
      }

      // 2. make sure the emails are all valid
      let invalidEmails = this.getInvalidEmails(results);

      if (invalidEmails.length > 0) {
        return this.setState({
          loading: false,
          errors: invalidEmails,
        });
      }

      let formattedData = this.getFormatted(results);

      // Do server check to see if these people already exist
      let mutationResult = await this.props.checkEmployeesCSV({
        variables: {
          values: formattedData.map(item => ({
            companyAssignedId: item.assignedCustomerId,
            employeeAssignedId: item.assignedId,
          })),
        },
      });

      //if server check fails, we show the errors that we got back
      if (!mutationResult.data.checkEmployeesCSV.success) {
        return this.setState({
          errors: mutationResult.data.checkEmployeesCSV.errors,
        });
      }

      // if all is sell, upload new employees
      let dataUploadResult = await this.props.newEmployeesUpload({
        variables: {
          employees: formattedData,
        },
      });
      if (dataUploadResult.data.newEmployeesUpload.success) { 
        return this.setState({loading: false, successfulAdd: true});
      }

      return this.setState({ errors: dataUploadResult.data.newEmployeesUpload.errors, loading: false})
      // upload file to s3
      // let uploadResult = await this.props.singleUpload({
      //   variables: {
      //     file: this.state.file,
      //   },
      // });

      // if (uploadResult.data.singleUpload) {
      //   const {filename, mimetype, url, key} = uploadResult.data.singleUpload;
      //   await this.props.saveAttachment({
      //     variables: {
      //       params: {
      //         filename,
      //         mimetype,
      //         url,
      //         key,
      //         customerId: this.props.customer.id,
      //         type: 'EmployeeUploads',
      //       },
      //     },
      //   });
      //}

    } catch (err) {
      this.setState({loading: false});
      console.log(err);
    }
  };
  afterParseUpdate = async (results, file) => {
    // 1. make sure the spreadsheet has the correct number of columns
    if (results.meta.fields.length !== 15) {
      return this.setState({
        loading: false,
        updateErrors: [
          `This spreadsheet contains ${results.meta.fields.length} columns, not the required 15`,
        ],
      });
    }

    // 2. make sure the emails are all valid
    let invalidEmails = this.getInvalidEmails(results);

    if (invalidEmails.length > 0) {
      return this.setState({
        loading: false,
        updateErrors: invalidEmails,
      });
    }

    let formattedData = this.getFormatted(results);

    try {
      let mutationResult = await this.props.updateEmployeesUpload({
        variables: {
          employees: formattedData,
        },
      });
      //if server check fails, we show the errors that we got back
      if (!mutationResult.data.updateEmployeesUpload.success) {
        return this.setState({
          loading: false,
          updateErrors: mutationResult.data.updateEmployeesUpload.errors,
        });
      }

      // upload file to s3
      // let uploadResult = await this.props.singleUpload({
      //   variables: {
      //     file: this.state.file,
      //   },
      // });

      // if (uploadResult.data.singleUpload) {
      //   const {filename, mimetype, url, key} = uploadResult.data.singleUpload;
      //   await this.props.saveAttachment({
      //     variables: {
      //       params: {
      //         filename,
      //         mimetype,
      //         url,
      //         key,
      //         customerId: this.props.customer.id,
      //         type: 'EmployeeUploads',
      //       },
      //     },
      //   });
      // }

      this.setState({loading: false, successfulUpdate: true});
    } catch (err) {
      return this.setState({
        loading: false,
        updateErrors: [err.message],
      });
    }
  };
  handleUpload = (file, complete) => {
    this.setState({
      loading: true,
      updateErrors: [],
      errors: [],
      file,
    });
    Papa.parse(file, {
      header: true,
      complete,
    });
  };
  onSave = async values => {
    try {
      await this.props.saveEmployee({
        variables: {
          id: this.state.selectedEmployee.id,
          params: {
            ...values,
          },
        },
        refetchQueries: [
          {
            query: employeesQuery,
            variables: {
              customerId: this.props.customer.id,
              skip: this.state.skip,
              sortBy: this.state.sortBy,
            },
          },
        ],
      });
      message.success('Employee successfully updated');
      this.setState({
        selectedEmployee: null,
      });
    } catch (err) {
      ErrorHelpers.handleError(err);
      this.setState({errors: [err.message]});
      console.log(err.message);
    }
  };
  handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      let sortBy = `${sorter.columnKey}${helpers.capitalize(sorter.order)}`;
      this.setState({sortBy});
    }
  };
  render() {
    /*
      IF THE USER CLICKS ON A EMPLOYEE IN THE EMPLOYEES TABLE,
      WE WILL SHOW THE FORM WITH THAT EMPLOYEES DATA. 
      THE USER CAN THEN EDIT THE RECORD
    */

    if (this.state.selectedEmployee) {
      return (
        <React.Fragment>
          <EmployeeForm
            {...this.state.selectedEmployee}
            onSubmit={this.onSave}
            customerId={this.props.customer.id}
            loading={this.state.loading}
            onCancel={() => this.setState({selectedEmployee: null})}
          />{' '}
          {this.state.errors && (
            <div style={{marginTop: 16, width: 500, maxWidth: '100%'}}>
              <ErrorBlock errors={this.state.errors} />
            </div>
          )}
        </React.Fragment>
      );
    }

    /*
      IF THE USER CHOOSES TO EDI MANUALLY, WE"LL SHOW THE EMPLOYEES TABLE 
      WHERE THEY CAN CLICK TO SELECT AN EMPLOYEE TO EDIT
    */

    if (this.state.editManually) {
      return (
        <React.Fragment>
          <div
            style={{
              cursor: 'pointer',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => this.setState({editManually: null})}
          >
            <Icon type="left" style={{fontSize: 13, marginRight: 4}} />
            Back
          </div>
          <Query
            query={employeesQuery}
            variables={{
              customerId: this.props.customer.id,
              skip: this.state.skip,
              sortBy: this.state.sortBy,
            }}
          >
            {({data, loading, error}) => {
              if (error) return 'error';
              return (
                <EmployeesTable
                  history={this.props.history}
                  dataSource={!loading ? data.employees.employees : []}
                  total={!loading ? data.employees.count : null}
                  loading={loading}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => this.setState({selectedEmployee: record}),
                    };
                  }}
                  handleTableChange={this.handleTableChange}
                  onPageChange={page =>
                    this.setState({
                      skip: page === 1 ? 0 : (page - 1) * 5,
                      current: page,
                    })
                  }
                  current={this.state.current}
                />
              );
            }}
          </Query>
        </React.Fragment>
      );
    }
    /*
      BY DEFAULT WE WILL SHOW THE UPLOAD BUTTON OPTIONS
    */
    return (
      <div style={{width: 700, maxWidth: '100%'}}>
        <SectionTitle>ADD NEW EMPLOYEES TO THE DATABASE</SectionTitle>
        {/* <Query
          query={getAttachment}
          pollInterval={600000} // every ten minutes
          variables={{
            customerId: this.props.customer.id,
            type: 'EmployeeUploads',
          }}
        >
          {({data, loading, error}) => {
            if (loading) return <Icon type="loading" />;
            if (error) return 'error';
            if (!data.getAttachment) return null;
            return (
              <FileRow
                filename={data.getAttachment.filename}
                url={data.getAttachment.url}
                onDelete={() =>
                  console.log(data.getAttachment.id, 'EmployeeUploads')
                }
              />
            );
          }}
        </Query> */}
        {this.state.successfulAdd && (
          <Alert
            message="Upload Success"
            description="Your employees were successfully added"
            type="success"
            closable
            showIcon
          />
        )}
        <div style={{height: 24}} />
        <UploadBlock
          name="file"
          errors={this.state.errors || []}
          loading={this.state.loading}
          onChange={file => this.handleUpload(file, this.afterParseAdd)}
          buttonText="Upload New Employees"
        />
        <SectionTitle style={{marginTop: 48}}>
          UPDATE EXISTING EMPLOYEE RECORDS
        </SectionTitle>
        {this.state.successfulUpdate && (
          <Alert
            message="Upload Success"
            description="Employees were successfully updated"
            type="success"
            closable
            showIcon
          />
        )}
        <div style={{height: 24}} />
        <UploadBlock
          name="file-update"
          errors={this.state.updateErrors || []}
          loading={this.state.loading}
          onChange={file => this.handleUpload(file, this.afterParseUpdate)}
          buttonText="Upload Employee Updates"
        />
        <PinkText onClick={() => this.setState({editManually: true})}>
          Click here to manually update individual employee records
        </PinkText>
        <DownloadEmployees customer={this.props.customer} />
      </div>
    );
  }
}

export default compose(
  graphql(saveEmployee, {name: 'saveEmployee'}),
  graphql(newEmployeesUpload, {name: 'newEmployeesUpload'}),
  graphql(checkEmployeesCSV, {name: 'checkEmployeesCSV'}),
  graphql(updateEmployeesUpload, {name: 'updateEmployeesUpload'}),
  graphql(singleUpload, {name: 'singleUpload'}),
  graphql(saveAttachment, {name: 'saveAttachment'})
)(Employees);
