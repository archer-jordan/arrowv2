import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import Input from 'components/inputs/Input';
import FormItem from 'components/common/FormItem';
import Button from 'components/common/Button';
import Row from 'components/common/Row';
import Col from 'components/common/Col';

const DataBold = styled.h3`
  font-weight: 700;
`;

const DataThin = styled.span`
  font-weight: 400;
`;

const Container = styled.div`
  padding-top: 40px;
  width: 400px;
`;

export default () => {
  return (
    <Container>
      <DataBold>
        Application Submitted: <DataThin>00/00/0000</DataThin>
      </DataBold>
      <DataBold>
        Status: <DataThin>PENDING</DataThin>
      </DataBold>
      <form>
        <FormItem required>
          <Input placeholder="First Name" />
        </FormItem>
        <FormItem required>
          <Input placeholder="Last Name" />
        </FormItem>
        <FormItem required>
          <Input placeholder="Email" />
        </FormItem>
        <FormItem required>
          <Input placeholder="Address" />
        </FormItem>
        <Row gutter={6}>
          <Col xs={12}>
            <FormItem required>
              <Input placeholder="City" />
            </FormItem>
          </Col>
          <Col xs={4}>
            <FormItem required>
              <Input placeholder="State" />
            </FormItem>
          </Col>
          <Col xs={8}>
            <FormItem required>
              <Input placeholder="Zip" />
            </FormItem>
          </Col>
        </Row>
        <FormItem required>
          <Input placeholder="Address" />
        </FormItem>
        <FormItem>
          <Button style={{width: 160}}>Save Changes</Button>
        </FormItem>
      </form>
    </Container>
  );
};
