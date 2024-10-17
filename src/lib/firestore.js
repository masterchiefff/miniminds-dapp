// src/lib/firebase/firestore.js

import { db } from './firebase'; // Import the Firestore instance (db) from firebase.js
import { collection, addDoc } from 'firebase/firestore';

// Function to add user data to the 'users' collection
const addUserData = async (data) => {
  try {
    const usersCollection = collection(db, 'users'); // Reference to 'users' collection
    await addDoc(usersCollection, data); // Add a new document to 'users' collection
    console.log('User data added successfully');
  } catch (error) {
    console.error('Error adding user data:', error);
  }
};

// Export the function so it can be used in other parts of the app
export { addUserData };

