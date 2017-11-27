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
import { connect } from 'react-redux';

import AppletPreview from './AppletPreview';

import FetchAppletData from '../actions/FetchAppletData';

class AppletsFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    }
  }

  // Request data when component first mounts
  componentWillMount() {
    this.props.FetchAppletData();
  }

  // Called when new data comes in
  componentWillReceiveProps(nextProps) {
    if (!nextProps.applets.isFetching) {
      // Remove pull-to-refresh loading animation
      this.setState({ isRefreshing: false });
    }
  }

  // Called on pull-to-refresh action
  _onRefresh() {
    this.setState({ isRefreshing: true });
    this.props.FetchAppletData();
  }

  render() {
    if (!this.props.applets.isFetching || this.state.isRefreshing ) {
      return (
        <ScrollView
          contentInset={{bottom: 20}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
          {this.props.applets.data.map((applet) => (
            <AppletPreview key={applet.id} applet={applet} />
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


function mapStateToProps(state) {
  return {
    applets: state.applets
  }
}

export default connect(mapStateToProps, { FetchAppletData })(AppletsFeed)
