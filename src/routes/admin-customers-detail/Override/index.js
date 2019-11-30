import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import formatRow from './formatRow';
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
  margin-top: 48px;
`;

class Override extends React.PureComponent {
  state = {
    loading: false,
    selectedItem: null,
    companyErrors: [],
  };
  onCustomerUpload = async (results, file) => {
    // set to loading
    this.setState({loading: true});
    console.log({
      data: results.data[0],
      length: results.data[0].length,
      headers: results.data[1],
    });
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
  };
  handleUpload = event => {
    Papa.parse(this.state.companyFile, {
      header: false,
      complete: this.onCustomerUpload,
    });
  };
  handleCompanyChange = event => {
    this.setState({
      companyFile: event.target.files[0],
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
            onClick={this.handleUpload}
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
      </div>
    );
  }
}

export default graphql(customerTotalsUpload, {name: 'customerTotalsUpload'})(
  Override
);
