import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';

import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

const Loading = () => (
  <Wrapper>
    <ActivityIndicator size="small" color="#0000ff" />
  </Wrapper>
);

export default Loading;
