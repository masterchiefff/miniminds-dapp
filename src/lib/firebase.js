import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPX4LaukQ7OLedjFchl4LQkNOAijavlm4",
  authDomain: "miniminds-a8f84.firebaseapp.com",
  projectId: "miniminds-a8f84",
  storageBucket: "miniminds-a8f84.appspot.com",
  messagingSenderId: "555196454196",
  appId: "1:555196454196:web:59dd2639e85d85486b0161",
  measurementId: "G-2TWQN888EX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, db };
