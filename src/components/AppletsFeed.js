import React, { Component } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { getFeeds } from '../lib/Fetch';

import AppletPreview from './AppletPreview';

export default class AppletsFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      feeds: [],
      refreshing: false,
    };
  }

  componentWillMount() {
    getFeeds().then((feeds) => { // Set feeds when the come in
      this.setState({feeds: feeds})
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    getFeeds().then((feeds) => {
      this.setState({
        refreshing: false,
        feeds: feeds,
      });
    });
  }

  render() {
    if (this.state.feeds.length != 0) {
      return (
        <ScrollView
          contentInset={{bottom: 20}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          {this.state.feeds.map((feed) => (
            <AppletPreview key={feed.id} feed={feed} />
          ))}
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    }
  }
}

let styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
