import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import AppletsFeed from '../components/AppletsFeed';
import AppletsHeader from '../components/AppletsHeader';

export default class Applets extends Component {

  render() {
      return (
        <View style={styles.container}>
          <AppletsHeader />
          <AppletsFeed />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
