import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

export default class AppletPreview extends Component {

  render() {
    return (
      <Card title={this.props.data.title} >
        <Text>Ping me when</Text>
        <Text>{this.props.data.organization}</Text>
      </Card>
    );
  }
}
