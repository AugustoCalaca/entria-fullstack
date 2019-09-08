import React from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import { Input, InputWrapper} from '../../components/Input';
import UserRegisterWithEmailMutation from './UserRegisterWithEmailMutation';
import { NavigationScreenProps } from 'react-navigation';
import { signin } from '../../relay/helpers';

const Wrapper = styled.View`
  flex: 1;
`;

const ButtonText = styled.Text`
  color: #eee;
  font-weight: 700;
  font-size: 16px;
`;

type FormValues = {
  name: string,
  email: string,
  password: string,
}

const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .label('Name')
    .required(),
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

function UserCreate ({ navigation, screenProps }: NavigationScreenProps) {
  const handleRegister = (values: FormValues) => {
    const input = { ...values }

    const onCompleted = (response) => {
      console.log('onCompleted');

      const data = response.UserRegisterWithEmail;
      if(data.error) {
        return (
          Alert.alert(
            'Unable to Register :(',
            `${data.error}`
          )
        );
      }

      signin(data.token);
      screenProps.setLogged(true);
    }

    const onError = () => {
      console.log('onError');
    }

    UserRegisterWithEmailMutation.commit(input, onCompleted, onError);
  }

  return (
    <Wrapper>
       <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleRegister}
        validationSchema={validationSchema}
      >
        {(formikProps: FormikProps<FormValues>) => (
          <Wrapper>
            <InputWrapper>
              <Input
                underlineColorAndroid={
                  (formikProps.touched.name && formikProps.errors.name)
                    ? 'red'
                    : '#444'
                }
                name="name"
                placeholder="Name"
                selectionColor="#4032DA"
                onChangeText={formikProps.handleChange('name')}
                onBlur={formikProps.handleBlur('name')}
                autoFocus={true}
              />
            </InputWrapper>

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
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Button onPress={formikProps.handleSubmit}>
                <ButtonText>Register</ButtonText>
              </Button>
            )}
          </Wrapper>
        )}
      </Formik>
    </Wrapper>
  );
}

export default UserCreate;
