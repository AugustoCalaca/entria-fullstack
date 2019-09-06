

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  graphql,
  createFragmentContainer,
} from 'react-relay';

import { createQueryRendererModern } from '../../relay';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { UserDetail_query } from './__generated__/UserDetail_query.graphql';

type Props = {
  query: UserDetail_query,
} & NavigationScreenProps;

function UserDetail ({ query }: Props) {
  const { user } = query;

  return (
    <View style={styles.container}>
      <Text>ID: {user.id}</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
}

// UserDetailFragmentContainer
const UserDetailFragmentContainer = createFragmentContainer(
  UserDetail, {
    query: graphql`
      fragment UserDetail_query on Query @argumentDefinitions(id: { type: "ID!" }) {
        user(id: $id) {
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
    UserDetailFragmentContainer,
    UserDetail, {
      query: graphql`
        query UserDetailQuery($id: ID!) {
          ...UserDetail_query @arguments(id: $id),
        }
      `,
      queriesParams: ({ navigation }: Props) => ({ id: navigation.state.params.id }),
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
