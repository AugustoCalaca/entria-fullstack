

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

import { createQueryRendererModern } from '../../relay';
import { withNavigation } from 'react-navigation';
import { Navigation } from '../../types';
import { AuthorDetail_query } from './__generated__/AuthorDetail_query.graphql';

type Props = {
  query: AuthorDetail_query,
  navigation: Navigation,
};

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
    <>
      <View style={styles.container}>
        <Text>Author Name: {author.name}</Text>
        <Text>Author Age: {author.age}</Text>
      </View>

      <View >
        <Text>Books by this author</Text>
      </View>

      <FlatList
        data={books.edges}
        renderItem={renderItem}
        keyExtractor={item => item.node.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // ListFooterComponent={this.renderFooter}
      />
    </>
  );
}

// UserDetailFragmentContainer
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
    // alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  titleBookContainer: {
    margin: 20,
  },
});
