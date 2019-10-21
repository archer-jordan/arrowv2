import React from 'react';
import {ResponsivePie} from '@nivo/pie';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const DATA = [
  {
    id: 'lisp',
    label: 'lisp',
    value: 206,
    color: 'hsl(265, 70%, 50%)',
  },
  {
    id: 'hack',
    label: 'hack',
    value: 423,
    color: 'hsl(241, 70%, 50%)',
  },
  {
    id: 'scala',
    label: 'scala',
    value: 98,
    color: 'hsl(129, 70%, 50%)',
  },
  {
    id: 'ruby',
    label: 'ruby',
    value: 573,
    color: 'hsl(70, 70%, 50%)',
  },
  {
    id: 'erlang',
    label: 'erlang',
    value: 60,
    color: 'hsl(84, 70%, 50%)',
  },
];
const MyResponsivePie = ({data = DATA /* see data tab */}) => (
  <ResponsivePie
    data={data}
    //margin={{top: 40, right: 80, bottom: 80, left: 80}}
    padAngle={0.7}
    cornerRadius={3}
    colors={[
      '#8CB3CD',
      '#145D92',
      '#5A89AB',
      '#0F3557',
      '#0B4F71',
      '#166086',
      '#3994C1',
    ]}
    borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{from: 'color'}}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    enableSlicesLabels={false}
    fill={[
      {
        match: {
          id: 'ruby',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'c',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'go',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'python',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'scala',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'lisp',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'elixir',
        },
        id: 'lines',
      },
      {
        match: {
          id: 'javascript',
        },
        id: 'lines',
      },
    ]}
    enableRadialLabels={false}
  />
);

export default MyResponsivePie;
