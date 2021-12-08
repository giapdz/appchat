// import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
// import * as GoogleSignIn from 'expo-google-sign-in';
import { firebase } from "./firebaseConfig";
// const { URLSchemes } = AppAuth;
GoogleSignin.configure({
    scopes: [
        "https://wemarket-a8540-default-rtdb.asia-southeast1.firebasedatabase.app",
    ], // [Android] what API you want to access on behalf of the user, default is email and profile
    webClientId:
        "670210428924-isp5fvffbuf11ltrc80v7an9ran5pvic.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: "wemarket-a8540.firebaseapp.com", // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: "wemarket.vn", // [Android] specifies an account name on the device that should be used
});

const GGAPI = {
    //     async signInAsync() {
    //         const { idToken, accessToken, type } = await Google.logInAsync(config);

    //         if (type === "success") {
    //             //     let currentUser = user;

    //             //     currentUser.accessToken = accessToken;
    //             //     await this.cacheAuthAsync(currentUser);
    //             //     return currentUser;
    //             // }
    //             const credential = firebase.auth.GoogleAuthProvider.credential(
    //                 idToken,
    //                 accessToken
    //             );
    //             firebase
    //                 .auth()
    //                 .signInWithCredential(credential)
    //                 .then((res) => {
    //                     // alert(`Login google success!`)
    //                     //   let user = firebase.auth().currentUser;
    //                     //   let newUser = {
    //                     //     id: user.uid,
    //                     //     name: user.displayName,
    //                     //     avatar: user.photoURL,
    //                     //     email: user.email
    //                     //   };
    //                     // Api.addUser(newUser);
    //                 })
    //                 .catch((error) => {
    //                     console.log("firebase cred err:", error);
    //                 });
    //         } else {
    //             return { cancelled: true };
    //         }
    //     },

    async signIn() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // this.setState({ userInfo });
            console.log(userInfo);
            const { idToken, serverAuthCode } = userInfo;
            const credential = firebase.auth.GoogleAuthProvider.credential(
                idToken,
                serverAuthCode
            );
            firebase
                .auth()
                .signInWithCredential(credential)
                .then((res) => {
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
                .catch((error) => {
                    console.log("firebase cred err:", error);
                });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    },
};

export default GGAPI;
