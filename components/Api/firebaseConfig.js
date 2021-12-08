import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBy0pcwK5wIlDKON7-Kq_llIUc2anYruvc",
    authDomain: "wemarket-a8540.firebaseapp.com",
    databaseURL:
        "https://wemarket-a8540-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wemarket-a8540",
    storageBucket: "wemarket-a8540.appspot.com",
    messagingSenderId: "670210428924",
    appId: "1:670210428924:web:505e786bfa91db254cec79",
    measurementId: "G-9XN3R9WJDN",
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
}
const storage = firebase.storage();
export { firebase, storage };
