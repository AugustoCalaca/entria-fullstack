import React, { useState } from 'react';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import BookRegisterMutation from './BookRegisterMutation';
import { Navigation } from '../../types';

const Wrapper = styled.View`
  flex: 1;
`;

const ButtonText = styled.Text`
  color: #eee;
  font-weight: 700;
  font-size: 16;
`;

type Props = {
  navigation: Navigation,
}

function UserCreate ({ navigation }: Props) {
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookAuthorName, setBookAuthorName] = useState<string>('');
  const [bookAuthorAge, setBookAuthorAge] = useState<string>('');

  const handleRegister = () => {
    const input = {
      bookTitle,
      bookAuthorName,
      bookAuthorAge: parseInt(bookAuthorAge),
    }

    const onCompleted = () => {
      console.log('onCompleted');

      navigation.navigate('BookList');
    }

    const onError = () => {
      console.log('onError');
    }

    BookRegisterMutation.commit(input, onCompleted, onError);
  }

  const goToList = () => {
    navigation.navigate('BookList');
  };

  return (
    <Wrapper>
      <Input
        name="bookTitle"
        placeholder="Book Title"
        value={bookTitle}
        selectionColor="#4032DA"
        onChangeText={value => setBookTitle(value)}
      />
      <Input
        name="bookAuthorName"
        placeholder="Author Name"
        value={bookAuthorName}
        selectionColor="#4032DA"
        onChangeText={value => setBookAuthorName(value)}
        />
      <Input
        name="bookAuthorAge"
        placeholder="Author Age"
        value={bookAuthorAge}
        selectionColor="#4032DA"
        onChangeText={value => setBookAuthorAge(value)}
        maxLength={2}
        keyboardType={"numeric"}
      />
      <Button onPress={() => handleRegister()}>
        <ButtonText>Book Register</ButtonText>
      </Button>
    </Wrapper>
  );
}

export default UserCreate;
