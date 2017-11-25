import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Activity from '../screens/Activity';
import Applets from '../screens/Applets';
import Discover from '../screens/Discover';
import Search from '../screens/Search';

export const Tabs = TabNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({ tintColor }) => <Icon name="remove-red-eye" size={30} color={tintColor}/>
    },
  },
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel: 'Activity',
      tabBarIcon: ({ tintColor }) => <Icon name="subject" size={30} color={tintColor}/>
    },
  },
  MyApplets: {
    screen: Applets,
    navigationOptions: {
      tabBarLabel: 'My Applets',
      tabBarIcon: ({ tintColor }) => <Icon name="notifications-none" size={30} color={tintColor}/>
    },
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={30} color={tintColor}/>
    },
  },
});
