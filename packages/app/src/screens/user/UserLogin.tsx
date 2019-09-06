import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';

import { NavigationScreenProps } from 'react-navigation';
import { Input, InputWrapper } from '../../components/Input';
import Button from '../../components/Button';
import { signin } from '../../relay/helpers';
import UserLoginWithEmailMutation from './UserLoginWithEmailMutation';

const Wrapper = styled.View`
  flex: 1;
`;

const ButtonText = styled.Text`
  color: #eee;
  font-weight: 700;
  font-size: 16px;
`;

const RegisterButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 10;
  align-items: center;
  justify-content: center;
`;

const RegisterButton = styled.TouchableOpacity`
  padding-left: 10;
  padding-right: 10;
  margin-right: 20;
  margin-left: 20;
  border-width: 1;
  border-radius: 20;
  border-color: #120E3D;
`;

const RegisterText = styled.Text`
  color: #111;
  font-weight: 600;
  font-size: 12px;
`;

const RegisterButtonText = styled.Text`
  font-size: 11;
  color: #120E3D;
`;

type FormValues = {
  email: string,
  password: string,
}

const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: Yup
    .string()
    .label('Password')
    .required()
    .min(3, 'Seems a bit short...')
});

function UserLogin ({ screenProps, navigation }: NavigationScreenProps) {
  const handleRegister = (values: FormValues) => {
    const input = { ...values }

    console.log('input');
    console.log(input);

    const onCompleted = (response) => {
      console.log('onCompleted');

      const data = response.UserLoginWithEmail;
      if(data.error) {
        return (
          Alert.alert(
            'Unable to Login :(',
            `${data.error}`
          )
        );
      }

      signin(data.token)
      console.log('vai dar merda...', screenProps);
      screenProps.setLogged && screenProps.setLogged(true);
      console.log('é pra glorificar de pé');
    }

    const onError = () => {
      console.log('onError');
    }

    UserLoginWithEmailMutation.commit(input, onCompleted, onError);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <>
            <InputWrapper>
              <Input
                underlineColorAndroid={
                  (formikProps.touched.email && formikProps.errors.email)
                    ? 'red'
                    : '#444'
                }
                name="email"
                placeholder="user@example.com"
                selectionColor="#4032DA"
                onChangeText={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
                autoFocus={true}
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                underlineColorAndroid={
                  (formikProps.touched.password && formikProps.errors.password)
                    ? 'red'
                    : '#444'
                }
                name="password"
                placeholder="Password"
                selectionColor="#4032DA"
                onChangeText={formikProps.handleChange('password')}
                onBlur={formikProps.handleBlur('password')}
                secureTextEntry
              />
            </InputWrapper>

            {formikProps.isSubmitting ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Button onPress={formikProps.handleSubmit}>
                <ButtonText>Login</ButtonText>
              </Button>
            )}
          </>
        )}
      </Formik>

      <RegisterButtonContainer>
        <RegisterText>Don't have an account? </RegisterText>
        <RegisterButton activeOpacity={0.7} onPress={() => navigation.navigate('UserCreate')}>
          <RegisterButtonText>Register Now</RegisterButtonText>
        </RegisterButton>
      </RegisterButtonContainer>

    </Wrapper>
  );
}

export default UserLogin;
