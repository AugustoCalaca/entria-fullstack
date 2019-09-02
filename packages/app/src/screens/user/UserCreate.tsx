import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import UserRegisterWithEmailMutation from './UserRegisterWithEmailMutation';
import { Navigation } from '../../types';
import { signin } from '../../auth';

const Wrapper = styled.View`
  flex: 1;
`;

const ButtonText = styled.Text`
  color: #000;
  font-weight: 700;
  font-size: 16px;
`;

type Props = {
  navigation: Navigation,
}

function UserCreate ({ navigation }: Props) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = () => {
    const input = {
      name,
      email,
      password,
    }

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
      navigation.navigate('Me');
    }

    const onError = () => {
      console.log('onError');
    }

    UserRegisterWithEmailMutation.commit(input, onCompleted, onError);
  }

  const goToList = () => {
    navigation.navigate('UserList');
  };

  return (
    <Wrapper>
      <Input
        name="name"
        placeholder="Name"
        value={name}
        onChangeText={value => setName(value)}
      />
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

      <Button onPress={() => goToList()}>
        <ButtonText>List of users</ButtonText>
      </Button>
    </Wrapper>
  );
}

export default UserCreate;
