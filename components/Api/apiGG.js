// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppAuth from "expo-app-auth";
import * as Google from "expo-google-app-auth";
// import * as GoogleSignIn from 'expo-google-sign-in';
import { firebase } from './firebaseConfig';
// const { URLSchemes } = AppAuth;
const config = {
      // iosClientId: "898857693745-596fb9q5n1oisutgk4lmsu7etvlquch0.apps.googleusercontent.com",
      // androidClientId: "898857693745-9fai5d8ogsratt41o1qbd8jd5u8rn513.apps.googleusercontent.com",
      // copes: ["profile", "email"]
      // clientId: "898857693745-596fb9q5n1oisutgk4lmsu7etvlquch0.apps.googleusercontent.com",
        // behavior:"web",
        scopes: ['openid', 'profile'],
        // expoClientId: "253659412928-46du4v6k44hd8olo71fuchchspgef8vh.apps.googleusercontent.com",
        // androidClientId: "253659412928-0tlugat44vtl5n4v8jbht356b2lqenmq.apps.googleusercontent.com",
        androidStandaloneAppClientId: "253659412928-0tlugat44vtl5n4v8jbht356b2lqenmq.apps.googleusercontent.com"
}

const GGAPI = {
    
  async signInAsync() {
    
      const {idToken, accessToken,type } = await Google.logInAsync(config);

      if (type === "success") {
      //     let currentUser = user;

      //     currentUser.accessToken = accessToken;
      //     await this.cacheAuthAsync(currentUser);
      //     return currentUser;
      // }
       const credential = firebase.auth.GoogleAuthProvider.credential(idToken,accessToken);
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(res => {
              // alert(`Login google success!`)
            //   let user = firebase.auth().currentUser;
            //   let newUser = {
            //     id: user.uid,
            //     name: user.displayName,
            //     avatar: user.photoURL,
            //     email: user.email
            //   };
            // Api.addUser(newUser);
            })
            .catch(error => {
              console.log("firebase cred err:", error);
            });
        } else {
          return { cancelled: true };
        }
      
      
  }
  
//  async initAsync  ()  {
//     await GoogleSignIn.initAsync(config);
//   },

  // async signInAsync() {
  //   // try {
  //   //   await GoogleSignIn.initAsync();
  //   // } catch ({ message }) {
  //   //   console.log("GoogleSignIn.initAsync(): " + message);
  //   // }

  //   try {
     
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     const { type, user } = await GoogleSignIn.initAsync({
  //       clientId: '253659412928-88dt3v8h323amcg5dte302pbljd355g9.apps.googleusercontent.com'
  //     });
  //     if (type === 'success') {
  //       // let currentUser = user;

  //     //     currentUser.accessToken = accessToken;
  //     //     await this.cacheAuthAsync(currentUser);
  //     //     return currentUser;
  //     // }
  //     this.onSignIn(result);
  //      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
  //         firebase
  //           .auth()
  //           .signInWithCredential(credential)
  //           .then(res => {
  //             // alert(`Login google success!`)
  //           //   let user = firebase.auth().currentUser;
  //           //   let newUser = {
  //           //     id: user.uid,
  //           //     name: user.displayName,
  //           //     avatar: user.photoURL,
  //           //     email: user.email
  //           //   };
  //           // Api.addUser(newUser);
  //           })
  //           .catch(error => {
  //             console.log("firebase cred err:", error);
  //           });
  //       } else {
  //         return { cancelled: true };
  //       }
  //   } catch ({ message }) {
  //     console.log('login: Error:' + message);
  //   }
  // },
  
}
export default GGAPI;