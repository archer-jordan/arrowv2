import React, {useState} from 'react';
import styled from 'styled-components';
import {validate} from 'email-validator';
//COMPONENTS
import TextInput from 'components/inputs/Input';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
import FormItem from 'components/common/FormItem';
// APOLLO
import {useMutation} from 'react-apollo';
import REFERRAL_SIGNUP from 'ApolloClient/Mutations/referralSignup';
import REFERRAL_PARTNERS from 'ApolloClient/Queries/referralPartners';

const Text = styled.div`
  color: #999;
  font-size: 16px;
  padding: 0px;
  background: transparent;
  border: 0px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const Container = styled.div`
  border: 1px solid ${(p) => p.theme.colors.neutral9};
  border-radius: 5px;
  width: 450px;
  max-width: 100%;
  padding: 16px;
`;

export default () => {
  const [email, setEmail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState([]);
  const [referralSignup] = useMutation(REFERRAL_SIGNUP);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      // check that user added an email
      if (!email) {
        return setErrors(['Please provide an email']);
      }
      // check if its a valid email
      if (!validate(email)) {
        return setErrors(['That is not a valid email']);
      }
      setLoading(true);
      await referralSignup({
        variables: {
          email,
        },
        refetchQueries: [
          {
            query: REFERRAL_PARTNERS,
            variables: {
              roles: ['referral'],
            },
          },
        ],
      });
      setLoading(false);
      setEmailSent(true);
      console.log('onSubmit');
    } catch (err) {
      setLoading(false);
      setErrors([err.message]);
      console.log(err);
    }
  };

  if (!showForm) {
    return (
      <>
        <Button
          type="submit"
          onClick={() => setShowForm(true)}
          disabled={loading}
          style={{width: 190, marginTop: 8}}
        >
          + Invite new partner
        </Button>
      </>
    );
  }

  if (emailSent) {
    return (
      <Container>
        {' '}
        <div>
          <div style={{textAlign: 'center'}}>
            <Icon
              style={{fontSize: 48, marginBottom: 10, color: '#999'}}
              type="check-circle"
            />
            <h2
              style={{
                textAlign: 'center',
                margin: 0,
                fontSize: 18,
                color: '#999',
              }}
            >
              We've sent them an email which includes a link <br />
              where they can complete their partner account.
            </h2>
            <Button
              grey
              onClick={() => {
                setShowForm(false);
                setEmailSent(false);
              }}
              disabled={loading}
              style={{width: 125, marginRight: 16, marginTop: 16}}
            >
              Okay
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <FormItem>
          <Text>
            Please provide a email address and we’ll send them a secure link to
            create a password and access their account.
          </Text>
        </FormItem>
        <FormItem label="Partner email">
          <TextInput
            value={email}
            placeholder="Enter an email here..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormItem>
        {errors && errors.length > 0 && (
          <FormItem>
            <ErrorBlock errors={errors} />
          </FormItem>
        )}
        <Button
          grey
          onClick={() => setShowForm(false)}
          disabled={loading}
          style={{width: 125, marginRight: 16, marginTop: 16}}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={loading}
          style={{width: 150, marginTop: 16}}
        >
          {!loading ? 'Send invite link' : '...'}
        </Button>
      </form>
    </Container>
  );
};
