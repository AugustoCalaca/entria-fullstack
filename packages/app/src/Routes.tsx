import React from 'react';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import UserCreate from './screens/user/UserCreate';
import UserLogin from './screens/user/UserLogin';
import UserList from './screens/user/UserList';
import UserDetail from './screens/user/UserDetail';
import Me from './screens/user/Me';

import BookCreate from './screens/book/BookCreate';
import BookList from './screens/book/BookList';
import BookDetail from './screens/book/BookDetail';

import AuthorList from './screens/author/AuthorList';
import AuthorDetail from './screens/author/AuthorDetail';

import Icon from 'react-native-vector-icons/FontAwesome';

const AuthStack = createStackNavigator({
  UserCreate: {
    screen: UserCreate,
    navigationOptions: {
      title: 'User Create',
    }
  },
  UserLogin: {
    screen: UserLogin,
    navigationOptions: {
      title: 'User Login',
    }
  },
}, {
  initialRouteName: 'UserLogin',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F259E',
    },
    headerTintColor: '#fff',
  },
});

const UserStack = createStackNavigator({
  UserList: {
    screen: UserList,
    navigationOptions: {
      title: 'User List',
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      title: 'Me',
    }
  },
  UserCreate: {
    screen: UserCreate,
    navigationOptions: {
      title: 'User Create',
    }
  },
}, {
  initialRouteName: 'UserList',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F259E',
    },
    headerTintColor: '#fff',
  },
});

const BookStack = createStackNavigator({
  BookCreate: {
    screen: BookCreate,
    navigationOptions: {
      title: 'Book Create',
    }
  },
  BookList: {
    screen: BookList,
    navigationOptions: {
      title: 'Book List',
    }
  },
  BookDetail: {
    screen: BookDetail,
    navigationOptions: {
      title: 'Book Detail',
    }
  },
}, {
  initialRouteName: 'BookCreate',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F259E',
    },
    headerTintColor: '#fff',
  },
});

const AuthorStack = createStackNavigator({
  AuthorList: {
    screen: AuthorList,
    navigationOptions: {
      title: 'Author List',
    }
  },
  AuthorDetail: {
    screen: AuthorDetail,
    navigationOptions: {
      title: 'Author Detail',
    }
  },
}, {
  initialRouteName: 'AuthorList',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F259E',
    },
    headerTintColor: '#fff',
  },
});

const LoggedOutApp = createAppContainer(AuthStack);

const LoggedInApp = createAppContainer(
  createBottomTabNavigator({
    BookStack,
    AuthorStack,
    UserStack,
  }, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'BookStack') {
          iconName = 'book';
        } else if (routeName === 'AuthorStack') {
          iconName = 'person';
        } else if (routeName === 'UserStack') {
          iconName = 'user';
        }

        return <Icon name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      // showLabel: false,
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    },
  })
);

export { LoggedOutApp, LoggedInApp };
