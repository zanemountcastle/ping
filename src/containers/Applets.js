import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import { AppletsFeed } from '../components';

export default class Applets extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'My Applets', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
          outerContainerStyles={{ backgroundColor: '#fff' }}
        />
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
