import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, ListView, Platform  } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
// 
// import { AppletsFeed } from '../components';
// import { AppletsFeed } from '../components';
//
// import FetchAppletData from '../actions/FetchAppletData';


export default class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      applets: [],
    };
  }



  render() {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Search', style: { color: '#4D4C4C', fontSize: 20, fontWeight: '700' } }}
            outerContainerStyles={{ backgroundColor: '#fff' }}
          />
          <View style={styles.body}>

          </View>
        </View>
      );
    }
}

// <SearchBar
//   lightTheme
//   round
//   containerStyle={styles.searchBox}
//   onChangeText={(text) => this.setState({searchText: text})}
//   placeholder='Type Here...' />
//   <AppletsFeed
//     feed={this.state.applets}
//     fetchApplets={this.props.FetchAppletData}
//     isFetching={this.props.applets.isFetching}
//   />

//
// function mapStateToProps(state) {
//   return {
//     applets: state.applets
//   }
// };
//
// export default connect(mapStateToProps, { FetchAppletData })(Applets);


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
