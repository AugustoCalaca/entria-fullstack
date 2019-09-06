
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

import { withNavigation, NavigationScreenProps } from 'react-navigation';

import { createQueryRendererModern } from '../../relay';

import { UserList_query } from './__generated__/UserList_query.graphql';

type Props = {
  query: UserList_query,
  relay: any,
} & NavigationScreenProps;

function UserList({ query, relay, navigation }: Props) {
  const [isFetchingTop, setIsFetchingTop] = useState<boolean>(false)

  const onRefresh = () => {
    const { users } = query;
    console.log('user list: ', users);

    if (relay.isLoading()) {
      return;
    }

    setIsFetchingTop(true);

    relay.refetchConnection(users.edges.length, () => {
      setIsFetchingTop(false);
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
        onPress={() => goToUserDetail(node)}
        underlayColor="whitesmoke"
      >
        <View style={styles.userContainer}>
          <Text>{node.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const goToUserDetail = user => {
    const { navigate } = navigation;

    navigate('UserDetail', { id: user.id });
  };

  const { users } = query;

  return (
    <View style={styles.container}>
      <FlatList
        data={users.edges}
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

const UserListPaginationContainer = createPaginationContainer(
  UserList, {
    query: graphql`
      fragment UserList_query on Query {
        users(
          first: $count
          after: $cursor
        ) @connection(key: "UserList_users") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  }, {
    direction: 'forward',
    getConnectionFromProps(props) {
      console.log('getConnectionFromProps')
      return props.query && props.query.users;
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
      };
    },
    query: graphql`
      query UserListPaginationQuery(
        $count: Int!,
        $cursor: String
      ) {
        ...UserList_query
      }
    `,
  },
);

export default withNavigation(
  createQueryRendererModern(
    UserListPaginationContainer,
    UserList, {
      query: graphql`
        query UserListQuery(
          $count: Int!,
          $cursor: String
        ) {
          ...UserList_query
        }
      `,
      variables: { cursor: null, count: 1 },
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
