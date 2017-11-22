import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Search extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Search page!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
