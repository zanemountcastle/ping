import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import AppletPreview from './AppletPreview';

export default class AppletsFeed extends Component {

  render() {
    if (this.props.feeds.length != 0) {
      return (
        <ScrollView style={styles.container}>
          {this.props.feeds.map((feed) => (
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
  container: {
    // marginBottom: 70,
    // paddingBottom: 50,
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
