// src/lib/firebase/auth.js
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
  return await signOut(auth);
};

export { login, logout };