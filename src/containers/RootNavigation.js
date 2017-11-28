import { Notifications } from 'expo';
import React from 'react';
import { View, Button, Text } from 'react-native'
import { StackNavigator } from 'react-navigation';
import Login from '../components/LoginScreen';
import registerForPushNotificationsAsync from '../../api/registerForPushNotificationsAsync';
import { Tabs } from '../lib/Router';

const RootStackNavigator = StackNavigator(
  {
    Login:{
      screen: Login

    },
    Main: {
      screen: Tabs,
    },

  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
