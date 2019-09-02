import React from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
  margin-right: 15;
  margin-left: 15;
  padding-left: 10;
  color: #222;
`;

type Props = {
  onChangeText?: (searchText: String) => void,
};

const SearchInput = (props: Props) => (
    <StyledInput
      selectionColor="#271E85"
      placeholder="Search..."
      placeholderTextColor="#271E85"
      onChangeText={props.onChangeText}
      underlineColorAndroid="#271E85"
    />
);

export default SearchInput;
