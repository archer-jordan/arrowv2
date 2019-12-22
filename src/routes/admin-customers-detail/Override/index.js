import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import formatRow from './formatRow';
import formatEmployeeRow from './formatEmployeeRow';
// COMPONENTS
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import ErrorBlock from 'components/common/ErrorBlock';
import Modal from 'components/common/Modal';
import Title from 'components/text/Title';
import Caption from 'components/text/Caption';
import Alert from 'components/common/Alert';
// APOLLO
import {graphql} from 'react-apollo';
import client from 'ApolloClient/index.js';
import customerReportQuery from 'ApolloClient/Queries/customerReport';
import customerTotalsUpload from 'ApolloClient/Mutations/customerTotalsUpload';
import customerReportsByCustomerId from 'ApolloClient/Queries/customerReportsByCustomerId';
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

class Override extends React.PureComponent {
  state = {
    loading: false,
    selectedItem: null,
    companyErrors: [],
  };
  onCompleteCustomerUpload = async (data = this.state.companyData) => {
    // call the upload mutation
    try {
      await this.props.customerTotalsUpload({
        variables: {
          values: data,
        },
        refetchQueries: [
          {
            query: customerReportsByCustomerId,
            variables: {
              customerId: this.props.customer.id,
            },
          },
        ],
      });
      // turn off loading
      this.setState({
        loading: false,
        companyFile: null,
        companyData: null,
        customerSuccess: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  onCustomerUpload = async (results, file) => {
    try {
      // set to loading
      this.setState({loading: true});

      // check the length and throw an error if we have the incorrect number of columns we were expecting
      if (results.data[1].length !== 32) {
        return this.setState({
          companyErrors: [
            'This sheet does not have the correct number of columns',
          ],
        });
      }

      // format the data
      const data = formatRow(results.data[0], results.data[1]);

      // verify if we already have data for this month
      const reportExists = await client.query({
        query: customerReportQuery,
        variables: {
          customerId: this.props.customer.id,
          month: data.month,
          year: data.year,
        },
      });

      if (
        reportExists.data &&
        reportExists.data.customerReport &&
        reportExists.data.customerReport.id
      ) {
        return this.setState({
          confirmUpdateModal: true,
          companyData: data,
        });
      }

      this.onCompleteCustomerUpload(data);
      // // call the upload mutation
      // let result = await this.props.customerTotalsUpload({
      //   variables: {
      //     values: data,
      //   },
      //   refetchQueries: [
      //     {
      //       query: customerReportsByCustomerId,
      //       variables: {
      //         customerId: this.props.customer.id,
      //       },
      //     },
      //   ],
      // });

      // console.log(result);
      // message.success('Upload complete');
      // // turn off loading
      // this.setState({loading: false, companyFile: null, customerSuccess: true});
    } catch (err) {
      this.setState({
        companyErrors: [err.message],
      });
    }
  };
  onEmployeeUpload = async (results, file) => {
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
    file = this.state.companyFile,
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
      <div style={{width: 700, maxWidth: '100%'}}>
        <Modal visible={this.state.confirmUpdateModal} footer={null}>
          <Title>A report already exists</Title>
          <Caption>
            A report already exists for{' '}
            {this.state.companyData &&
              `${this.state.companyData.month}/${this.state.companyData.year}`}
            , would you like to override the entire month and generate a new
            report?
          </Caption>
          <div style={{display: 'flex', marginTop: 20}}>
            {' '}
            <div style={{flex: 1}}></div>
            <div style={{flex: 1}}>
              {' '}
              <Button
                style={{width: 100}}
                secondary
                onClick={() => {
                  this.setState({
                    confirmUpdateModal: false,
                    companyData: null,
                    companyFile: null,
                    loading: false,
                  });
                }}
              >
                cancel
              </Button>
              <Button
                style={{width: 100, marginLeft: 16}}
                onClick={() => {
                  this.onCompleteCustomerUpload(this.state.companyData);
                  this.setState({
                    confirmUpdateModal: false,
                  });
                }}
              >
                Yes, update
              </Button>
            </div>
          </div>
        </Modal>
        <SectionTitle>Company Totals</SectionTitle>
        {/* SHOW PAST UPLOADS */}
        {/* SHOW ERRORS IF THEY EXIST */}
        {this.state.companyErrors && this.state.companyErrors.length > 0 && (
          <div style={{marginTop: 16, width: 500, maxWidth: '100%'}}>
            <ErrorBlock errors={this.state.companyErrors} />
          </div>
        )}
        {this.state.customerSuccess && (
          <Alert
            message="Upload Success"
            description="Your customer totals were successfully uploaded"
            type="success"
            closable
            showIcon
          />
        )}
        {this.state.companyFile && this.state.companyFile.name}
        {/* COMPANY CONFIRM UPLOAD BUTTON */}
        {this.state.companyFile && !this.state.loading && (
          <Button
            style={{marginTop: 32, marginLeft: 16, width: 100}}
            onClick={() =>
              this.handleUpload(this.state.companyFile, this.onCustomerUpload)
            }
          >
            Upload File
          </Button>
        )}
        {this.state.companyFile && this.state.loading && (
          <Icon type="loading" style={{marginLeft: 4}} />
        )}
        {/* COMPANY SELECT FILE BUTTON */}
        {!this.state.companyFile && (
          <div style={{marginTop: 32}}>
            <UploadButton
              name="file"
              type="file"
              id="file"
              onChange={event => {
                this.setState({
                  companyFile: event.target.files[0],
                });
              }}
            />{' '}
            <Label htmlFor="file">Select New File</Label>
          </div>
        )}
        {/* EMPLOYEE TOTALS  */}
        <SectionTitle style={{marginTop: 40}}>Emloyee Totals</SectionTitle>
        {this.state.employeeErrors && this.state.employeeErrors.length > 0 && (
          <div style={{marginTop: 16, width: 500, maxWidth: '100%'}}>
            <ErrorBlock errors={this.state.employeeErrors} />
          </div>
        )}
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
        {this.state.employeeFile && this.state.employeeFile.name}
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
      </div>
    );
  }
}

export default compose(
  graphql(uploadEmployeeReports, {name: 'uploadEmployeeReports'}),
  graphql(customerTotalsUpload, {name: 'customerTotalsUpload'})
)(Override);
