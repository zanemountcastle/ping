import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import AppletsFeed from '../components/AppletsFeed';
import AppletsHeader from '../components/AppletsHeader';

import { feeds } from '../../static/data';

export default class Applets extends Component {

  render() {
    return (
      <View >
        <AppletsHeader />
        <AppletsFeed feeds={feeds} />
      </View>
    );
  }
}
