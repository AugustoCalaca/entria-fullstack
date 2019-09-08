
import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import {
  graphql,
  createPaginationContainer,
} from 'react-relay';

import {
  withNavigation,
  NavigationScreenProps
} from 'react-navigation';

import { createQueryRendererModern } from '../../relay';

import { AuthorList_query } from './__generated__/AuthorList_query.graphql';

import SearchInput from '../../components/SearchInput';

type Props = {
  query: AuthorList_query,
  relay: any,
} & NavigationScreenProps;

function AuthorList({ query, relay, navigation }: Props) {
  const [isFetchingTop, setIsFetchingTop] = useState<boolean>(false)

  const onRefresh = (searchText: String = '') => {
    const { authors } = query;
    console.log('author list: ', authors);

    if (relay.isLoading()) {
      return;
    }

    setIsFetchingTop(true);
    console.log('search');
    console.log(searchText);

    relay.refetchConnection(authors.edges.length, () => {
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
        onPress={() => goToAuthorDetail(node)}
        underlayColor="whitesmoke"
      >
        <View style={styles.userContainer}>
          <Text>{node.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const goToAuthorDetail = author => {
    const { navigate } = navigation;

    navigate('AuthorDetail', { id: author.id });
  };

  const { authors } = query;

  return (
    <View style={styles.container}>
      <SearchInput
        onChangeText={(searchText: String) => onRefresh(searchText)}
      />
      <FlatList
        data={authors.edges}
        renderItem={renderItem}
        keyExtractor={item => item.node.id}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={isFetchingTop}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        // ListFooterComponent={this.renderFooter}
      />
    </View>
  );
};

const AuthorListPaginationContainer = createPaginationContainer(
  AuthorList, {
    query: graphql`
      fragment AuthorList_query on Query {
        authors(
          first: $count
          after: $cursor
          search: $search
        ) @connection(key: "AuthorList_authors") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
              age
            }
          }
        }
      }
    `,
  }, {
    direction: 'forward',
    getConnectionFromProps(props) {
      console.log('getConnectionFromProps')
      return props.query && props.query.authors;
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
        search: fragmentVariables.search
      };
    },
    query: graphql`
      query AuthorListPaginationQuery(
        $count: Int!,
        $cursor: String,
        $search: String,
      ) {
        ...AuthorList_query
      }
    `,
  },
);

export default withNavigation(
  createQueryRendererModern(
    AuthorListPaginationContainer,
    AuthorList, {
      query: graphql`
        query AuthorListQuery(
          $count: Int!,
          $cursor: String,
          $search: String,
        ) {
          ...AuthorList_query
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
  userContainer: {
    margin: 20,
  },
});
