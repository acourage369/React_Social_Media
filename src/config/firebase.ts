// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9SEuymQ3Li2LTc-TbDdnZ-aP5muJL71Q",
  authDomain: "react-media-app-b48ec.firebaseapp.com",
  projectId: "react-media-app-b48ec",
  storageBucket: "react-media-app-b48ec.appspot.com",
  messagingSenderId: "659021695751",
  appId: "1:659021695751:web:8e6a0d57ccb9408d3513a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);