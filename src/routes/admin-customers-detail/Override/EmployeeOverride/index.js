import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import formatEmployeeRow from '../formatEmployeeRow';
// COMPONENTS
import Button from 'components/common/Button';
import ErrorBlock from 'components/common/ErrorBlock';
import Alert from 'components/common/Alert';
import Filename from '../Filename';
// APOLLO
import {graphql} from 'react-apollo';
import client from 'ApolloClient/index.js';
import uploadEmployeeReports from 'ApolloClient/Mutations/uploadEmployeeReports';
import checkIfEmployeeTotalsExist from 'ApolloClient/Queries/checkIfEmployeeTotalsExist';
import compose from 'lodash/flowRight';

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

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${p => p.theme.colors.primary1};
`;

class EmployeeOverride extends React.PureComponent {
  state = {
    loading: false,
    employeeErrors: [],
  };
  onEmployeeUpload = async (results, file) => {
    this.setState({loading: true});
    try {
      let headersArray = results.data[0];
      let formattedData = [];
      results.data.forEach((item, i) => {
        // 0 index item is the header row, which we don't want to include in formatted data
        if (i !== 0 && item[0] !== null && item[0] !== '') {
          let formattedItem = formatEmployeeRow(headersArray, item);
          formattedData.push(formattedItem);
        }
      });

      let employeeTotalsExist = await client.query({
        query: checkIfEmployeeTotalsExist,
        variables: {
          employeeAssignedIds: formattedData.map(item => item.assignedId),
          month: formattedData[0].month,
          year: formattedData[0].year,
          customerId: this.props.customer.id,
        },
      });

      // if exists true, we already have data for this month
      if (employeeTotalsExist.data.checkIfEmployeeTotalsExist.exists) {
        return this.setState({
          employeeErrors:
            employeeTotalsExist.data.checkIfEmployeeTotalsExist.errors,
          loading: false,
        });
      }
      // if we got other errors back, show those
      if (employeeTotalsExist.data.checkIfEmployeeTotalsExist.errors) {
        return this.setState({
          employeeErrors:
            employeeTotalsExist.data.checkIfEmployeeTotalsExist.errors,
          loading: false,
        });
      }

      return console.log(employeeTotalsExist);

      // verify if we already have data for this month
      // const reportExists = await client.query({
      //   query: employeeReportByEmployeeIdQuery,
      //   variables: {
      //     employeeId: this.props.customer.id,
      //     month: formattedData[0].month,
      //     year: formattedData[0].year,
      //   },
      // });

      // if (
      //   reportExists.data &&
      //   reportExists.data.customerReport &&
      //   reportExists.data.customerReport.id
      // ) {
      //   return this.setState({
      //     confirmEmployeeUpdateModal: true,
      //     employeeData: formattedData[0],
      //   });
      // }

      // update data
      await this.props.uploadEmployeeReports({
        variables: {
          values: formattedData,
        },
      });

      this.setState({
        loading: false,
        employeeFile: null,
        employeeSuccess: true,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        employeeErrors: [err.message],
      });
    }
  };
  handleUpload = (
    file = this.state.employeeFile,
    complete = this.onCustomerUpload
  ) => {
    if (file && complete) {
      Papa.parse(file, {
        header: false,
        complete,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        {/* EMPLOYEE TOTALS  */}
        <SectionTitle style={{marginTop: 40}}>Emloyee Totals</SectionTitle>

        {this.state.employeeSuccess && (
          <Alert
            message="Upload Success"
            description="Your employee totals were successfully uploaded"
            type="success"
            closable
            showIcon
          />
        )}
        {/* SHOW EMPLOYEE TOTALS FILE NAME */}
        {this.state.employeeFile && (
          <Filename
            name={this.state.employeeFile.name}
            onClick={() =>
              this.setState({
                employeeFile: null,
                employeeErrors: [],
              })
            }
          />
        )}
        {/* EMPLOYEE CONFIRM UPLOAD BUTTON */}
        {this.state.employeeFile && !this.state.loading && (
          <Button
            style={{marginTop: 32, marginLeft: 16, width: 100}}
            onClick={() =>
              this.handleUpload(this.state.employeeFile, this.onEmployeeUpload)
            }
          >
            Upload File
          </Button>
        )}
        {this.state.employeeErrors && this.state.employeeErrors.length > 0 && (
          <div style={{marginTop: 16, width: 500, maxWidth: '100%'}}>
            {this.state.employeeErrors.slice(0, 4).map(item => (
              <ErrorBlock key={item} error={item} />
            ))}
            {/* We don't want to render 1,000 error blocks if there were many errors. So show the first 4 and tell how many are left over */}
            {this.state.employeeErrors.length > 4 && (
              <ErrorBlock
                error={`And ${this.state.employeeErrors.length -
                  4} more errors`}
              />
            )}
          </div>
        )}
        {/* EMPLOYEE SELECT FILE BUTTON */}
        {!this.state.employeeFile && (
          <div style={{marginTop: 32}}>
            <UploadButton
              name="employee-file"
              type="file"
              id="employee-file"
              onChange={event => {
                this.setState({
                  employeeFile: event.target.files[0],
                });
              }}
            />{' '}
            <Label htmlFor="employee-file">Select New File</Label>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(uploadEmployeeReports, {name: 'uploadEmployeeReports'})
)(EmployeeOverride);
