import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
//
import MonthPicker from 'components/inputs/MonthPicker';

const DateText = styled.div`
  color: ${(p) => p.theme.colors.primary2};
  text-align: right;
  font-size: 40px;
`;

const ChangeDate = styled.button`
  color: ${(p) => p.theme.colors.support1};
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

const DatePickerBackground = styled.div`
  position: fixed;
  background: transparent;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
`;

class MonthComponent extends React.PureComponent {
  state = {
    editDate: false,
  };
  render() {
    const {month, year} = this.props;
    return (
      <React.Fragment>
        <div style={{marginBottom: 16}}>
          <DateText>
            {month && month.toUpperCase()} {year && year}
          </DateText>
          <div style={{position: 'relative'}}>
            <ChangeDate
              onClick={() => this.setState({editDate: !this.state.editDate})}
            >
              Change Month
            </ChangeDate>
            <div style={{opacity: 0, position: 'absolute', right: 0}}>
              <MonthPicker
                open={this.state.editDate}
                value={month && moment(`${month} ${year}`, 'MMMM YYYY')}
                onChange={(value) =>
                  this.props.onChange({
                    month: value.format('MMMM'),
                    year: value.format('YYYY'),
                  })
                }
              />
            </div>
          </div>
        </div>
        {this.state.editDate && (
          <DatePickerBackground
            onClick={() => this.setState({editDate: false})}
          />
        )}
      </React.Fragment>
    );
  }
}

export default MonthComponent;
