import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import { AppletsFeed } from '../components';

import FetchAppletData from '../actions/FetchAppletData';

class Applets extends Component {

  // Request data when component first mounts
  componentWillMount() {
    this.props.FetchAppletData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'My Applets', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
          outerContainerStyles={{ backgroundColor: '#fff' }}
        />
        <AppletsFeed
          feed={this.props.applets.data}
          fetchApplets={this.props.FetchAppletData}
          isFetching={this.props.applets.isFetching}
        />
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

function mapStateToProps(state) {
  return {
    applets: state.applets
  }
};

export default connect(mapStateToProps, { FetchAppletData })(Applets);
