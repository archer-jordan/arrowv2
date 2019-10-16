import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-styled-flexboxgrid';

const TopContainer = styled.div`
  height: 100px;
`;

class HealthAndWelfare extends React.PureComponent {
  render() {
    return (
      <div>
        <TopContainer>Top Values</TopContainer>
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
