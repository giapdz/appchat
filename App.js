
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppStackNavigator from './components/AppStackNavigator'
// import Splash from './components/Splash'
// import LoginScreen from './components/LoginScreen'

export default function App() {
  return (
    <AppStackNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
