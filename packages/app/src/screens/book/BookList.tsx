
import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import {
  graphql,
  createPaginationContainer,
} from 'react-relay';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { createQueryRendererModern } from '../../relay';

import { BookList_query } from './__generated__/BookList_query.graphql';
import { Navigation, Relay } from '../../types';

import SearchInput from '../../components/SearchInput';
import Fab from '../../components/Fab';

type Props = {
  query: BookList_query,
  relay: Relay,
  navigation: Navigation,
};

export function BookList({ query, relay, navigation }: Props) {
  const [isFetchingTop, setIsFetchingTop] = useState<boolean>(false)

  const onRefresh = (searchText: String = '') => {
    const { books } = query;

    if (relay.isLoading()) {
      return;
    }

    setIsFetchingTop(true);

    relay.refetchConnection(books.edges.length, () => {
      setIsFetchingTop(false);
    }, {
      search: searchText,
    });
  };

  const onEndReached = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return;
    }

    // fetch more 2
    relay.loadMore(2, (err) => {
      console.log('loadMore: ', err);
    });
  };

  const renderItem = ({ item }) => {
    const { node } = item;

    return (
      <TouchableHighlight
        onPress={() => goToBookDetail(node)}
        underlayColor="whitesmoke"
      >
        <View style={styles.bookContainer}>
          <Text>{node.title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const goToBookDetail = book => {
    const { navigate } = navigation;

    navigate('BookDetail', { id: book.id });
  };

  const { books } = query;

  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={(searchText: String) => onRefresh(searchText)}
      />
      <FlatList
        data={books.edges}
        renderItem={renderItem}
        keyExtractor={item => item.node.id}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={isFetchingTop}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // ListFooterComponent={this.renderFooter}
      />
      <Fab onPress={() => navigation.navigate('BookCreate')}>
        <Icon name='plus' size={20} color='#fff' />
      </Fab>
    </View>
  );
};

const BookListPaginationContainer = createPaginationContainer(
  BookList, {
    query: graphql`
      fragment BookList_query on Query {
        books(
          first: $count
          after: $cursor
          search: $search
        ) @connection(key: "BookList_books") {
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
    `,
  }, {
    direction: 'forward',
    getConnectionFromProps(props) {
      console.log('getConnectionFromProps')
      return props.query && props.query.books;
    },
    getFragmentVariables(prevVars, totalCount) {
      console.log('getConnectionFromProps')
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
        search: fragmentVariables.search,
      };
    },
    query: graphql`
      query BookListPaginationQuery(
        $count: Int!,
        $cursor: String,
        $search: String,
      ) {
        ...BookList_query
      }
    `,
  },
);

export default withNavigation(
  createQueryRendererModern(
    BookListPaginationContainer,
    BookList, {
      query: graphql`
        query BookListQuery(
          $count: Int!,
          $cursor: String,
          $search: String,
        ) {
          ...BookList_query
        }
      `,
      variables: { cursor: null, count: 1, search: '' },
    },
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#cccccc',
  },
  bookContainer: {
    margin: 20,
  },
});
