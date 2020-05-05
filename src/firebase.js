import firebase from '@firebase/app';

import "@firebase/auth";
import "@firebase/database";
import "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB0iVUTU-6-jFedDL3ff1IK4LULxZkd-5Y",
    authDomain: "react-chat-app-15e04.firebaseapp.com",
    databaseURL: "https://react-chat-app-15e04.firebaseio.com",
    projectId: "react-chat-app-15e04",
    storageBucket: "react-chat-app-15e04.appspot.com",
    messagingSenderId: "503382153608",
    appId: "1:503382153608:web:c08fa97293dd9d1e5bc23d"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;