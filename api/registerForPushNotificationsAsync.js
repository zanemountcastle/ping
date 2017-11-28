import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';


export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  userID = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/' + userID).update({ token: token });

  refreshedToken = FirebaseInstanceId.getInstance().getToken();
  Log.d(TAG, "Refreshed token: " + refreshedToken);

// If you want to send messages to this application instance or
// manage this apps subscriptions on the server side, send the
// Instance ID token to your app server.
  sendRegistrationToServer(refreshedToken);

   // POST the token to our backend so we can use it to send pushes from there
   return fetch(PUSH_ENDPOINT, {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       token: {
         value: token,
       },
       user: {
        username: 'Cristiano',
      },
     }),
   });
});
