

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  graphql,
  createFragmentContainer,
} from 'react-relay';

import styled from 'styled-components/native';

import { createQueryRendererModern } from '../../relay';
import { withNavigation } from 'react-navigation';
import { Navigation } from '../../types';
import { Me_query } from './__generated__/Me_query.graphql';
import { signout } from '../../auth';

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
  query: Me_query,
  navigation: Navigation,
};

function Me ({ query }: Props) {
  const { me } = query;

  return (
    <>
      <StyledView>
        <StyledTouchable activeOpacity={0.7} onPress={() => signout()}>
          <StyledText>Register Now</StyledText>
        </StyledTouchable>
      </StyledView>

      <View style={styles.container}>
        <Text>ID: {me.id}</Text>
        <Text>Name: {me.name}</Text>
        <Text>Email: {me.email}</Text>
      </View>
    </>
  );
}

// UserDetailFragmentContainer
const MeFragmentContainer = createFragmentContainer(
  Me, {
    query: graphql`
      fragment Me_query on Query {
        me {
          id
          name
          email
        }
      }
    `,
  }
);

export default withNavigation(
  createQueryRendererModern(
    MeFragmentContainer,
    Me, {
      query: graphql`
        query MeQuery {
          ...Me_query,
        }
      `,
    },
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
