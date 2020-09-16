import React, {useState} from 'react';
import styled from 'styled-components';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import FormItem from 'components/common/FormItem';
import ErrorBlock from 'components/common/ErrorBlock';
import message from 'components/common/message';
import Background from 'components/common/GradientBackground';
// APOLLO
import RESET_PASSWORD from 'ApolloClient/Mutations/resetPassword';
import {useMutation} from 'react-apollo';
// LIB
import ErrorHelpers from 'lib/helpers/ErrorHelpers';
import GeneralHelpers from 'lib/helpers/GeneralHelpers';
import logoWhiteSVG from 'lib/media/arrow-cs-logo.png';
import constants from 'lib/constants';

const FormContainer = styled.div`
  width: 250px;
  margin: auto;
  max-width: 100%;
  padding-top: 96px;
`;

const Logo = styled.img`
  display: block;
  margin: auto;
  width: 250px;
  margin-bottom: 32px;
`;

const TextButton = styled.button`
  color: #8cb3cd;
  font-size: 16px;
  padding: 0px;
  background: transparent;
  border: 0px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

export default ({match, history}) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errors, setErrors] = useState([]);
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const onSubmit = async () => {
    try {
      setErrors([]);
      let errors = GeneralHelpers.passwordCheck(password, confirmPassword);

      if (errors && errors.length > 0) {
        return setErrors(errors);
      }

      // set the form as loading
      setLoading(true);

      // call the mutation
      let res = await resetPassword({
        variables: {
          newPassword: password,
          token: match.params.token,
        },
      });
      // show a success message
      message.success('Password reset. Logging you in...');
      let {accessToken, refreshToken} = res.data.resetPassword.tokens;
      window.localStorage.setItem(constants.authTokenName, accessToken);
      window.localStorage.setItem(constants.refreshTokenName, refreshToken);
      setLoading(false);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      setLoading(false);
      ErrorHelpers.handleError(err);
    }
  };

  return (
    <Background>
      <FormContainer>
        {' '}
        <Logo src={logoWhiteSVG} alt="logo" />
        <div>
          <FormItem>
            <TextInput
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <TextInput
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormItem>
          {errors && errors.length > 0 && (
            <FormItem>
              <ErrorBlock errors={errors} />
            </FormItem>
          )}
          <Button disabled={loading} onClick={onSubmit} style={{width: 150}}>
            {!loading ? ' Set password' : '...'}
          </Button>
          <FormItem>
            <TextButton onClick={() => history.push(`/login`)}>
              Already have an account?
            </TextButton>
          </FormItem>
        </div>
      </FormContainer>
    </Background>
  );
};
