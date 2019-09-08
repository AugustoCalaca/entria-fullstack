import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components/native';
import { NavigationScreenProps } from 'react-navigation';

import Button from '../../components/Button';
import { Input, InputWrapper} from '../../components/Input';
import BookRegisterMutation from './BookRegisterMutation';

const Wrapper = styled.View`
  flex: 1;
`;

const ButtonText = styled.Text`
  color: #eee;
  font-weight: 700;
  font-size: 16;
`;

type FormValues = {
  bookTitle: string,
  bookAuthorName: string,
  bookAuthorAge: string,
}

const validationSchema = Yup.object().shape({
  bookTitle: Yup
    .string()
    .label('Book Title')
    .required(),
  bookAuthorName: Yup
    .string()
    .label('Author Name')
    .required(),
  bookAuthorAge: Yup
    .string()
    .label('Author Age')
    .required()
    .max(2)
});

function UserCreate ({ navigation }: NavigationScreenProps) {
  const handleRegister = ({ bookAuthorAge, ...rest }: FormValues) => {
    const input = { bookAuthorAge: parseInt(bookAuthorAge), ...rest };

    const onCompleted = () => {
      console.log('onCompleted');

      navigation.goBack();
    }

    const onError = () => {
      console.log('onError');
    }

    BookRegisterMutation.commit(input, onCompleted, onError);
  };

  return (
    <Formik
     initialValues={{ bookTitle: '', bookAuthorName: '', bookAuthorAge: '0' }}
     onSubmit={handleRegister}
     validationSchema={validationSchema}
   >
     {(formikProps: FormikProps<FormValues>) => (
       <Wrapper>
          <InputWrapper>
            <Input
              underlineColorAndroid={
                (formikProps.touched.bookTitle && formikProps.errors.bookTitle)
                  ? 'red'
                  : '#444'
              }
              name="bookTitle"
              placeholder="Book Title"
              selectionColor="#4032DA"
              onChangeText={formikProps.handleChange('bookTitle')}
              onBlur={formikProps.handleBlur('bookTitle')}
              autoFocus={true}
            />
          </InputWrapper>

          <InputWrapper>
           <Input
              underlineColorAndroid={
                (formikProps.touched.bookAuthorName && formikProps.errors.bookAuthorName)
                  ? 'red'
                  : '#444'
              }
              name="bookAuthorName"
              placeholder="Author's name of the book"
              selectionColor="#4032DA"
              onChangeText={formikProps.handleChange('bookAuthorName')}
              onBlur={formikProps.handleBlur('bookAuthorName')}
              formikProps={formikProps}
            />
          </InputWrapper>

          <InputWrapper>
            <Input
              underlineColorAndroid={
                (formikProps.touched.bookAuthorAge && formikProps.errors.bookAuthorAge)
                  ? 'red'
                  : '#444'
              }
              name="bookAuthorAge"
              placeholder="Author's Age of the book"
              maxLength={2}
              keyboardType={"numeric"}
              selectionColor="#4032DA"
              onChangeText={formikProps.handleChange('bookAuthorAge')}
              onBlur={formikProps.handleBlur('bookAuthorAge')}
            />
          </InputWrapper>

          {formikProps.isSubmitting ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button onPress={formikProps.handleSubmit}>
              <ButtonText>Register</ButtonText>
            </Button>
          )}
      </Wrapper>
     )}
    </Formik>
  );
}

export default UserCreate;
