// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUD4tK9z8JJnQzmDWTOlTpTTMzUfItr60",
  authDomain: "rayresist-c67ab.firebaseapp.com",
  projectId: "rayresist-c67ab",
  storageBucket: "rayresist-c67ab.appspot.com",
  messagingSenderId: "406641571667",
  appId: "1:406641571667:web:7d6d1fd1610986b1eb93a6",
  measurementId: "G-X0P96JHFB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase};