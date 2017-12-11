// import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Login, Signup } from '../containers';
import { Tabs } from '../lib/Router';

const RootStackNavigator = StackNavigator(
  {
    Login:{
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Main: {
      screen: Tabs,
    },
  },
  {
    headerMode: 'none',
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return (
      <RootStackNavigator />
    );
  }
}
