// src/lib/firebase/firestore.js
import { firestore } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const addUserData = async (data) => {
  const usersCollection = collection(firestore, 'users');
  await addDoc(usersCollection, data);
};

export { addUserData };
