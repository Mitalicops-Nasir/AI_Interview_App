// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKyaC9YezREdiTEAemRoFR9BFmBqaFIVs",
  authDomain: "prepinterviewai-220fc.firebaseapp.com",
  projectId: "prepinterviewai-220fc",
  storageBucket: "prepinterviewai-220fc.firebasestorage.app",
  messagingSenderId: "658625334007",
  appId: "1:658625334007:web:ab966d24c81341750aa1f2",
  measurementId: "G-HESBR6V5BL"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);