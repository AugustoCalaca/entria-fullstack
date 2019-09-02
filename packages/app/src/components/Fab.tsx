
import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  right: 15;
  bottom: 15;
  width: 55;
  height: 55;
  border-radius:  50;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: #3227AB;
`;

type Props = {
  onPress?: () => void,
  children?: ReactNode
};

const Fab = (props: Props) => {
  return (
    <Wrapper
      activeOpacity={0.7}
      onPress={() => props.onPress()}
    >
      {props.children}
    </Wrapper>
  )
};

export default Fab;
