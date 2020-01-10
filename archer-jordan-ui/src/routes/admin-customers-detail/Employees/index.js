import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
// COMPONENTS
import EmployeeForm from 'components/forms/EmployeeForm';
import EmployeesTable from 'components/common/EmployeesTable';
import Alert from 'components/common/Alert';
import UploadBlock from './UploadBlock';
import message from 'components/common/message';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
import DownloadEmployees from './DownloadEmployees';
// APOLLO
import {graphql, Query} from 'react-apollo';
import compose from 'lodash/flowRight';
import customerAdminsQuery from 'ApolloClient/Queries/customerAdmins';
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
import employeeHelpers from './employeeHelpers';

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
    skip: 0,
    current: 1,
    sortBy: 'lastNameAscend',
    updateErrors: [],
  };

  getFormatted = results => {
    let formattedData = [];
    results.data.forEach(item => {
      if (item['EAID']) {
        formattedData.push(employeeHelpers.formatRow(item));
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
          loading: false,
        });
      }

      // 2. make sure the emails are all valid
      let invalidEmails = employeeHelpers.getInvalidEmails(results);

      if (invalidEmails.length > 0) {
        return this.setState({
          loading: false,
          errors: invalidEmails,
        });
      }

      // 3. make sure EAID is not empty
      let invalidFields = employeeHelpers.getInvalidFields(results);

      if (invalidFields.length > 0) {
        return this.setState({
          loading: false,
          errors: invalidFields,
        });
      }

      let formattedData = this.getFormatted(results);

      // 4. make sure there are no duplicate EAIDs
      let isUniqueArray = employeeHelpers.checkForDuplicateIDs(formattedData);

      if (!isUniqueArray) {
        return this.setState({
          loading: false,
          errors: ['This spreadsheet has dupliate employee IDs'],
        });
      }

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
          loading: false,
          errors: mutationResult.data.checkEmployeesCSV.errors,
        });
      }

      // if all is sell, upload new employees
      let dataUploadResult = await this.props.newEmployeesUpload({
        variables: {
          customerId: this.props.customer.id,
          employees: formattedData,
        },
      });
      if (dataUploadResult.data.newEmployeesUpload.success) {
        return this.setState({loading: false, successfulAdd: true});
      }

      return this.setState({
        errors: dataUploadResult.data.newEmployeesUpload.errors,
        loading: false,
      });
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
    let invalidEmails = employeeHelpers.getInvalidEmails(results);

    if (invalidEmails.length > 0) {
      return this.setState({
        loading: false,
        updateErrors: invalidEmails,
      });
    }

    // 3. make sure EAID is not empty
    let invalidFields = employeeHelpers.getInvalidFields(results);

    if (invalidFields.length > 0) {
      return this.setState({
        loading: false,
        updateErrors: invalidFields,
      });
    }

    let formattedData = this.getFormatted(results);

    // 4. make sure there are no duplicate EAIDs
    let isUniqueArray = employeeHelpers.checkForDuplicateIDs(formattedData);

    if (!isUniqueArray) {
      return this.setState({
        loading: false,
        updateErrors: ['This spreadsheet has dupliate employee IDs'],
      });
    }

    try {
      let mutationResult = await this.props.updateEmployeesUpload({
        variables: {
          customerId: this.props.customer.id,
          employees: formattedData,
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
          {
            query: customerAdminsQuery,
            variables: {customerId: this.props.customer.id},
          },
        ],
      });
      //if server check fails, we show the errors that we got back
      if (!mutationResult.data.updateEmployeesUpload.success) {
        return this.setState({
          loading: false,
          updateErrors: mutationResult.data.updateEmployeesUpload.errors,
        });
      }

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
    this.setState({
      loading: true,
    });
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
          {
            query: customerAdminsQuery,
            variables: {customerId: this.props.customer.id},
          },
        ],
      });
      message.success('Employee successfully updated');
      this.setState({
        selectedEmployee: null,
        loading: false,
      });
    } catch (err) {
      ErrorHelpers.handleError(err);
      this.setState({errors: [err.message], loading: false});
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
            fetchPolicy="network-only"
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
