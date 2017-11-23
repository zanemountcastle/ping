import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import AppletPreview from './AppletPreview';

export default class AppletsFeed extends Component {

  render(callback) {

      // console.log('Ready....go!');
      setTimeout(() => {
        // console.log('Times up -- stop!');
        callback;// && callback();
      }, 1000);

    return (
      <ScrollView style={styles.container}>
        {this.props.feeds.map((feed) => (
          <AppletPreview key={feed.id} feed={feed} />
        ))}
      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    // marginBottom: 70,
    // paddingBottom: 50,
  },
});
