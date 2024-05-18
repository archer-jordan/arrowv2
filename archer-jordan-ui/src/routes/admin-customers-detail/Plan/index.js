import React from 'react';
import moment from 'moment';
// COMPONENTS
import Select from 'components/inputs/SelectInput';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import DatePicker from 'components/inputs/DatePicker';
import DropdownStyleWrapper from 'components/inputs/DropdownStyleWrapper';
// LIB
import constants from 'lib/constants';

const {Option} = Select;

// const PLANS = [
//   {
//     id: 'arrowCare',
//     title: 'Arrow Care (default plan)',
//   },
//   {
//     id: 'arrowCarePlus',
//     title: 'Arrow Care Plus',
//   },
// ];

// enrollmentWindowStart: String;
// enrollmentWindowEnd: String;

const CheckboxRow = ({label}) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: 8,
        height: 32,
        alignItems: 'center',
      }}
    >
      <div style={{marginRight: 8}}>
        <input type="checkbox" />
      </div>
      <div>{label}</div>
    </div>
  );
};

export default ({onSaveChanges, customer}) => {
  return (
    <div style={{width: 425}}>
      <DropdownStyleWrapper>
        <Select
          style={{width: '100%'}}
          value={customer.planType}
          onChange={(newValue) => {
            if (newValue.planType === 'arrowCare') {
              return onSaveChanges({
                planType: newValue,
                enrollmentWindowStart: null,
                enrollmentWindowEnd: null,
              });
            } else {
              onSaveChanges({planType: newValue});
            }
          }}
        >
          {constants.plans.map((item) => {
            return <Option value={item.id}>{item.title}</Option>;
          })}
        </Select>
      </DropdownStyleWrapper>
      {/* This section of the form will only display for arrow care plus plans */}
      {customer.planType === 'arrowCarePlus' && (
        <>
          <Row style={{marginTop: 24}} align="middle">
            <Col xs={24}>
              <div style={{marginBottom: 8}}>Enrollment Window</div>
            </Col>
            <Col xs={10}>
              <DatePicker
                value={
                  customer.enrollmentWindowStart
                    ? moment(parseInt(customer.enrollmentWindowStart))
                    : undefined
                }
                onChange={(newValue) =>
                  onSaveChanges({
                    enrollmentWindowStart: newValue.valueOf().toString(),
                  })
                }
              />
            </Col>
            <Col xs={2}>
              <div
                style={{
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div>To</div>
              </div>
            </Col>
            <Col xs={10}>
              <DatePicker
                value={
                  customer.enrollmentWindowEnd
                    ? moment(parseInt(customer.enrollmentWindowEnd))
                    : undefined
                }
                onChange={(newValue) =>
                  onSaveChanges({
                    enrollmentWindowEnd: newValue.valueOf().toString(),
                  })
                }
              />
            </Col>
          </Row>
          <div style={{marginTop: 40}}>
            <CheckboxRow label="Include Dental" />
            <CheckboxRow label="Include Vision" />
            <CheckboxRow label="Include ValuePlan (Teladoc + Discounts / coverdell)" />
            <CheckboxRow label="Include Term Life" />
          </div>
        </>
      )}
    </div>
  );
};

/**
 * enrollmentWindow: [String, String]
 *
 */

/**
 * Plan
 * id:
 * title: 'Arrow Care Plus"
 * enrollmentWindowStart: String
 * enrollmentWindowEnd: String
 * options: [{ title: 'Dental', active: true }]
 */
