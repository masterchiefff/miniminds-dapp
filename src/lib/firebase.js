// src/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyBPX4LaukQ7OLedjFchl4LQkNOAijavlm4",
  authDomain: "miniminds-a8f84.firebaseapp.com",
  projectId: "miniminds-a8f84",
  storageBucket: "miniminds-a8f84.appspot.com",
  messagingSenderId: "555196454196",
  appId: "1:555196454196:web:59dd2639e85d85486b0161",
  measurementId: "G-2TWQN888EX"
=======
  apiKey: "AIzaSyDRpCBJ0QxarQTxxat4misSZwjMbJhe6sE",
  authDomain: "miniminds-27f4d.firebaseapp.com",
  projectId: "miniminds-27f4d",
  storageBucket: "miniminds-27f4d.appspot.com",
  messagingSenderId: "3085120495",
  appId: "1:3085120495:web:cacf8f657086300bdebc1a"
>>>>>>> saisa
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

<<<<<<< HEAD
export { analytics, db };
=======
// Export the initialized app and Firestore instance
export { app, db };


>>>>>>> saisa
