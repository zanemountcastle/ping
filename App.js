import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './src/lib/Router';
import { AppLoading } from 'expo';
import RootNavigation from './src/containers/RootNavigation';

import { Provider } from 'react-redux';
import Store from './src/lib/Store';

import * as firebase from 'firebase';


export default class Ping extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <RootNavigation />
      </Provider>
    );
  }
}
