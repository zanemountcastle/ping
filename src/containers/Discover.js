import React, { Component } from 'react';
import { StyleSheet, Text, View ,  ScrollView, Alert} from 'react-native';
import { Header } from 'react-native-elements';


export default class Discover extends Component {

  render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Discover', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
            outerContainerStyles={{ backgroundColor: '#fff' }}
          />
          <View style={styles.body}>
            <Text>Discover page!</Text>
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
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
