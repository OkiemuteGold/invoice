import firebase from "firebase/app";
import "firebase/firestore";
import config from "../firebaseConfig.txt";

var firebaseConfig = {
  apiKey: config[0].key,
  authDomain: config[0].authDomain,
  projectId: config[0].projectId,
  storageBucket: config[0].storageBucket,
  messagingSenderId: config[0].messagingSenderId,
  appId: config[0].appId,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebaseApp, db };
