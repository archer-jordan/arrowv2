import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-styled-flexboxgrid';

class HealthAndWelfare extends React.PureComponent {
  render() {
    return (
      <div>
        <div style={{height: 100}}>Top Values</div>
        <Row>
          {' '}
          <Col xs={6}>Values</Col>
          <Col xs={6}>Pie Chart</Col>
        </Row>
      </div>
    );
  }
}

export default HealthAndWelfare;
