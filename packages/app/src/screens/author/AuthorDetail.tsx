

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {
  graphql,
  createFragmentContainer,
} from 'react-relay';

import {
  withNavigation,
  NavigationScreenProps
} from 'react-navigation';

import styled from 'styled-components/native';
import { createQueryRendererModern } from '../../relay';
import { AuthorDetail_query } from './__generated__/AuthorDetail_query.graphql';

const Wrapper = styled.View`
  flex: 1;
`;

type Props = {
  query: AuthorDetail_query,
} & NavigationScreenProps;

function AuthorDetail ({ query }: Props) {
  const { author } = query;

  const renderItem = ({ item }) => {
    const { node } = item;

    return (
      <TouchableHighlight
        underlayColor="whitesmoke"
      >
        <View style={styles.titleBookContainer}>
          <Text>{node.title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const { books } = author;

  return (
    <Wrapper>
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>Name: {author.name}</Text>
        </View>
        <View style={styles.item}>
          <Text>Age: {author.age}</Text>
        </View>
      </View>

      <Text style={styles.text}>Books by this author</Text>

      <View style={styles.container}>
        <FlatList
          data={books.edges}
          renderItem={renderItem}
          keyExtractor={item => item.node.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </Wrapper>
  );
}

// AuthorDetailFragmentContainer
const AuthorDetailFragmentContainer = createFragmentContainer(
  AuthorDetail, {
    query: graphql`
      fragment AuthorDetail_query on Query @argumentDefinitions(id: { type: "ID!" }) {
        author(id: $id) {
          id
          name
          age
          books {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                _id
                title
              }
            }
          }
        }
      }
    `,
  }
);

export default withNavigation(
  createQueryRendererModern(
    AuthorDetailFragmentContainer,
    AuthorDetail, {
      query: graphql`
        query AuthorDetailQuery($id: ID!) {
          ...AuthorDetail_query @arguments(id: $id),
        }
      `,
      queriesParams: ({ navigation }: Props) => ({ id: navigation.state.params.id }),
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
    borderColor: '#2F259E',
  },
  text: {
    margin: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  titleBookContainer: {
    margin: 20,
  },
});
