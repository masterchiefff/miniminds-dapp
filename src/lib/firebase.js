import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDo7PIPX4JKgR-2NOIo7yuz6ldn8mPXi-I",
  authDomain: "miniminds-af64e.firebaseapp.com",
  projectId: "miniminds-af64e",
  storageBucket: "miniminds-af64e.appspot.com",
  messagingSenderId: "120287298408",
  appId: "1:120287298408:web:a254f08d3ac4efa8a40cdd",
  measurementId: "G-LYJ7MDVEL1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, db };