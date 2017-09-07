/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from 'react-native';

import FBSDK, {
    LoginButton,
    AccessToken,
    LoginManager,
  }  from 'react-native-fbsdk'; 

import { Actions } from 'react-native-router-flux'

import firebase, {
  firebaseAuth,
  firebaseDatabase,
} from './firebase';

import Icon from 'react-native-vector-icons/FontAwesome';
//import Icon from 'react-native-vector-icons/Ionicons';

const { FacebookAuthProvider} =  firebase.auth

export default class LoginView extends Component {

  state ={
    credentials: null
  }

  componentWillMount() {
    this.authenticateUser()
  }

  authenticateUser() {
    //console.log("AccessToken.getCurrentAccessToken");
    AccessToken.getCurrentAccessToken().then((data) => {
      //console.log("data");
      if(!data){
        return
      }
      const { accessToken } = data
      const credential = FacebookAuthProvider.credential(accessToken)
      firebaseAuth.signInWithCredential(credential).then((credentials) =>{
        //console.log("signInWithCredential");
        Actions.home();
      }, function(error) {
        //console.log("Sign In Error", error);
      });
    }).catch(e => {
      throw(e);
    })
  }

  handleLoginFinished = 
    (error, result) => {
        if (error) {
          //console.error(error)
        } else if (result.isCancelled) {
          alert("login is cancelled.");
        } else {          
            this.authenticateUser()
        }        
      }

  render() {
    return (
    <Image source={require('./background.jpg')} style={styles.container}>
      
      <Image source={require('./logo.png')} style={styles.logo} />

      <Text style={styles.welcome}> 
          Bienvenidos a FsvMusic
      </Text>
      <LoginButton
        readPermissions={['public_profile', 'email']}
        onLoginFinished={this.handleLoginFinished}
        onLogoutFinished={() => alert("logout.")}
      />
    </Image>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
  },
  welcome:{
      backgroundColor: 'transparent',
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 40,
      marginTop: 110,
      color: 'white',

  },
  logo:{
    width: 140,
    height: 140,
    marginBottom: 30,
  }
});