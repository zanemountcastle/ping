import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FCM from 'react-native-fcm';
import * as firebase from 'firebase';
export default class AppletPreview extends Component {

  // Dynamically sets the background color of the previews
  bodyStyle = () => {
    return {
      backgroundColor: this.props.applet.color,
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 20,
      flexDirection: "column",
      minHeight: 200,
    };
  }

  subscribe = (userID, topic) => {
    console.log("topic ", topic);
    firebase.database()
      .ref(`/users/${userID}/applet_subscriptions`)
      .update({[topic]: true});
    FCM.subscribeToTopic(topic);
  }

  unSubscribe = (userID, topic) => {
    firebase.database()
      .ref(`/users/${userID}/applet_subscriptions`)
      .child(topic).remove();
    FCM.unsubscribeFromTopic(topic);
  }

  onPress = () => {
    const topic = this.props.appletID;
    const userID = firebase.auth().currentUser.uid;
    //Check if user is subscribed
    firebase.database()
      .ref(`/users/${userID}/applet_subscriptions/${topic}`)
      .once('value')
      .then( (snapshot) => {
        if (snapshot.val()){
          this.unSubscribe(userID, topic);
        }
        else {
          this.subscribe(userID, topic);
        }
      });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
      <View style={this.bodyStyle()}>
        <View style={styles.body}>
          <Text style={styles.pingMeWhen}>Ping me when</Text>
          <View style={styles.divider} />
          <Text style={styles.messageText}>{this.props.applet.message}</Text>
          <Text style={styles.byLine}>by {this.props.applet.organization}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.status}>On</Text>
          <Text style={styles.lastActive}>last active today</Text>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  body: {
    padding: 20,
    marginBottom: 25,
  },
  pingMeWhen: {
    marginTop: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    marginTop: 7,
    height: 2,
    width: 35,
    backgroundColor: "#FFF"
  },
  messageText: {
    marginTop: 12,
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },
  byLine: {
    marginTop: 7,
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "700",
  },
  footer: {
    height: 30,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.3)', // Black with opacity of 40%
    position: "absolute",
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  status: {
    color: "rgba(255,255,255,0.5)",
    fontWeight: "700",
  },
  lastActive: {
    color: "rgba(255,255,255,0.5)",
    fontWeight: "700",
  },
});
