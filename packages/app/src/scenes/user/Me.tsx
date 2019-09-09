

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  graphql,
  createFragmentContainer,
} from 'react-relay';

import styled from 'styled-components/native';

import { createQueryRendererModern } from '../../relay';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { Me_query } from './__generated__/Me_query.graphql';
import { signout } from '../../relay/helpers';

const StyledView = styled.View`
  flex-direction: row;
  margin-top: 10;
  align-items: center;
  justify-content: flex-end;
`;

const StyledTouchable = styled.TouchableOpacity`
  padding-left: 10;
  padding-right: 10;
  padding-top: 5;
  padding-bottom: 5;
  margin-right: 20;
  margin-left: 20;
  border-radius: 20;
  background-color: red;
`;

const StyledText = styled.Text`
  font-size: 12;
  font-weight: 700;
  color: #eee;
`;

type Props = {
  query: Me_query,
} & NavigationScreenProps;

function Me ({ query, screenProps }: Props) {
  const { me } = query;
  const handleLogout = () => {
    signout();
    screenProps.setLogged(false);
  };

  return (
    <>
      <StyledView>
        <StyledTouchable activeOpacity={0.7} onPress={handleLogout}>
          <StyledText>Logout</StyledText>
        </StyledTouchable>
      </StyledView>

      <View style={styles.container}>
        <View style={styles.item}>
          <Text>Name: {me.name}</Text>
        </View>
        <View style={styles.item}>
          <Text>Email: {me.email}</Text>
        </View>
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
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
