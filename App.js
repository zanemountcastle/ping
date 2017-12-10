import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Tabs} from './src/lib/Router';
import RootNavigation from './src/containers/RootNavigation';
import * as firebase from 'firebase';

import { Provider } from 'react-redux';
import Store from './src/lib/Store';

import PushNotificationController from './src/lib/PushNotificationController';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
  console.log("in FCMEvent")
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if (notif.local_notification) {
    //this is a local notification
  }
  if (notif.opened_from_tray) {
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }
  // await someAsyncCall();

  if (Platform.OS === 'ios') {
    //optional
    //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
    //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
    //notif._notificationType is available for iOS platfrom
    switch (notif._notificationType) {
      case NotificationType.Remote:
        notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
        break;
      case NotificationType.NotificationResponse:
        notif.finish();
        break;
      case NotificationType.WillPresent:
        notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
        break;
    }
  }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
  console.log(token)
  // fcm token may not be available on first load, catch it here
});

firebase.initializeApp({
  apiKey: "AIzaSyBZGYJUNo7DuYgSUhCZ3S58zM0gO7fcYrY",
  authDomain: "ping-fdb36.firebaseapp.com",
  databaseURL: "https://ping-fdb36.firebaseio.com",
  projectId: "ping-fdb36",
  storageBucket: "ping-fdb36.appspot.com",
  messagingSenderId: "944163924283"
});

export default class Ping extends React.Component {

  componentDidMount() {
    // iOS: show permission prompt for the first call. later just check permission in user settings
    // Android: check permission in user settings
    FCM.requestPermissions().then(() => {
        // Do Something
    }).catch(() => console.log('notification permission rejected'));

    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then(notif => {
      // Do something
    });

  }

  componentWillUnmount() {
    // stop listening for events
    this.notificationListener.remove();
  }

  render() {
    return (
      <Provider store={Store}>
        <RootNavigation/>
      </Provider>
    );
  }

}
