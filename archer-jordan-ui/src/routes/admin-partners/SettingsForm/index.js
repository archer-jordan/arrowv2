import React, {useState} from 'react';
import styled from 'styled-components';
// COMPONENTS
import Button from 'components/common/Button';
import message from 'components/common/message';
import CurrencyInput from 'components/inputs/CurrencyInput';
import NumberInput from 'components/inputs/Input';
// APOLLO
import SYSTEM_SETTINGS from 'ApolloClient/Queries/systemSettings';
import SAVE_SYSTEM_SETTINGS from 'ApolloClient/Mutations/saveSystemSettings';
import {useQuery, useMutation} from 'react-apollo';
// LIB
import helpers from 'lib/helpers/GeneralHelpers';

const ReferralText = styled.h2`
  font-weight: 700;
  margin-right: 16px;
  font-size: 18px;
  margin-bottom: 0px;
`;

const Referralvalue = styled.span`
  font-weight: 500;
  font-size: 18px;
`;

const SettingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 32px;
`;

export default () => {
  const [editing, setEditing] = useState(false);
  const [hours, setHours] = useState(null);
  const [rate, setRate] = useState(null);
  const [saveSystemSettings] = useMutation(SAVE_SYSTEM_SETTINGS);
  const [loading, setLoading] = useState(false);
  useQuery(SYSTEM_SETTINGS, {
    onCompleted: (data) => {
      setHours(data.systemSettings.minimumReferralHours);
      setRate(data.systemSettings.referralRate);
    },
  });

  const onSave = async () => {
    try {
      setLoading(true);
      await saveSystemSettings({
        variables: {referralRate: rate, minimumReferralHours: hours},
      });
      message.success('Settings were successfully saved!');
      setEditing(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      return console.log(err);
    }
  };

  if (editing) {
    return (
      <SettingsContainer>
        <div>
          <ReferralText>
            Minimum Employee Hours{' '}
            <NumberInput
              value={hours}
              type="number"
              style={{width: 95}}
              onChange={(e) => setHours(parseInt(e.target.value))}
            />
          </ReferralText>
        </div>
        <div>
          <ReferralText>
            Referral Rate Per Employee{' '}
            <CurrencyInput
              value={rate}
              style={{width: 95}}
              onChange={(value) => setRate(value)}
            />
          </ReferralText>
        </div>
        <div>
          <Button disabled={loading} onClick={onSave}>
            {!loading ? 'SAVE SETTINGS' : '...'}
          </Button>
        </div>
      </SettingsContainer>
    );
  }
  return (
    <SettingsContainer>
      <div>
        <ReferralText>
          Minimum Employee Hours <Referralvalue>{hours}</Referralvalue>
        </ReferralText>
      </div>
      <div>
        <ReferralText>
          Referral Rate Per Employee{' '}
          <Referralvalue>{helpers.centsToDollars(rate)}</Referralvalue>
        </ReferralText>
      </div>
      <div>
        <Button style={{width: 160}} onClick={() => setEditing(true)}>
          EDIT SETTINGS
        </Button>
      </div>
    </SettingsContainer>
  );
};
