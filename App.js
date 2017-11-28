import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './src/lib/Router';
import { AppLoading } from 'expo';

import { Provider } from 'react-redux';
import Store from './src/lib/Store';

export default class Ping extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Tabs />
      </Provider>
    );
  }
}
