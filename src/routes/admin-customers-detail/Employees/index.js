import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {validate} from 'email-validator';
import Papa from 'papaparse';
// COMPONENTS
import EmployeeForm from 'components/forms/EmployeeForm';
import EmployeesTable from 'components/common/EmployeesTable';
import ErrorBlock from 'components/common/ErrorBlock';
// APOLLO
import {graphql} from 'react-apollo';
import newEmployeesUpload from 'ApolloClient/Mutations/newEmployeesUpload';
// APOLLO
import {Query} from 'react-apollo';
import employeesQuery from 'ApolloClient/Queries/employees';
import saveEmployee from 'ApolloClient/Mutations/saveEmployee';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';
import checkEmployeesCSV from '../../../ApolloClient/Mutations/checkEmployeesCSV';

const compose = require('lodash/flowRight');

const UploadButton = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${p => p.theme.colors.support2};
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid ${p => p.theme.colors.support2};
  background: transparent;
  display: inline-block;
  cursor: pointer;
  &:hover {
    border: 2px solid ${p => p.theme.colors.support1};
    color: ${p => p.theme.colors.support1};
  }
`;

const PinkText = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
  cursor: pointer;
  color: ${p => p.theme.colors.support2};
  &:hover {
    color: ${p => p.theme.colors.support1};
  }
`;

/**
 * 1. Check if we have correct number of columns
 * 2. Check if all emails are valid
 * 3. Check that all values exist in each row?
 * 4. Check if any of the employees already exist
 *
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
  };
  formatRow = row => {
    return {
      firstName: row['First Name'],
      lastName: row['Last Name'],
      //email: row['E-Mail'],
      email: `arcomito+${row['EAID']}@gmail.com`,
      assignedId: row['EAID'],
      assignedCompanyId: row['COID'],
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
  onRow = (record, rowIndex) => {
    return {
      onClick: () => this.setState({selectedEmployee: record}),
    };
  };
  afterParse = async (results, file) => {
    const stopLoading = () => this.setState({loading: false});
    const formatRow = this.formatRow;
    const newEmployeesUpload = async formattedData =>
      await this.props.newEmployeesUpload({
        variables: {
          employees: formattedData,
        },
      });
    const checkEmployeesCSV = async values => {
      return await this.props.checkEmployeesCSV({
        variables: {
          values,
        },
      });
    };

    // 1. make sure the spreadsheet has the correct number of columns
    if (results.meta.fields.length !== 15) {
      return this.setState({
        errors: [
          `This spreadsheet contains ${results.meta.fields.length} columns, not the required 15`,
        ],
      });
    }
    // 2. make sure the emails are all valid
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
    if (invalidEmails.length > 0) {
      return this.setState({
        errors: invalidEmails,
      });
    }

    let formattedData = [];
    results.data.forEach(item => {
      if (item['EAID']) {
        formattedData.push(formatRow(item));
      }
    });
    // Do server check to see if these people already exist
    let mutationResult = await checkEmployeesCSV(
      formattedData.map(item => ({
        companyAssignedId: item.assignedCompanyId,
        employeeAssignedId: item.assignedId,
      }))
    );
    //if server check fails, we show the errors that we got back
    if (!mutationResult.data.checkEmployeesCSV.success) {
      return this.setState({
        errors: mutationResult.data.checkEmployeesCSV.errors,
      });
    }
    //newEmployeesUpload(formattedData);
    stopLoading();
  };
  handleUpload = event => {
    this.setState({loading: true});

    const afterParse = this.afterParse;

    Papa.parse(event.target.files[0], {
      header: true,
      complete: afterParse,
    });
  };
  onSave = values => {
    console.log(values);
  };
  handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      let sortBy = `${sorter.columnKey}${helpers.capitalize(sorter.order)}`;
      this.setState({sortBy});
    }
  };
  render() {
    if (this.state.selectedEmployee) {
      return (
        <EmployeeForm
          {...this.state.selectedEmployee}
          onSubmit={this.onSave}
          loading={this.state.loading}
          onCancel={() => this.setState({selectedEmployee: null})}
        />
      );
    }
    if (!this.state.editManually) {
      return (
        <React.Fragment>
          <div>
            <UploadButton
              name="file"
              type="file"
              id="file"
              onChange={this.handleUpload}
            />{' '}
            <Label for="file">Upload New Employees</Label>
          </div>
          {this.state.errors && this.state.errors.length > 0 && (
            <div style={{marginTop: 16, maxWidth: '100%', width: 600}}>
              {this.state.errors.map(error => (
                <ErrorBlock key={error} error={error} />
              ))}
            </div>
          )}
          <PinkText onClick={() => this.setState({editManually: true})}>
            Click here to manually update individual employee records
          </PinkText>
        </React.Fragment>
      );
    }

    if (this.state.editManually) {
      return (
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
                onRow={this.onRow}
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
      );
    }

    return <div />;
    // return (
    //   <div>
    //     {!this.state.editManually && (
    //       <React.Fragment>
    //         <div>
    //           <UploadButton
    //             name="file"
    //             type="file"
    //             id="file"
    //             onChange={this.handleUpload}
    //           />{' '}
    //           <Label for="file">Upload New Employees</Label>
    //         </div>
    //         <PinkText onClick={() => this.setState({editManually: true})}>
    //           Click here to manually update individual employee records
    //         </PinkText>
    //       </React.Fragment>
    //     )}
    //     {this.state.editManually && }
    //   </div>
    // );
  }
}

export default compose(
  graphql(saveEmployee, {name: 'saveEmployee'}),
  graphql(newEmployeesUpload, {name: 'newEmployeesUpload'}),
  graphql(checkEmployeesCSV, {name: 'checkEmployeesCSV'})
)(Employees);
