// import { Permissions, Notifications } from 'expo';
import * as firebase from 'firebase';

const PUSH_ENDPOINT = 'https://ping-fdb36.firebaseio.com/users/';


export async function registerForPushNotificationsAsync() {
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



   // POST the token to our backend so we can use it to send pushes from there
   // This code is not doing much (nothing)for us now
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
     }),
   });
};
