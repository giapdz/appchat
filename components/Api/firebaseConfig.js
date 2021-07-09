
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBdMczlDG1ME1Iw9sBrrtvj0IUn9xbNGi8",
    authDomain: "app-chat-a35c2.firebaseapp.com",
    databaseURL: "https://app-chat-a35c2.asia-southeast2.firebasedatabase.app",
    storageBucket: "app-chat-a35c2.appspot.com",
    projectId: 'app-chat-a35c2',
   messagingSenderId: '253659412928',
   appId: '1:253659412928:web:1f64e5ddede0a5dd997025',
   measurementId: 'G-measurement-id',
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });
}
export { firebase };