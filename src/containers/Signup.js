import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  StyleSheet,
  View } from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';
import {Button, FormLabel, FormInput} from 'react-native-elements'

import { registerForPushNotificationsAsync } from '../lib/Utilities'

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      error: null,
      loading: false
    };
    {
      console.ignoredYellowBox = ['Setting a timer']
    }
  }

  _onSignUpPress() {
    this.setState({error: '', loading: true});
    const {email, password} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      this.setState({error: '', loading: false});
      registerForPushNotificationsAsync();
      this.props.navigation.navigate('Main');

    }).catch(() => {
      this.setState({error: 'Sign up failed. Please try again.', loading: false});
    })
  }

  _onBackToLoginPress() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signUpText}>Sign up</Text>
        <View style={styles.form}>
          <Text style={styles.formHeader}>email</Text>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            placeholder='john@icloud.com'
            style={styles.textInput}/>

          <Text style={styles.formHeader}>password</Text>
          <TextInput
            value={this.state.password}
            secureTextEntry
            placeholder='••••••••••'
            onChangeText={password => this.setState({password})}
            style={styles.textInput}
          />
          <Text>{this.state.error}</Text>
        </View>

        <Button
          onPress={this._onSignUpPress.bind(this)}
          title='sign up'
          buttonStyle={styles.button}
          color={'#000'}
          loading={this.state.loading}
          disabled={this.state.loading}
        />

        <Button
          onPress={this._onBackToLoginPress.bind(this)}
          title="back to login"
          color="#FFF"
          buttonStyle={styles.backToLoginText}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7C7C',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  signUpText: {
    fontWeight: '800',
    fontSize: 40,
    alignSelf: 'center',
    marginBottom: 40,
    color: "#FFF",
  },
  backToLoginText: {
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#FFF',
    marginTop: 40,
    marginBottom: 5,
    alignSelf: 'center',
    width: 250,
    borderRadius: 5,
  },
  textInput: {
    width: 250,
    height: 120,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    height: 40,
    paddingLeft: 20,
  },
  formHeader: {
    marginTop: 20,
    color: '#FFF',
    fontWeight: '700',
    marginBottom: 2,
  },
  form: {
    alignSelf: 'center',
    width: 250,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  }
});
