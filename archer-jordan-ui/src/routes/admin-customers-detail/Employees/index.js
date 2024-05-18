import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import {debounce} from 'lodash';
// COMPONENTS
import EmployeeForm from 'components/forms/EmployeeForm';
import EmployeesTable from 'components/common/EmployeesTable';
import Alert from 'components/common/Alert';
import UploadBlock from './UploadBlock';
import message from 'components/common/message';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
import DownloadEmployees from './DownloadEmployees';
import Popconfirm from 'components/common/Popconfirm';
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
import deleteEmployee from 'ApolloClient/Mutations/deleteEmployee';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
import ErrorHelpers from 'lib/helpers/ErrorHelpers';
import employeeHelpers from './employeeHelpers';
import theme from 'lib/theme';

const PinkText = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
  cursor: pointer;
  color: ${(p) => p.theme.colors.support2};
  &:hover {
    color: ${(p) => p.theme.colors.support1};
  }
`;

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${(p) => p.theme.colors.primary1};
`;

const SearchInput = styled.input`
  background: ${(p) => p.theme.colors.neutral10};
  border-radius: 25px;
  margin-bottom: 16px;
  width: 380px;
  height: 40px;
  border: 0;
  padding-left: 32px;
  &:focus {
    outline: 0;
  }
`;

const Search = ({value, onChange}) => (
  <div style={{position: 'relative', display: 'inline-block'}}>
    <Icon
      type="search"
      style={{
        color: theme.colors.neutral7,
        position: 'absolute',
        left: 8,
        top: 14,
        fontSize: 14,
      }}
    />
    <SearchInput
      value={value}
      onChange={onChange}
      placeholder="Search by name, email or employee ID"
    />
  </div>
);

const DeleteBtn = styled.button`
  border: 0px;
  background: transparent;
  color: ${(p) => p.theme.colors.red6};
  cursor: pointer;
  &:hover {
    color: ${(p) => p.theme.colors.red3};
  }
  &:focus {
    outline: 0;
  }
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
    searchText: undefined,
    deleting: false,
  };

  getFormatted = (results) => {
    let formattedData = [];
    results.data.forEach((item) => {
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
    const REQUIRED_NUMBER_OF_COLUMNS = 15;

    try {
      // 1. make sure the spreadsheet has the correct number of columns
      if (results.meta.fields.length !== REQUIRED_NUMBER_OF_COLUMNS) {
        return this.setState({
          errors: [
            `This spreadsheet contains ${results.meta.fields.length} columns, not the required ${REQUIRED_NUMBER_OF_COLUMNS}`,
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
          values: formattedData.map((item) => ({
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
      skipEmptyLines: true,
      complete,
    });
  };
  handleSearch = debounce((finalSearchText) => {
    this.setState({finalSearchText});
  }, 250);
  onSave = async (values) => {
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
  onDeleteEmployee = async (employeeId) => {
    try {
      this.setState({
        deleting: true,
      });
      await this.props.deleteEmployee({
        variables: {
          employeeId,
        },
        refetchQueries: [
          {
            query: employeesQuery,
            fetchPolicy: 'network-only',
            variables: {
              customerId: this.props.customer.id,
              skip: this.state.skip,
              sortBy: this.state.sortBy,
              searchText: this.state.finalSearchText,
            },
          },
        ],
      });
      message.success(`Employee was deleted`);
      this.setState({
        deleting: false,
      });
    } catch (err) {
      this.setState({
        deleting: false,
      });
      console.log(err);
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
        <>
          <div
            style={{
              cursor: 'pointer',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => this.setState({selectedEmployee: null})}
          >
            <Icon type="left" style={{fontSize: 13, marginRight: 4}} />
            Back
          </div>
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
        </>
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
              searchText: this.state.finalSearchText,
            }}
          >
            {({data, loading, error}) => {
              if (error) return 'error';
              return (
                <>
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Search
                      onChange={(e) => {
                        this.setState({searchText: e.target.value});
                        this.handleSearch(e.target.value);
                      }}
                      value={this.state.searchText}
                    />
                  </div>
                  <EmployeesTable
                    history={this.props.history}
                    dataSource={!loading ? data.employees.employees : []}
                    total={!loading ? data.employees.count : null}
                    loading={loading}
                    onClickEmployee={(selectedEmployee) =>
                      this.setState({selectedEmployee})
                    }
                    extraColumns={[
                      {
                        title: '',
                        width: 50,
                        render: (text, record) => (
                          <Popconfirm
                            title="Are you SURE? All data will be lost forever."
                            okText="Yes, I'm sure."
                            onConfirm={() => {
                              if (!this.state.deleting) {
                                this.onDeleteEmployee(record.id);
                              }
                            }}
                          >
                            <DeleteBtn disabled={this.state.deleting}>
                              {!this.state.deleting ? 'Delete' : '...'}
                            </DeleteBtn>
                          </Popconfirm>
                        ),
                      },
                    ]}
                    handleTableChange={this.handleTableChange}
                    onPageChange={(page) =>
                      this.setState({
                        skip: page === 1 ? 0 : (page - 1) * 5,
                        current: page,
                      })
                    }
                    current={this.state.current}
                  />
                </>
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
          onChange={(file) => this.handleUpload(file, this.afterParseAdd)}
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
          onChange={(file) => this.handleUpload(file, this.afterParseUpdate)}
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
  graphql(saveAttachment, {name: 'saveAttachment'}),
  graphql(deleteEmployee, {name: 'deleteEmployee'})
)(Employees);
