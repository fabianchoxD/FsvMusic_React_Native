/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import ArtistList from './ArtistList';
import { getArtists } from './api-client';

export default class HomeView extends Component {

  state = {
    artists: null,
  }

  componentDidMount() {
    getArtists()
      .then((data => this.setState({ artists: data })))

    BackHandler.addEventListener('hardwareBackPress', function () {
      var flag = false;
      if (Actions.currentScene == 'home') {
        Alert.alert(
          "Confirmation",
          "Are you sure you want to Exit?",
          [
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
            { text: 'No', onPress: () => Actions.home() }
          ]
        );
      }
      else {
        flag = true;
      }
    }.bind(this));

  }

  render() {

    const artists = this.state.artists

    return (
      <View style={styles.container}>
        {!artists && <ActivityIndicator size="large" />}
        {artists && <ArtistList artists={artists} />}
      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    //paddingTop: (Platform.OS === 'android') ? 10 : 50,
    paddingTop: Platform.select({
      ios: 30,
      android: 0,
    }),
    backgroundColor: 'lightgray',
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
});