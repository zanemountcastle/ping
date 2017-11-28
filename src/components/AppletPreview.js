import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

  render() {
    return (
      <View style={this.bodyStyle()}>
        <View style={styles.body}>
          <Text style={styles.pingMeWhen}>Ping me when</Text>
          <View style={styles.divider} />
          <Text style={styles.titleText}>{this.props.applet.title}</Text>
          <Text style={styles.byLine}>by {this.props.applet.organization}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.status}>{this.props.applet.status}</Text>
          <Text style={styles.lastActive}>{this.props.applet.lastActive}</Text>
        </View>
      </View>
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
  titleText: {
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
