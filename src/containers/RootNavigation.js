// import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { LoginScreen } from '../components';
import { Tabs } from '../lib/Router';

const RootStackNavigator = StackNavigator(
  {
    Login:{
      screen: LoginScreen,

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
