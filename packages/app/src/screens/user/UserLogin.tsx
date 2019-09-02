import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import UserLoginWithEmailMutation from './UserLoginWithEmailMutation';
import { Navigation } from '../../types';

const Wrapper = styled.View`
  flex: 1;
`;

const ButtonText = styled.Text`
  color: #eee;
  font-weight: 700;
  font-size: 16px;
`;

const RegisterText = styled.Text`
  color: #111;
  font-weight: 600;
  font-size: 12px;
`;

const StyledView = styled.View`
  flex-direction: row;
  margin-top: 10;
  align-items: center;
  justify-content: center;
`;

const StyledTouchable = styled.TouchableOpacity`
  padding-left: 10;
  padding-right: 10;
  margin-right: 20;
  margin-left: 20;
  border-width: 1;
  border-radius: 20;
  border-color: #120E3D;
`;

const StyledText = styled.Text`
  font-size: 12;
  color: #120E3D;
`;

type Props = {
  navigation: Navigation,
}

function UserCreate ({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    const input = {
      email,
      password,
    }

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

      navigation.navigate('UserCreate');
    }

    const onError = () => {
      console.log('onError');
    }

    UserLoginWithEmailMutation.commit(input, onCompleted, onError);
  }

  const goToList = () => {
    navigation.navigate('UserList');
  };

  return (
    <Wrapper>
      <Input
        name="email"
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <Input
        name="password"
        placeholder="Password"
        value={password}
        onChangeText={value => setPassword(value)}
        secureTextEntry
      />
      <Button onPress={() => handleRegister()}>
        <ButtonText>User Register</ButtonText>
      </Button>

      <StyledView>
        <RegisterText>Don't have an account? </RegisterText>
        <StyledTouchable activeOpacity={0.7} onPress={() => navigation.navigate('UserCreate')}>
          <StyledText>Register Now</StyledText>
        </StyledTouchable>
      </StyledView>
    </Wrapper>
  );
}

export default UserCreate;
