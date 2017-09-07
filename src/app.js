/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
//Imports
import {Scene, Router} from 'react-native-router-flux';
import HomeView from './HomeView'
import LoginView from './LoginView'
import ArtistDetailView from './ArtistDetailView'

class FsvMusic extends React.Component{
  constructor() {
    super();
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
    }
  render(){
    //const isAndroid = Platform.OS === 'android'
        
    return<Router>
      <Scene key="root">      
        <Scene key="login" component={LoginView} animation='fade' hideNavBar/>      
        <Scene key="home" component={HomeView} animation='fade' hideNavBar/>
        <Scene key="artistDetail" component={ArtistDetailView} animation='fade' hideNavBar={false} title='Comments' />
      </Scene>
    </Router>

  }
}

AppRegistry.registerComponent('FsvMusic', () => FsvMusic);
