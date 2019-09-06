

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
      <Text>Title: {book.title}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  authorContainer: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2F259E',
  },
});
