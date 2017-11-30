import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ListView, Platform  } from 'react-native';
import { Header } from 'react-native-elements';

export default class Search extends Component {

  render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Search', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
            outerContainerStyles={{ backgroundColor: '#fff' }}
          />
          <View style={styles.body}>
            <Text>Search page!</Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
