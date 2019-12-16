import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import Downloading from './Downloading';
import Papa from 'papaparse';
// APOLLO CLIENT
import employeesQuery from 'ApolloClient/Queries/employees';
import client from 'ApolloClient/index.js';
// helpers
import helpers from 'lib/helpers/GeneralHelpers';

const PinkText = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
  cursor: pointer;
  color: ${p => p.theme.colors.support2};
  &:hover {
    color: ${p => p.theme.colors.support1};
  }
`;

class DownloadEmployees extends React.PureComponent {
  state = {
    downloading: false,
  };
  cleanData = data => {
    return data.map(item => {
      return {
        'COMPANY NAME': this.props.customer.title,
        COID: this.props.customer.assignedId,
        EAID: item.assignedId,
        'Last Name': item.lastName,
        'First Name': item.firstName,
        'Hire Date YYYYMMDD': moment(parseInt(item.hireDate)).format(
          'YYYYMMDD'
        ),
        'SSN/Fed ID': item.ssn,
        Address: item.street,
        City: item.city,
        State: item.state,
        'Zip Code': item.zip,
        'Birth Date YYYYMMDD': moment(parseInt(item.dob)).format('YYYYMMDD'),
        'E-mail': item.email,
        Gender: item.gender === 'male' ? 'M' : 'F',
        Status: helpers.capitalize(item.status),
        // E-mail: item.email,
        // 'Hire Date': moment(parseInt(item.hireDate)).format('MM/DD/YYYY'),
        // dob: moment(parseInt(item.dob)).format('MM/DD/YYYY'),
        // gender: item.gender,
        // status: item.status,
        // street: item.street,
        // ssn: item.ssn,
        // city: item.city,
        // state: item.state,
        // zip: item.zip,
      };
    });
  };
  downloadFile = (dataSource, exportFilename = 'employee-data.csv') => {
    let data = Papa.unparse(this.cleanData(dataSource), {header: true});
    let csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(csvData, exportFilename);
    } else {
      // In FF link must be added to DOM to be clicked
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(csvData);
      link.setAttribute('download', exportFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    this.setState({downloading: false});
  };
  onDownload = async () => {
    try {
      this.setState({downloading: true});
      let res = await client.query({
        query: employeesQuery,
        fetchPolicy: 'network-only',
        variables: {
          customerId: this.props.customer.id,
          skip: 0,
          limit: 10000,
        },
      });
      if (res.data.error) {
        this.setState({downloading: false});
        throw new Error('Error in employees query during CSV download');
      }
      console.log(res.data.employees.employees);
      this.downloadFile(res.data.employees.employees);
    } catch (err) {
      this.setState({downloading: false});
      console.log(err);
    }
  };
  render() {
    return (
      <React.Fragment>
        <PinkText style={{marginTop: 16}} onClick={this.onDownload}>
          Click here to download the employee database in csv format
        </PinkText>
        <Downloading visible={this.state.downloading} />
      </React.Fragment>
    );
  }
}

export default DownloadEmployees;
