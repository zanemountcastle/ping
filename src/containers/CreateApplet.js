import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Header, FormLabel, FormInput } from 'react-native-elements';
import uuid from 'uuid';

import { randomColor } from '../lib/Utilities';

// Redux
import { connect } from 'react-redux';
import { CreateAnApplet } from '../actions';

export class CreateApplet extends Component {
  constructor(props) {
    super(props);
    this.state = {
        appletId: '',
        color: randomColor(),
        message: '',
        organization: 'NYUAD',
        authKey: uuid.v4(),
    };
  }

  _onFormSubmission() {
      const s = this.state;
      this.props.CreateAnApplet(
        s.appletId, s.message, s.color, s.organization, s.authKey);
  }

  _renderPOSTUrl() {
    if ( this.props.create.successful ) {
      return Alert.alert(
        "POST URL for feed",
        `ping.zanemountcastle.com/${this.state.appletId}/${this.state.authKey}`
      )
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Create an Applet', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
            outerContainerStyles={{ backgroundColor: '#fff' }}
          />
          <FormLabel>Message</FormLabel>
          <FormInput onChangeText={( m) => {this.setState({message: m}) }}/>

          <FormLabel>Organization</FormLabel>
          <FormInput
            defaultValue={this.state.organization}
            onChangeText={(o) => {this.setState({organization: o}) }}
          />

          <FormLabel>Applet ID</FormLabel>
          <FormInput onChangeText={(a) => {this.setState({appletId: a}) }}/>

          <FormLabel>Color</FormLabel>
          <FormInput
            defaultValue={this.state.color}
            onChangeText={(c) => {this.setState({color: c}) }}
          />

          <Button
            onPress={() => {this._onFormSubmission()}}
            title='Create applet'
            buttonStyle={styles.button}
            color={'#FFF'}
            loading={this.props.create.isFetching}
            disabled={this.props.create.isFetching}
          />

          {this._renderPOSTUrl()}

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
  body: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#FF7C7C',
    marginTop: 40,
    marginBottom: 5,
    alignSelf: 'center',
    width: 250,
    borderRadius: 5,
  },
  url: {
    margin: 20,
  }
});

function mapStateToProps(state) {
  return {
    create: state.create
  }
};

export default connect(mapStateToProps, { CreateAnApplet })(CreateApplet);
