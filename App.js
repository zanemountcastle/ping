import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './src/lib/Router';
import RootNavigation from './src/containers/RootNavigation';
import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import Store from './src/lib/Store';


firebase.initializeApp({
  apiKey: "AIzaSyBZGYJUNo7DuYgSUhCZ3S58zM0gO7fcYrY",
  authDomain: "ping-fdb36.firebaseapp.com",
  databaseURL: "https://ping-fdb36.firebaseio.com",
  projectId: "ping-fdb36",
  storageBucket: "ping-fdb36.appspot.com",
  messagingSenderId: "944163924283"
});

export default class Ping extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <RootNavigation />
      </Provider>
    );
  }

}
