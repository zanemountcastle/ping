import React, { Component } from 'react';
import { StyleSheet, Text, View ,  ScrollView, Alert} from 'react-native';
import { Header } from 'react-native-elements';


//import { ExpoLinksView } from '@expo/samples';
import { List, ListItem, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import {
  Notifications,
} from 'expo';

import registerForPushNotificationsAsync from '../../api/registerForPushNotificationsAsync';
export default class Discover extends Component {

    state = {
      notification: {},
    };

    componentWillMount() {
      registerForPushNotificationsAsync();

      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
      this.setState({notification: notification});
    };

    render() {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Origin: {this.state.notification.origin}</Text>
          <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
        </View>
      );
    }
  }
/*
  render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Discover', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
            outerContainerStyles={{ backgroundColor: '#fff' }}
          />
          <View style={styles.body}>
            <Text>Discover page!</Text>
          </View>
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
});
*/
