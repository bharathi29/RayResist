import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUD4tK9z8JJnQzmDWTOlTpTTMzUfItr60",
  authDomain: "rayresist-c67ab.firebaseapp.com",
  projectId: "rayresist-c67ab",
  storageBucket: "rayresist-c67ab.appspot.com",
  messagingSenderId: "406641571667",
  appId: "1:406641571667:web:7d6d1fd1610986b1eb93a6",
  measurementId: "G-X0P96JHFB9"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export {firebase};