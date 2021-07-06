import React, {Component} from 'react';
import * as firebase from 'firebase'
import firebaseConfig from './components/Api/firebaseConfig';
import {NavigationContainer} from '@react-navigation/native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducer from './redux/reducer'
import thunk from 'redux-thunk'
import Api from './components/Api/Api'
import Authorized from './components/Navigation/Authorized';
import Unauthorized from './components/Navigation/Unauthorized';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

const store = createStore(Reducer, applyMiddleware(thunk))
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
export class App extends Component {
  constructor() {
    super()
    this.unsubscriber = null;
    this.state = {
      loggedIn: false,
      user: null,
      chaList: []
    }
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((u) => {
      if (!u) {
        this.setState({
          loggedIn: false,
          user: null,
        })
        
      } else {
        let newUser = {
          id: u.uid,
          name: u.displayName,
          avatar: u.photoURL,
          email: u.email
        };
        Api.addUser(newUser);
        this.setState({ loggedIn: true })
        this.setState({ user: newUser });
      }
    })
  }
  componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }
  render() {
    
    if (!this.state.loggedIn) {
      return (
        <NavigationContainer>
        <Unauthorized/>
        </NavigationContainer>
      )
    }
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Authorized/>
          </NavigationContainer>
       </Provider>
      );
    
    }

}

export default App

