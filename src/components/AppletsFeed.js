import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import AppletPreview from './AppletPreview';

export default class AppletsFeed extends Component {

  render() {
    return (
      <ScrollView>
        {this.props.feeds.map((feed) => (
          <AppletPreview key={feed.id} data={feed} />
        ))}
      </ScrollView>
    );
  }
}

//
// <List>
//   {this.props.feeds.map((feed) => (
//     <ListItem
//       key={feed.id}
//       title={feed.title}
//       subtitle={feed.lastActive}
//       hideChevron
//     />
//   ))}
// </List>
