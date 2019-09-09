

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {
  graphql,
  createFragmentContainer,
} from 'react-relay';

import { NavigationScreenProps } from 'react-navigation';

import { createQueryRendererModern } from '../../relay';
import { withNavigation } from 'react-navigation';
import { BookDetail_query } from './__generated__/BookDetail_query.graphql';

type Props = {
  query: BookDetail_query,
} & NavigationScreenProps;

function BookDetail ({ query, navigation }: Props) {
  const { book } = query;

  const goToBookDetail = id => {
    const { navigate } = navigation;

    navigate('AuthorDetail', { id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Title: {book.title}</Text>
      </View>

      <View style={styles.separator}>
        <TouchableHighlight
          onPress={() => goToBookDetail(book.author.id)}
          underlayColor="whitesmoke"
        >
          <View style={styles.authorContainer}>
            <Text>Author Name: {book.author.name}</Text>
            <Text>Author Age: {book.author.age}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const BookDetailFragmentContainer = createFragmentContainer(
  BookDetail, {
    query: graphql`
      fragment BookDetail_query on Query @argumentDefinitions(id: { type: "ID!" }) {
        book(id: $id) {
          id
          title
          author {
            id
            name
            age
          }
        }
      }
    `,
  }
);

export default withNavigation(
  createQueryRendererModern(
    BookDetailFragmentContainer,
    BookDetail, {
      query: graphql`
        query BookDetailQuery($id: ID!) {
          ...BookDetail_query @arguments(id: $id),
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
    borderColor: '#ddd',
  },
  separator: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
  },
  authorContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
