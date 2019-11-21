import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
// APOLLO
import {graphql} from 'react-apollo';
import customerTotalsUpload from 'ApolloClient/Mutations/customerTotalsUpload';

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

const valueExists = value => {
  if (value && value.length === 0) return null;
  if (value && value === 'null') return null;
  if (!value) return null;
  return value;
};

class Override extends React.PureComponent {
  formatRow = (headersArray, dataArray) => {
    return {
      assignedId: dataArray[1],
      month: dataArray[2],
      year: dataArray[4],
      activeThisMonth: dataArray[11],
      // totals
      totalHours: dataArray[5],
      totalFringe: dataArray[6],
      totalHealthAndWelfare: dataArray[7],
      totalVHS: dataArray[8],
      totalEmployees: dataArray[10],
      // labels
      labelForTotalFringe: headersArray[6],
      labelForTotalHours: headersArray[5],
      labelForVHS: dataArray[30],
      labelForAdminCosts: dataArray[9],
      // benefits
      benefits: [
        // benefit 1
        {
          label: valueExists(headersArray[12]),
          employees: valueExists(dataArray[12]),
          value: valueExists(dataArray[22]),
        },
        // benefit 2
        {
          label: valueExists(headersArray[13]),
          employees: valueExists(dataArray[13]),
          value: valueExists(dataArray[23]),
        },
        // benefit 3
        {
          label: valueExists(headersArray[15]),
          employees: valueExists(dataArray[15]),
          value: valueExists(dataArray[24]),
        },
        // benefit 4
        {
          label: valueExists(headersArray[16]),
          employees: valueExists(dataArray[16]),
          value: valueExists(dataArray[25]),
        },
        // benefit 5
        {
          label: valueExists(headersArray[17]),
          employees: valueExists(dataArray[17]),
          value: valueExists(dataArray[26]),
        },
        // benefit 6
        {
          label: valueExists(headersArray[18]),
          employees: valueExists(dataArray[18]),
          value: valueExists(dataArray[27]),
        },
        // benefit 7
        {
          label: valueExists(headersArray[19]),
          employees: valueExists(dataArray[19]),
          value: valueExists(dataArray[28]),
        },
        // benefit 8
        {
          label: valueExists(headersArray[20]),
          employees: valueExists(dataArray[20]),
          value: valueExists(dataArray[29]),
        },
      ],
    };
  };
  handleUpload = event => {
    this.setState({loading: true});
    const stopLoading = () => this.setState({loading: false});
    const customerTotalsUpload = async formattedData =>
      this.props.customerTotalsUpload({
        variables: {
          values: formattedData,
        },
      });
    const formatRow = this.formatRow;
    Papa.parse(event.target.files[0], {
      header: false,
      complete(results, file) {
        console.log(results.data[1]);
        let data = formatRow(results.data[0], results.data[1]);
        console.log({data});
        // console.log(formattedData);
        customerTotalsUpload(data);
        stopLoading();
      },
    });
  };
  render() {
    return (
      <div>
        <div>Company Totals</div>
        {/* <div>
          <UploadButton
            name="file"
            type="file"
            id="file"
            onChange={this.handleUpload}
          />{' '}
          <Label htmlFor="file">Upload New File</Label>
        </div>
        <div style={{marginTop: 24}}>Emloyee Totals</div> */}
      </div>
    );
  }
}

export default graphql(customerTotalsUpload, {name: 'customerTotalsUpload'})(
  Override
);
