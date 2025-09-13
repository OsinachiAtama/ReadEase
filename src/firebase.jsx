// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_YZKjh_BlU_QWR3OFCAVF2r-n7mOhLlc",
  authDomain: "readease-82751.firebaseapp.com",
  projectId: "readease-82751",
  storageBucket: "readease-82751.firebasestorage.app",
  messagingSenderId: "60518757048",
  appId: "1:60518757048:web:5b0f35a3d7434f5578fa4d",
  measurementId: "G-7L96BHHTWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
// Initialize Firestore
const db = getFirestore(app);
export { db };