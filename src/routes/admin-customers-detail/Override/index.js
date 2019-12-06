import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import formatRow from './formatRow';
import formatEmployeeRow from './formatEmployeeRow';
// COMPONENTS
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import message from 'components/common/message';
import ErrorBlock from 'components/common/ErrorBlock';
import ReportRow from './ReportRow';
// APOLLO
import {graphql, Query} from 'react-apollo';
import customerTotalsUpload from 'ApolloClient/Mutations/customerTotalsUpload';
import customerReportsByCustomerId from 'ApolloClient/Queries/customerReportsByCustomerId';
import uploadEmployeeReports from 'ApolloClient/Mutations/uploadEmployeeReports';

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
      let data = formatRow(results.data[0], results.data[1]);
      // call the upload mutation
      let result = await this.props.customerTotalsUpload({
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

      console.log(result);
      message.success('Upload complete');
      // turn off loading
      this.setState({loading: false, companyFile: null});
    } catch (err) {
      this.setState({
        companyErrors: [err.message],
      });
    }
  };
  onEmployeeUpload = async (results, file) => {
    console.log({results, file});
    let headersArray = results.data[0];
    let formattedData = [];
    results.data.forEach((item, i) => {
      // 0 index item is the header row, which we don't want to include in formatted data
      if (i !== 0 && item[0] !== null && item[0] !== '') {
        console.log(item); // check that item has 36 columns
        let formattedItem = formatEmployeeRow(headersArray, item);
        formattedData.push(formattedItem);
      }
    });
    await this.props.uploadEmployeeReports({
      variables: {
        values: formattedData,
      },
    });
    console.log(formattedData);
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
  handleCompanyChange = event => {
    this.setState({
      companyFile: event.target.files[0],
    });
  };
  handleEmployeeChange = event => {
    this.setState({
      employeeFile: event.target.files[0],
    });
  };
  render() {
    return (
      <div style={{width: 700, maxWidth: '100%'}}>
        <SectionTitle>Company Totals</SectionTitle>
        {/* SHOW PAST UPLOADS */}
        <Query
          query={customerReportsByCustomerId}
          variables={{customerId: this.props.customer.id}}
        >
          {({data, loading, error}) => {
            if (loading) return <Icon type="loading" />;
            if (error) return 'error';
            let results = data.customerReportsByCustomerId;
            return (
              results &&
              results.map(item => (
                <ReportRow
                  key={item.id}
                  item={item}
                  active={
                    this.state.selectedItem &&
                    this.state.selectedItem.id === item.id
                  }
                  onClick={() =>
                    this.state.selectedItem &&
                    this.state.selectedItem.id === item.id
                      ? this.setState({selectedItem: null})
                      : this.setState({selectedItem: item})
                  }
                />
              ))
            );
          }}
        </Query>
        {/* SHOW ERRORS IF THEY EXIST */}
        {this.state.companyErrors && this.state.companyErrors.length > 0 && (
          <div style={{marginTop: 16, width: 500, maxWidth: '100%'}}>
            <ErrorBlock errors={this.state.companyErrors} />
          </div>
        )}
        {this.state.companyFile && this.state.companyFile.name}
        {/* COMPANY UPLOAD BUTTON */}
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
          <Icon type="loading" />
        )}
        {/* COMPANY UPLOAD BUTTON */}
        {!this.state.companyFile && (
          <div style={{marginTop: 32}}>
            <UploadButton
              name="file"
              type="file"
              id="file"
              onChange={this.handleCompanyChange}
            />{' '}
            <Label htmlFor="file">Select New File</Label>
          </div>
        )}

        <SectionTitle style={{marginTop: 40}}>Emloyee Totals</SectionTitle>
        {this.state.employeeFile && this.state.employeeFile.name}
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
        {!this.state.employeeFile && (
          <div style={{marginTop: 32}}>
            <UploadButton
              name="employee-file"
              type="file"
              id="employee-file"
              onChange={this.handleEmployeeChange}
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
