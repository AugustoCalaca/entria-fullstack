//@flow
import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 40;
  border-radius: 20;
  margin-top: 20;
  background-color: #4032DA;
  border-color: rgba(0, 0, 0, 0.35);
  border-width: 1;
  margin-left: auto;
  margin-right: auto;

`;

type Props = {
  onPress?: () => void,
  children?: ReactNode
};

const Button = (props: Props) => (
  <Wrapper
    activeOpacity={0.7}
    onPress={() => props.onPress()}
  >
    {props.children}
  </Wrapper>
);

export default Button;
