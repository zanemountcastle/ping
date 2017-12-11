import React, { Component } from 'react';
import {   ActivityIndicator, StyleSheet, Text, View, ScrollView, Alert, ListView, Platform  } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import FetchSearchData from '../actions/FetchSearchData';

import { AppletPreview } from '../components';


export class Search extends Component {

  renderSearchResuls() {
    if (this.props.search.data) {
      return (
        <ScrollView contentInset={{bottom: 20}} >
          {Object.entries(this.props.search.data).map(
            ([key, value]) => <AppletPreview key={key} applet={value} appletID={key} />
          )}
        </ScrollView>
      );
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Search', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
            outerContainerStyles={{ backgroundColor: '#fff' }}
          />
          <SearchBar
             lightTheme
             round
             containerStyle={styles.searchBox}
             onChangeText={(text) => this.setState(this.props.FetchSearchData(text))}
             placeholder='Type Here...'
          />
          {this.renderSearchResuls()}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBox: {
    width: '100%',
    backgroundColor: '#FFF',
    borderBottomColor: '#FFF',
  }
});


function mapStateToProps(state) {
  return {
    search: state.search
  }
};

export default connect(mapStateToProps, { FetchSearchData })(Search);
