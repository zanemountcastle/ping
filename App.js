import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './src/config/router';
import { AppLoading } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <Tabs />
    );
  }
}
