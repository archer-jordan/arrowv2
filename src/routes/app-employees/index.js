import React from 'react';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import Button from 'components/common/Button';
import TextInput from 'components/inputs/TextInput';
import EmployeesTable from './EmployeesTable';

class AppEmployees extends React.PureComponent {
  render() {
    return (
      <div style={{width: 900, margin: 'auto', maxWidth: '100%'}}>
        <Row gutter={16} style={{marginTop: 24}}>
          {' '}
          <Col xs={18}>
            <TextInput
              dark
              width={'700px'}
              label="search by name, email or ID#"
            />
          </Col>
          <Col xs={3}>
            {' '}
            <Button style={{width: 90}}>Search</Button>
          </Col>
          <Col xs={3}>
            <Button secondary style={{width: 100}}>
              Download
            </Button>
          </Col>
        </Row>
        <EmployeesTable history={this.props.history} />
      </div>
    );
  }
}

export default AppEmployees;
