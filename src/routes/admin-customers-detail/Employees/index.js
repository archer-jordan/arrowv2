import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import {validate} from 'email-validator';
import Papa from 'papaparse';
// COMPONENTS
import EmployeeForm from 'components/forms/EmployeeForm';
import EmployeesTable from 'components/common/EmployeesTable';
import UploadBlock from './UploadBlock';
import message from 'components/common/message';
// APOLLO
import {graphql, Query} from 'react-apollo';
import newEmployeesUpload from 'ApolloClient/Mutations/newEmployeesUpload';
import employeesQuery from 'ApolloClient/Queries/employees';
import saveEmployee from 'ApolloClient/Mutations/saveEmployee';
import updateEmployeesUpload from 'ApolloClient/Mutations/updateEmployeesUpload';
import checkEmployeesCSV from 'ApolloClient/Mutations/checkEmployeesCSV';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const compose = require('lodash/flowRight');

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
  afterParse = async (results, file) => {
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
          companyAssignedId: item.assignedCompanyId,
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
    await this.props.newEmployeesUpload({
      variables: {
        employees: formattedData,
      },
    });
    this.setState({loading: false});
  };
  afterUploadParse = async (results, file) => {
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
      this.setState({loading: false});
      message.success(`Employees successfully updated`);
    } catch (err) {
      return this.setState({
        loading: false,
        updateErrors: [err.message],
      });
    }
  };
  handleUpload = (event, complete) => {
    this.setState({loading: true, updateErrors: [], errors: []});

    Papa.parse(event.target.files[0], {
      header: true,
      complete,
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
    /*
      IF THE USER CLICKS ON A EMPLOYEE IN THE EMPLOYEES TABLE,
      WE WILL SHOW THE FORM WITH THAT EMPLOYEES DATA. 
      THE USER CAN THEN EDIT THE RECORD
    */

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

    /*
      IF THE USER CHOOSES TO EDI MANUALLY, WE"LL SHOW THE EMPLOYEES TABLE 
      WHERE THEY CAN CLICK TO SELECT AN EMPLOYEE TO EDIT
    */

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
      );
    }
    /*
      BY DEFAULT WE WILL SHOW THE UPLOAD BUTTON OPTIONS
    */
    return (
      <div style={{width: 700, maxWidth: '100%'}}>
        <UploadBlock
          name="file"
          errors={this.state.errors || []}
          loading={this.state.loading}
          onChange={event => this.handleUpload(event, this.afterParse)}
          sectionTitle="ADD NEW EMPLOYEES TO THE DATABASE"
          buttonText="Upload New Employees"
        />
        <UploadBlock
          name="file-update"
          errors={this.state.updateErrors || []}
          loading={this.state.loading}
          onChange={event => this.handleUpload(event, this.afterUploadParse)}
          sectionTitle="UPDATE EXISTING EMPLOYEE RECORDS"
          buttonText="Upload Employee Updates"
        />
        <PinkText onClick={() => this.setState({editManually: true})}>
          Click here to manually update individual employee records
        </PinkText>
      </div>
    );
  }
}

export default compose(
  graphql(saveEmployee, {name: 'saveEmployee'}),
  graphql(newEmployeesUpload, {name: 'newEmployeesUpload'}),
  graphql(checkEmployeesCSV, {name: 'checkEmployeesCSV'}),
  graphql(updateEmployeesUpload, {name: 'updateEmployeesUpload'})
)(Employees);
