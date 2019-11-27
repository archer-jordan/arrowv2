import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import formatRow from './formatRow';
// COMPONENTS
import Icon from 'components/common/Icon';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import message from 'components/common/message';
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

// 0: "COMPANY NAME"
// 1: "COID"
// 2: "Month(#)"
// 3: "MONTH"
// 4: "YEAR"
// 5: "TOTAL HOURS"
// 6: "TOTAL FRINGE*"
// 7: "TOTAL HEALTH & WELFARE"
// 8: "TOTAL VACATION, HOLIDAY, SICK"
// 9: "*Including Administrative Costs"
// 10: "TOTAL EMPLOYEES"
// 11: "ACTIVE THIS MONTH"
// ==> CUSTOM BENEFITS Employee counts start here
// 12: "LIMITED MEDICAL"
// 13: "TELEDOC"
// 14: "MEC"
// 15: "TERM LIFE INSURANCE"
// 16: "null"
// 17: "null"
// 18: "null"
// 19: "null"
// 20: "*charts below: eligible vs. active this month"
// 21: "TOTAL FRINGE BENEFITS SPEND*"
// ==> CUSTOM BENEFITS values
// 22: "LIMITED MEDICAL"
// 23: "TELEDOC"
// 24: "MEC"
// 25: "TERM LIFE INSURANCE"
// 26: "null"
// 27: "null"
// 28: "null"
// 29: "null"
// 30: "* including H&W, VHS, Administrative Costs"
// 31: "TOTAL CONTRIBUTIONS TO RETIREMENT INCLUDING H&W & VHS"

const ReportRow = ({item}) => (
  <Row>
    <Col xs={8}>
      {item.month}/{item.year}
    </Col>
    <Col xs={8}></Col>
    <Col xs={8}></Col>
  </Row>
);

class Override extends React.PureComponent {
  state = {
    loading: false,
  };
  onCustomerUpload = async (results, file) => {
    // set to loading
    this.setState({loading: true});
    // format the data
    let data = formatRow(results.data[0], results.data[1]);
    // call the upload mutation
    let result = await this.props.customerTotalsUpload({
      variables: {
        values: data,
      },
    });

    console.log(result);
    message.success('Upload complete');
    // turn off loading
    this.setState({loading: false});
  };
  handleUpload = event => {
    Papa.parse(event.target.files[0], {
      header: false,
      complete: this.onCustomerUpload,
    });
  };
  render() {
    return (
      <div style={{width: 700, maxWidth: '100%'}}>
        <SectionTitle>Company Totals</SectionTitle>
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
              results.map(item => <ReportRow key={item.id} item={item} />)
            );
          }}
        </Query>
        {!this.state.loading ? (
          <div style={{marginTop: 32}}>
            <UploadButton
              name="file"
              type="file"
              id="file"
              onChange={this.handleUpload}
            />{' '}
            <Label htmlFor="file">Upload New File</Label>
          </div>
        ) : (
          <Icon type="loading" />
        )}

        <SectionTitle style={{marginTop: 40}}>Emloyee Totals</SectionTitle>
      </div>
    );
  }
}

export default graphql(customerTotalsUpload, {name: 'customerTotalsUpload'})(
  Override
);
