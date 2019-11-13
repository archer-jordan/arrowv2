import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Papa from 'papaparse';
import EmployeesTable from './EmployeesTable';
import Loading from 'components/common/Loading';
import EmployeeForm from 'components/forms/EmployeeForm';
// APOLLO
import {graphql} from 'react-apollo';
import newEmployeesUpload from 'ApolloClient/Mutations/newEmployeesUpload';
// APOLLO
import {Query} from 'react-apollo';
import employeesQuery from 'ApolloClient/Queries/employees';

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

class Employees extends React.PureComponent {
  state = {
    loading: false,
    editManually: false,
    selectedEmployee: null,
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
  handleUpload = event => {
    this.setState({loading: true});
    const stopLoading = () => this.setState({loading: false});
    const newEmployeesUpload = async formattedData =>
      this.props.newEmployeesUpload({
        variables: {
          employees: formattedData,
        },
      });
    const formatRow = this.formatRow;
    Papa.parse(event.target.files[0], {
      header: true,
      complete(results, file) {
        console.log(results.data);

        let formattedData = [];
        results.data.forEach(item => {
          if (item['EAID']) {
            formattedData.push(formatRow(item));
          }
        });
        console.log(formattedData);
        newEmployeesUpload(formattedData);
        stopLoading();
      },
    });
  };
  render() {
    if (this.state.selectedEmployee) {
      return (
        <EmployeeForm
          {...this.state.selectedEmployee}
          onSubmit={values => console.log(values)}
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
          variables={{customerId: this.props.customer.id}}
        >
          {({data, loading, error}) => {
            if (loading) return <Loading />;
            if (error) return 'error';
            if (data.employees.count === 0) return 'No employees';
            return (
              <EmployeesTable
                history={this.props.history}
                dataSource={data.employees.employees}
                onEdit={selectedEmployee => this.setState({selectedEmployee})}
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

export default graphql(newEmployeesUpload, {name: 'newEmployeesUpload'})(
  Employees
);
