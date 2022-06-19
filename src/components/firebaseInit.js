import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import firebaseConfig from './firebaseConfig';
import { initializeApp } from "firebase/compat/app";
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
