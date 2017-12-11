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

import AppletPreview from './AppletPreview';

export default class AppletsFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    }
  }

  // Called when new data comes in
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFetching) {
      // Remove pull-to-refresh loading animation
      this.setState({ isRefreshing: false });
    }
  }

  // Called on pull-to-refresh action
  _onRefresh() {
    this.setState({ isRefreshing: true });
    this.props.fetchApplets();
  }

  render() {
    if (!this.props.isFetching || this.state.isRefreshing ) {
      return (
        <ScrollView
          contentInset={{bottom: 20}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          {Object.entries(this.props.feed).map(
            ([key, value]) => <AppletPreview key={key} applet={value} appletID={key}/>
          )}
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

//              ([key, value]) => <AppletPreview key={key} applet={value} />

//
// {this.props.feed.map((applet, id) => (
//   <AppletPreview key={id} applet={applet} />
// ))}
