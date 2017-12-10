import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  StyleSheet,
  View} from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';
import FCM from 'react-native-fcm';
import {Button, FormLabel, FormInput} from 'react-native-elements'

export default class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "a@b.com",
      password: "12345678",
      error: null,
      loading: false
    };
    {
      console.ignoredYellowBox = ['Setting a timer']
    }
  }

  _onLoginPress() {
    this.setState({error: '', loading: true});

    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.setState({error: '', loading: false});
      FCM.getFCMToken().then(token => {
        userID = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userID).update({token: token });
      });
      this.props.navigation.navigate('Main');

    }).catch(() => {
      this.setState({error: 'Authentication failed', loading: false});
    });
  }

  _onSignUpPress() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../static/assets/logo.png')}
        />
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
          onPress={this._onLoginPress.bind(this)}
          title='log in'
          buttonStyle={styles.login}
          color={'#000'}
          loading={this.state.loading}
          disabled={this.state.loading}
        />

        <Button
          onPress={this._onSignUpPress.bind(this)}
          title="sign up"
          color="#FFF"
          buttonStyle={styles.signup}
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
  login: {
    backgroundColor: '#FFF',
    marginTop: 40,
    marginBottom: 5,
    alignSelf: 'center',
    width: 250,
    borderRadius: 5,
  },
  signup: {
    backgroundColor: 'transparent',
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
