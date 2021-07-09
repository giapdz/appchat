// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as AppAuth from "expo-app-auth";
import * as Google from "expo-google-app-auth";
import { firebase } from './firebaseConfig';
const config = {
      iosClientId: "898857693745-596fb9q5n1oisutgk4lmsu7etvlquch0.apps.googleusercontent.com",
      androidClientId: "898857693745-9fai5d8ogsratt41o1qbd8jd5u8rn513.apps.googleusercontent.com",
      copes: ["profile", "email"]
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
      
      // let authState = await AppAuth.authAsync(config);
      // await cacheAuthAsync(authState);
      // console.log('signInAsync', authState);
      // return authState;
  },
  
};
export default GGAPI;