import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import UserCreate from './scenes/user/UserCreate';
import UserLogin from './scenes/user/UserLogin';
import Me from './scenes/user/Me';

import BookCreate from './scenes/book/BookCreate';
import BookList from './scenes/book/BookList';
import BookDetail from './scenes/book/BookDetail';

import AuthorList from './scenes/author/AuthorList';
import AuthorDetail from './scenes/author/AuthorDetail';

import Icon from 'react-native-vector-icons/FontAwesome5';

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
  navigationOptions: {
    tabBarIcon: ({ focused, tintColor }) => {
      return <Icon name={"user-lock"} size={20} color={tintColor} />
    },
  },
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
  initialRouteName: 'BookList',
  navigationOptions: {
    tabBarIcon: ({ focused, tintColor }) => {
      return <Icon name={"book"} size={20} color={tintColor} />
    },
  },
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
  navigationOptions: {
    tabBarIcon: ({ focused, tintColor }) => {
      return <Icon name={"pen-fancy"} size={20} color={tintColor} />
    },
  },
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2F259E',
    },
    headerTintColor: '#fff',
  },
});


const UserStack = createStackNavigator({
  Me: {
    screen: Me,
    navigationOptions: {
      title: 'Me',
    }
  },
}, {
  initialRouteName: 'Me',
  navigationOptions: {
    tabBarIcon: ({ focused, tintColor }) => {
      return <Icon name={"user"} size={20} color={tintColor} />
    },
  },
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
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#2F259E',
      inactiveTintColor: 'gray',
    },
  })
);

export { LoggedOutApp, LoggedInApp };
