import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './src/config/router';
import { AppLoading } from 'expo';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineRuduxers, compose } from 'redux';
import thunkMiddlware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './src/reducers';

const loggerMiddleWare = createLogger({ predicate: (getState, action) => __DEV__});

function configureStore(intitialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddlware,
      loggerMiddleWare,
    ),
  );
  return createStore(reducer, intitialState, enhancer);
};

const store = configureStore({});

class Ping extends React.Component {
  render() {
    return (
      <Tabs />
    );
  }
}

const App = () => (
  <Provider store={store}>
    <Ping />
  </Provider>
);

AppRegistry.registerComponent('Ping', () => App);
