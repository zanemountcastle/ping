import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import FetchCoinData from './../actions/FetchCoinData';
import AppletPreview from './AppletPreview';

class CryptoContainer extends Component {

    componentWillMount() {
        this.props.FetchCoinData();
    }

    renderApplets() {
        const { crypto } = this.props;
        return crypto.data.map((feed) =>
            <AppletPreview key={feed.id} feed={feed} />
        )
    }


    render() {

        const { crypto } = this.props;
        const { contentContainer } = styles;

        if (crypto.isFetching) {
            return (
                <View>
                    <Text>Loading</Text>
                </View>
            )
        }



        return (
            <ScrollView contentContainerStyle={contentContainer}>
                {this.renderApplets()}
            </ScrollView>
        )


    }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 55
    }
}

function mapStateToProps(state) {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)
