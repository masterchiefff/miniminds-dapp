
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDRpCBJ0QxarQTxxat4misSZwjMbJhe6sE",
  authDomain: "miniminds-27f4d.firebaseapp.com",
  projectId: "miniminds-27f4d",
  storageBucket: "miniminds-27f4d.appspot.com",
  messagingSenderId: "3085120495",
  appId: "1:3085120495:web:cacf8f657086300bdebc1a"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);



// Export the app and db for use in other parts of your application
export { app, db };


