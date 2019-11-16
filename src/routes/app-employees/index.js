import React from 'react';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import TextInput from 'components/inputs/TextInput';
import EmployeesTable from 'components/common/EmployeesTable';
import Papa from 'papaparse';
import moment from 'moment';
// APOLLO
import {Query} from 'react-apollo';
import employeesQuery from 'ApolloClient/Queries/employees';
import client from 'ApolloClient/index.js';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

class AppEmployees extends React.PureComponent {
  state = {
    searchText: null,
    searchString: null,
    skip: 0,
    downloading: false,
    current: 1,
    sortBy: 'lastNameAscend',
  };
  onSearch = () => {
    this.setState({
      searchText: this.state.searchString,
    });
  };
  cleanData = data => {
    return data.map(item => {
      return {
        'Employee ID': item.assignedId,
        'Last Name': item.lastName,
        'First Name': item.firstName,
        Email: item.email,
        'Hire Date': moment(parseInt(item.hireDate)).format('MM/DD/YYYY'),
        dob: item.dob,
        gender: item.gender,
        status: item.status,
        ssn: item.ssn,
        street: item.street,
        city: item.city,
        state: item.state,
        zip: item.zip,
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
        variables: {
          customerId: this.props.currentUser.companyId,
          searchText: this.state.searchText,
          skip: 0,
          limit: 5000,
        },
      });
      if (res.data.error) {
        throw new Error('Error in employees query during CSV download');
      }
      console.log(res.data.employees.employees);
      this.downloadFile(res.data.employees.employees);
    } catch (err) {
      this.setState({downloading: false});
      console.log(err);
    }
  };
  handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      let sortBy = `${sorter.columnKey}${helpers.capitalize(sorter.order)}`;
      this.setState({sortBy});
    }
  };
  onRow = (record, rowIndex) => {
    return {
      onClick: () => this.props.history.push(`/employees/${record.id}`), // click row
    };
  };
  render() {
    return (
      <div style={{width: 900, margin: 'auto', maxWidth: '100%'}}>
        <Row gutter={16} style={{marginTop: 24}}>
          {' '}
          <Col xs={18}>
            <div style={{position: 'relative'}}>
              {' '}
              <TextInput
                dark
                width={'700px'}
                value={this.state.searchString}
                label="search by name, email or ID#"
                onChange={e => this.setState({searchString: e.target.value})}
              />
              {this.state.searchText && (
                <div
                  onClick={() =>
                    this.setState({searchString: '', searchText: null})
                  }
                  style={{position: 'absolute', right: 20, bottom: 7}}
                >
                  <Icon
                    type="close-circle"
                    style={{color: '#999', cursor: 'pointer'}}
                  />
                </div>
              )}
            </div>
          </Col>
          <Col xs={3}>
            {' '}
            <Button style={{width: 90}} onClick={this.onSearch}>
              search
            </Button>
          </Col>
          <Col xs={3}>
            <Button
              disabled={this.state.downloading}
              secondary
              style={{width: 110}}
              onClick={this.onDownload}
            >
              {!this.state.downloading ? 'download' : <Icon type="loading" />}
            </Button>
          </Col>
        </Row>
        <Query
          query={employeesQuery}
          variables={{
            customerId: this.props.currentUser.companyId,
            searchText: this.state.searchText,
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
                onEdit={selectedEmployee => this.setState({selectedEmployee})}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AppEmployees;
