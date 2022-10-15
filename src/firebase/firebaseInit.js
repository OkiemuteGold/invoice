import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from "../../firebaseConfig.txt";

var firebaseConfig = {
  apiKey: config[0].apiKey,
  authDomain: config[0].authDomain,
  projectId: config[0].projectId,
  storageBucket: config[0].storageBucket,
  messagingSenderId: config[0].messagingSenderId,
  appId: config[0].appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
