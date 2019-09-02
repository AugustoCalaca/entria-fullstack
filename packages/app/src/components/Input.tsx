

import React from 'react';
import styled from 'styled-components/native';

const InputWrapper = styled.View`
  height: 40;
  border-bottom-color: gray;
  border-bottom-width: 1;
  margin: 20px;
`;

const RegisterTextInput = styled.TextInput`
  height: 40;
  width: 100%;
`;

type Props = {
  name?: string,
  placeholder?: string,
  value?: string,
  onChangeText?: (string) => void,
  secureTextEntry?: boolean,
  selectionColor?: string,
  maxLength?: number,
  keyboardType?: 'default' | 'numeric',
};

const Input = (props: Props) => (
  <InputWrapper>
    <RegisterTextInput {...props}/>
  </InputWrapper>
);

export default Input;
