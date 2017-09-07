import * as firebase from "firebase"; 

const config = {
    apiKey: "AIzaSyBGjaat1rUUWuhjE_5LeRsvYqlJN8aJDgk",
    authDomain: "fsvmusic-69c5c.firebaseapp.com",
    databaseURL: "https://fsvmusic-69c5c.firebaseio.com",
    projectId: "fsvmusic-69c5c",
    storageBucket: "fsvmusic-69c5c.appspot.com",
    messagingSenderId: "315561234887"
  };

firebase.initializeApp(config);
export const firebaseAuth = firebase.auth()
export const firebaseDatabase = firebase.database()
export default firebase