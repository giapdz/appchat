import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {
  COLOR_PINK, COLOR_PINK_LIGHT, 
  COLOR_FACEBOOK, COLOR_PINK_MEDIUM} 
from './myColors'

//Login Facebook

import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';
console.disableLogBox = true;
 // Set the configuration for your app
  // TODO: Replace with your project's config object
  var Config = {
    apiKey: "AIzaSyBdMczlDG1ME1Iw9sBrrtvj0IUn9xbNGi8",
    authDomain: "app-chat-a35c2.firebaseapp.com",
    databaseURL: "https://app-chat-a35c2.asia-southeast2.firebasedatabase.app",
    storageBucket: "app-chat-a35c2.appspot.com",
    projectId: 'app-chat-a35c2',
   messagingSenderId: '253659412928',
   appId: '1:253659412928:web:1f64e5ddede0a5dd997025',
   measurementId: 'G-measurement-id',
  };
  firebase.initializeApp(Config);

  // Get a reference to the database service
  var database = firebase.database();

const LoginScreen = () => {
   
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [typedEmail, setTypedEmail] = useState("")
    const [typedPassword, setTypedPassword] = useState("")

    useEffect(()=> {
          firebase.auth().onAuthStateChanged(changedUser => {
            // console.log(`changed User : ${JSON.stringify(changedUser.toJSON())}`);
            setUser(changedUser) 
            setIsAuthenticated(true)
        });
    }, [])
   
  
    var onRegister = () => {
      firebase.auth()
        .createUserWithEmailAndPassword(typedEmail, typedPassword)
        .then((loggedInUser) => {
            setUser(loggedInUser)
            console.log(`Register with user : `+ typedEmail);
        }).catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
    }
    var onLogin = () => {
        firebase.auth()
            .signInWithEmailAndPassword(typedEmail, typedPassword)
            .then((loggedInUser) => {
                console.log(`Login success`);
            }).catch((error) => {
                console.log(`Login fail with error: ${error}`);
            });
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log('We are authenticated now!');
      }
    
      // Do other things
    });
     const onLoginFacebook=async() =>{
      try {
        await Facebook.initializeAsync({appId:'1455376728134432'});
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          // 
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInWithCredential(credential); // Sign in with Facebook credential
        console.log(facebookProfileData);
           
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    };
  
    const Divider = (props) => {
        return <View {...props}>
          <View style={styles.line}></View>
          <Text style={styles.textOR}>OR</Text>
          <View style={styles.line}></View>
        </View>
    }
    
    return (
      //Do not dismiss Keyboard when click outside of TextInput
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.up}>
            <Ionicons
              name="ios-speedometer"
              size={100}
              color={COLOR_PINK}>
            </Ionicons>
            <Text style={styles.title}>
              App chat for everyone
          </Text>
          </View>
          <View style={styles.down}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType='emailAddress'
                keyboardType='email-address'
                placeholder="Enter your email"
                autoCapitalize='none'
                onChangeText={
                    (text) => {
                        setTypedEmail(text);
                    }
                }
              >
              </TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                secureTextEntry={true}
                    onChangeText={
                        (text) => {
                            setTypedPassword(text);
                        }
                    }
              >
              </TextInput>
            </View>
            <TouchableOpacity style={styles.loginButton}
              onPress={onLogin}>
              <Text style={styles.loginButtonTitle}>LOG IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupButton}
              onPress={onRegister}>
              <Text style={styles.loginButtonTitle}>SIGN UP</Text>
            </TouchableOpacity>
            <Divider style={styles.divider}></Divider>
            <FontAwesome.Button
              style={styles.facebookButton}
              name="facebook"
              onPress={onLoginFacebook}
              backgroundColor={COLOR_FACEBOOK}
            >
              <Text style={styles.loginButtonTitle}>Continue with Facebook</Text>
            </FontAwesome.Button>
          
          </View>
        </View>
      </TouchableWithoutFeedback>

    )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',  
    backgroundColor: COLOR_PINK_LIGHT
  },
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  down: {
    flex: 7,//70% of column
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    color: COLOR_PINK_MEDIUM,
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)'//a = alpha = opacity
  },
  textInput: {
    width: 280,
    height: 45
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: COLOR_PINK
  },
  signupButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkseagreen'
  },
  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  facebookButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
  },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
    flex: 1,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  }
})