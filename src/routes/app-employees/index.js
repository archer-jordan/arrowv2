import React from 'react';
import queryString from 'query-string';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import EmployeesTable from './EmployeesTable';

class AppEmployees extends React.PureComponent {
  render() {
    return (
      <div>
        <Row gutter={16} style={{marginTop: 24}}>
          {' '}
          <Col xs={18}>Search</Col>
          <Col xs={3}>
            {' '}
            <Button>Search</Button>
          </Col>
          <Col xs={3}>
            <Button>Download</Button>
          </Col>
        </Row>
        <EmployeesTable />
      </div>
    );
  }
}

export default AppEmployees;
