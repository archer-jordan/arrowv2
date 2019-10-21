import React from 'react';
import queryString from 'query-string';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import EmployeesTable from './EmployeesTable';

class AppEmployees extends React.PureComponent {
  render() {
    return (
      <div style={{width: 900, margin: 'auto', maxWidth: '100%'}}>
        <Row gutter={16} style={{marginTop: 24}}>
          {' '}
          <Col xs={14}>Search</Col>
          <Col xs={5}>
            {' '}
            <Button>Search</Button>
          </Col>
          <Col xs={5}>
            <Button>Download</Button>
          </Col>
        </Row>
        <EmployeesTable history={this.props.history} />
      </div>
    );
  }
}

export default AppEmployees;
