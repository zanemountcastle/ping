import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

class Feed extends Component {

  render() {
    return (
      <ScrollView>
        <List>
          {this.props.feeds.map((feed) => (
            <ListItem
              key={feed.id}
              title={feed.title}
              subtitle={feed.lastActive}
              hideChevron
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default Feed;
