// src/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRpCBJ0QxarQTxxat4misSZwjMbJhe6sE",
  authDomain: "miniminds-27f4d.firebaseapp.com",
  projectId: "miniminds-27f4d",
  storageBucket: "miniminds-27f4d.appspot.com",
  messagingSenderId: "3085120495",
  appId: "1:3085120495:web:cacf8f657086300bdebc1a"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the initialized app and Firestore instance
export { app, db };


