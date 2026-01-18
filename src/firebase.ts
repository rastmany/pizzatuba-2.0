import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBu8-U5X_pQ7CiCA7BEEyoM9vDfDCaAvnM",
  authDomain: "pizzatuba-website.firebaseapp.com",
  projectId: "pizzatuba-website",
  storageBucket: "pizzatuba-website.firebasestorage.app",
  messagingSenderId: "1001804253352",
  appId: "1:1001804253352:web:580941a3cc575d8ff31a9d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app, 'europe-west1');

export default app;
