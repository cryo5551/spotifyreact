import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBIwMR7whs21fpl4is3DBbz-0e2cktqI0U",
    authDomain: "react-spotify-716d2.firebaseapp.com",
    projectId: "react-spotify-716d2",
    storageBucket: "react-spotify-716d2.appspot.com",
    messagingSenderId: "644074575167",
    appId: "1:644074575167:web:1eb129a039288cf637af8a",
    measurementId: "G-K7WP7C7TJY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db , auth};
