import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
// COMPONENTS
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import DatePicker from 'components/inputs/DatePicker';
import SideNav from 'components/common/SideNav';
import Benefits from './Benefits';
import Financials from './Financials';
import Account from './Account';

const {MonthPicker} = DatePicker;

const DateText = styled.div`
  color: #1371a3;
  text-align: right;
  font-size: 40px;
`;

const DatePickerBackground = styled.div`
  position: fixed;
  background: transparent;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
`;

const ChangeDate = styled.button`
  color: ${p => p.theme.colors.support1};
  text-align: right;
  font-size: 16px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  text-decoration: underline;
  background: transparent;
  border: 0px;
  padding: 0px;
  &:focus {
    outline: 0;
  }
`;

class AppEmployeesDetail extends React.PureComponent {
  state = {
    editDate: false,
  };
  onParamChange = newValues => {
    let oldParams = queryString.parse(this.props.location.search);
    let newParams = {
      ...oldParams,
      ...newValues,
    };
    let newString = queryString.stringify(newParams);
    this.props.history.push(`?${newString}`);
  };
  checkParams = () => {
    let oldParams = queryString.parse(this.props.location.search);
    if (!oldParams.tab && oldParams.tab !== 'null') {
      let month = moment()
        .format('MMMM')
        .toLowerCase();
      let year = moment()
        .format('YYYY')
        .toLowerCase();
      return this.onParamChange({month, year, tab: 'benefits'});
    }
    if (
      (!oldParams.year && oldParams.year !== 'null') ||
      (!oldParams.month && oldParams.month !== 'null')
    ) {
      let month = moment()
        .format('MMMM')
        .toLowerCase();
      let year = moment()
        .format('YYYY')
        .toLowerCase();
      return this.onParamChange({month, year});
    }
  };
  componentWillMount() {
    this.checkParams();
  }
  getNavItems = () => {
    return [
      {
        label: 'Benefits',
        activeValue: 'benefits',
        onClick: () =>
          this.onParamChange({
            tab: 'benefits',
          }),
      },
      {
        label: 'Financials',
        activeValue: 'financials',
        onClick: () =>
          this.onParamChange({
            tab: 'financials',
          }),
      },
      {
        label: 'Account',
        activeValue: 'account',
        onClick: () =>
          this.onParamChange({
            tab: 'account',
          }),
      },
      {
        label: 'Password',
        activeValue: 'password',
        onClick: () =>
          this.onParamChange({
            tab: 'password',
          }),
      },
    ];
  };
  render() {
    const {location, history} = this.props;

    const {tab, month, year} = queryString.parse(location.search);
    const sharedProps = {
      history,
      location,
      month,
    };
    return (
      <div>
        <div>
          <Link to="/employees">Employees</Link> / Mark Wahlberg / {tab}{' '}
        </div>
        <Row>
          <Col xs={24} md={16} />
          <Col xs={24}>
            {' '}
            <div style={{marginBottom: 16}}>
              <DateText>
                {month && month.toUpperCase()} {year && year}
              </DateText>
              <div style={{position: 'relative'}}>
                <ChangeDate
                  onClick={() =>
                    this.setState({editDate: !this.state.editDate})
                  }
                >
                  Change Month
                </ChangeDate>
                <div style={{opacity: 0, position: 'absolute', right: 0}}>
                  <MonthPicker
                    open={this.state.editDate}
                    value={month && moment(`${month} ${year}`, 'MMMM YYYY')}
                    onChange={value =>
                      this.onParamChange({
                        month: value.format('MMMM'),
                        year: value.format('YYYY'),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} md={6}>
            <SideNav items={this.getNavItems()} tab={tab} />
          </Col>
          <Col xs={24} md={18}>
            {' '}
            <div>
              {(() => {
                switch (tab) {
                  case 'financials':
                    return <Financials {...sharedProps} />;
                  case 'benefits':
                    return <Benefits {...sharedProps} />;
                  case 'account':
                    return <Account {...sharedProps} />;
                  case 'password':
                    return <div {...sharedProps} />;
                  default:
                    return <div {...sharedProps} />;
                }
              })()}
            </div>
          </Col>
        </Row>
        {this.state.editDate && (
          <DatePickerBackground
            onClick={() => this.setState({editDate: false})}
          />
        )}
      </div>
    );
  }
}

export default AppEmployeesDetail;
