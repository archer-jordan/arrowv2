import React from 'react';
// COMPONENTS
import Select from 'components/inputs/SelectInput';

const {Option} = Select;

const PLANS = [
  {
    id: 'arrowCare',
    title: 'Arrow Care (default plan)',
  },
  {
    id: 'arrowCarePlus',
    title: 'Arrow Care Plus',
  },
];

export default () => {
  return null;
  //return <div><Select><Option>Option</Option></Select></div>;
};

/**
 * Plan
 * id:
 * title: 'Arrow Care Plus"
 * enrollmentWindow: [start, end]
 * options: [{ title: 'Dental', active: true }]
 */
