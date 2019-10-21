import React from 'react';
import styled from 'styled-components';
import TopContainer from 'components/common/TopContainer';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import BigValue from 'components/text/BigValue';
import BigLabel from 'components/text/BigLabel';
import PieChart from 'components/common/PieChart';

const PieChartPlaceholder = styled.div`
  width: 250px;
  height: 250px;
`;

// [
//   '#8CB3CD',
//   '#145D92',
//   '#5A89AB',
//   '#0F3557',
//   '#0B4F71',
//   '#166086',
//   '#3994C1',
// ]

const MOCK_DATA = [
  {
    id: '1',
    color: '#8CB3CD',
    title: 'FRINGE DOLLARS',
    amount: 19642,
  },
  {
    id: '2',
    color: '#145D92',
    title: 'HEALTH & WELFARE',
    amount: 12527,
  },
  {
    id: '3',
    color: '#5A89AB',
    title: 'RETIREMENT',
    amount: 5740,
  },
];

const ColorCircle = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${p => (p.color ? p.color : 'red')};
`;

const FinancialRow = ({item}) => (
  <Row
    gutter={16}
    align="center"
    style={{height: 100, marginTop: 24, borderBottom: '1px solid #efefef'}}
  >
    <Col xs={12}>
      <BigLabel>{item.title}</BigLabel>
      <BigValue>
        {(item.amount / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </BigValue>
    </Col>
    <Col xs={12}>
      <BigLabel>
        <ColorCircle color={item.color} />
      </BigLabel>
    </Col>
  </Row>
);

class Financials extends React.PureComponent {
  render() {
    return (
      <div style={{paddingBottom: 90}}>
        <div>
          <TopContainer style={{justifyContent: 'flex-end', marginBottom: 32}}>
            <div>
              {' '}
              <BigValue style={{textAlign: 'right'}}>Anthony Comito</BigValue>
              <BigLabel style={{textAlign: 'right'}}>
                christianlonglastname@yahoo.com
              </BigLabel>
            </div>
          </TopContainer>
          <Row gutter={16}>
            <Col xs={16}>
              {' '}
              {MOCK_DATA.map(item => (
                <FinancialRow key={item.id} item={item} />
              ))}
            </Col>
            <Col xs={8}>
              <PieChartPlaceholder>
                <PieChart />
              </PieChartPlaceholder>
            </Col>
          </Row>
        </div>{' '}
      </div>
    );
  }
}

export default Financials;
