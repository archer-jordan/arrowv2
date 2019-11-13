import React from "react";
import styled from "styled-components";
import Row from "components/common/Row";
import Col from "components/common/Col";
import BigValue from "components/text/BigValue";
import BigLabel from "components/text/BigLabel";
import TopContainer from "components/common/TopContainer";

const Label = styled(BigValue)`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  height: 16px;
  margin-bottom: 16px;
`;

const Value = styled(Label)`
  font-weight: 400;
`;

const DataItem = ({ label = "First Name", value = "John" }) => (
  <Row>
    <Col xs={12}>
      <Label>{label}</Label>
    </Col>
    <Col xs={12}>
      <Value>{value}</Value>
    </Col>
  </Row>
);

class Account extends React.PureComponent {
  render() {
    return (
      <div>
        <TopContainer style={{ justifyContent: "flex-end" }}>
          <div>
            {" "}
            <BigValue style={{ textAlign: "right" }}>
              {" "}
              {this.props.employee.firstName} {this.props.employee.lastName}
            </BigValue>
            <BigLabel style={{ textAlign: "right" }}>
              {this.props.employee.email}
            </BigLabel>
          </div>
        </TopContainer>
        <div style={{ width: 350, maxWidth: "100%", marginTop: 24 }}>
          <DataItem label="Last Name" value={this.props.employee.lastName} />
          <DataItem label="First Name" value={this.props.employee.firstName} />
          {/* <DataItem label="MI" value="n/a" /> */}
        </div>
      </div>
    );
  }
}

export default Account;
