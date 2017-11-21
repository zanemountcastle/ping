import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Discover from '../screens/Discover';
import Applets from '../screens/Applets';
import Search from '../screens/Search';

export const Tabs = TabNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({ tintColor }) => <Icon name="remove-red-eye" size={30} color={tintColor}/>
    },
  },
  MyApplets: {
    screen: Applets,
    navigationOptions: {
      tabBarLabel: 'My Applets',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={30} color={tintColor}/>
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
