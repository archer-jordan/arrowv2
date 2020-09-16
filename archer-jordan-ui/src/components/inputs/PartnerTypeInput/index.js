import React from 'react';
import Select from 'components/inputs/SelectInput';
import DropdownStyleWrapper from 'components/inputs/DropdownStyleWrapper';

const {Option} = Select;

export const PARTNER_TYPE_OPTIONS = [
  {
    label: 'Life And Health Broker',
    value: 'lifeAndHealthBroker',
  },
  {
    label: 'Property And Casualty',
    value: 'propertyAndCasualty',
  },
  {
    label: 'Investment Advisor',
    value: 'investmentAdvisor',
  },
  {
    label: 'CPA',
    value: 'cpa',
  },
  {
    label: 'Attorney',
    value: 'attorney',
  },
  {
    label: 'Consultant',
    value: 'consultant',
  },
  {
    label: 'Industry Influencer',
    value: 'industryInfluencer',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export default ({value, onChange, style = {}}) => {
  return (
    <DropdownStyleWrapper>
      <Select
        style={{width: '100%', ...style}}
        placeholder="What type of partner are you?"
        value={value}
        onChange={(newValue) => onChange(newValue)}
      >
        {PARTNER_TYPE_OPTIONS.map((item) => {
          return <Option key={item.value}>{item.label}</Option>;
        })}
      </Select>
    </DropdownStyleWrapper>
  );
};
