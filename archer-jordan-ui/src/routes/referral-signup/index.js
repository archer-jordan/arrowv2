import React, {useState} from 'react';
import styled from 'styled-components';
import {validate} from 'email-validator';
//COMPONENTS
import TextInput from 'components/inputs/TextInput';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
import FormItem from 'components/common/FormItem';
import Background from 'components/common/GradientBackground';
// LIB
import logoWhiteSVG from 'lib/media/arrow-cs-logo.png';
// LIB
import ErrorHelpers from 'lib/helpers/ErrorHelpers';
// APOLLO
import {useMutation} from 'react-apollo';
import REFERRAL_SIGNUP from 'ApolloClient/Mutations/referralSignup';

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

const Text = styled.div`
  color: #fff;
  font-size: 16px;
  padding: 0px;
  background: transparent;
  border: 0px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

const Line = styled.div`
  height: 3px;
  border-radius: 25px;
  background: #fff;
`;

const Uppercase = styled.h3`
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
`;

export default () => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState([]);
  const [referralSignup] = useMutation(REFERRAL_SIGNUP);

  const onSubmit = async () => {
    try {
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

  if (emailSent) {
    return (
      <Background>
        {' '}
        <div style={{minHeight: 257, paddingTop: 200}}>
          <div style={{textAlign: 'center'}}>
            <Icon
              style={{fontSize: 48, marginBottom: 10, color: '#fff'}}
              type="check-circle"
            />
            <h2
              style={{
                textAlign: 'center',
                margin: 0,
                fontSize: 18,
                color: '#fff',
              }}
            >
              We've sent you an email which includes a link <br />
              where you can complete your partner account.
            </h2>
          </div>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <FormContainer>
        <Logo src={logoWhiteSVG} alt="logo" />
        <Line />
        <Uppercase>REFERRAL PARTNERS</Uppercase>
        <form onSubmit={onSubmit}>
          <FormItem>
            <TextInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormItem>
          {errors && errors.length > 0 && (
            <FormItem>
              <ErrorBlock errors={errors} />
            </FormItem>
          )}
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={loading}
            style={{width: 150}}
          >
            {!loading ? 'Send me a link' : '...'}
          </Button>
          <FormItem>
            <Text>
              Please provide your email address and we’ll send you a secure link
              to create a password and access your account.
            </Text>
          </FormItem>
        </form>
      </FormContainer>
    </Background>
  );
};

// // STYLED-COMPONENTS
// // ========================================

// class AuthRegister extends React.PureComponent {
//   state = {
//     email: null,
//     emailSent: false,
//     loading: false,
//     errors: [],
//   };
//   onSubmit = async () => {
//     try {
//       // check that user added an email
//       if (!this.state.email) {
//         return this.setState({errors: ['Please provide an email']});
//       }
//       // check if its a valid email
//       if (!validate(this.state.email)) {
//         return this.setState({errors: ['That is not a valid email']});
//       }
//       // if all is well, set the form to loading
//       this.setState({loading: true});
//       // fire off the mutation
//       await this.props.registerAccount({
//         variables: {
//           email: this.state.email,
//         },
//       });
//       // set emailSent as true so we can
//       this.setState({loading: false, emailSent: true});
//     } catch (err) {
//       let errMessage = err.message.replace('GraphQL', '');
//       if (err && err.message.includes('Incorrect password [403]')) {
//         errMessage = 'You have entered an invalid username or password';
//       }
//       return this.setState({
//         loading: false,
//         errors: [ErrorHelpers.cleanErrorString(errMessage)],
//       });
//     }
//   };
//   render() {
//     return (
//       <Background>
//         {!this.state.emailSent ? (

//         ) : (
//           <SuccessCard />
//         )}
//       </Background>
//     );
//   }
// }
