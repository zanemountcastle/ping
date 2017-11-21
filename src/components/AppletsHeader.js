import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

export default class AppletsHeader extends Component {

  render() {
    return (
      <View >
        <Header
          leftComponent={{ icon: 'settings', color: '#4D4C4C' }}
          centerComponent={{ text: 'My Applets', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
          rightComponent={{ icon: 'add', color: '#4D4C4C' }}
          outerContainerStyles={{ backgroundColor: '#fff' }}
        />
      </View>
    );
  }
}
