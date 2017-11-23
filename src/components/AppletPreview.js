import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AppletPreview extends Component {
  componentWillMount() {
    styles.preview.backgroundColor = this.props.feed.color;
  };

  render() {
    return (
      <View style={styles.preview}>
        <View style={styles.body}>
          <Text style={styles.pingMeWhen}>Ping me when</Text>
          <View style={styles.divider} />
          <Text style={styles.titleText}>{this.props.feed.title}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.status}>{this.props.feed.status}</Text>
          <Text style={styles.lastActive}>{this.props.feed.lastActive}</Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  preview: {
    backgroundColor: "steelblue",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flexDirection: "column",
    minHeight: 190,
  },
  body: {
    padding: 20,
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
  footer: {
    zIndex: 1, // Above rest of preview
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
    color: "#999",
    fontWeight: "700",
  },
  lastActive: {
    color: "#999",
    fontWeight: "700",
  },
});