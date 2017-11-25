import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import AppletsFeed from '../components/AppletsFeed';
import AppletsHeader from '../components/AppletsHeader';

import { getFeeds } from '../utilities/Fetch';

export default class Applets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
    };
  }

  componentWillMount() {
    getFeeds().then((feeds) => { // Set feeds when the come in
      this.setState({feeds: feeds})
    });
  }

  render() {
      return (
        <View style={styles.container}>
          <AppletsHeader />
          <AppletsFeed feeds={this.state.feeds} />
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
