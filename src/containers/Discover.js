import React, { Component } from 'react';
import { StyleSheet, Text, View ,  ScrollView, Alert} from 'react-native';
import { Header } from 'react-native-elements';

import { connect } from 'react-redux';

import FetchDiscoveryData from '../actions/FetchDiscoveryData';

import { AppletsFeed, AppletPreview } from '../components';

export class Discover extends Component {
  componentWillMount() {
    this.props.FetchDiscoveryData();
  }

  render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Discover', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
            outerContainerStyles={{ backgroundColor: '#fff' }}
          />
          <AppletsFeed
            feed={this.props.discovery.data}
            fetchApplets={this.props.FetchDiscoveryData}
            isFetching={this.props.discovery.isFetching}
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
  },
});

function mapStateToProps(state) {
  return {
    discovery: state.discovery
  }
};

export default connect(mapStateToProps, { FetchDiscoveryData })(Discover);
