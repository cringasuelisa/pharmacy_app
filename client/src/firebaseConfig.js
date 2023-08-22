// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvBkUmK2ZGgVfi0Y0e5G1sdjUnPDZ9fBk",
  authDomain: "sunday-a10ae.firebaseapp.com",
  projectId: "sunday-a10ae",
  storageBucket: "sunday-a10ae.appspot.com",
  messagingSenderId: "466393366050",
  appId: "1:466393366050:web:21b2a031e39615ba55547b",
  measurementId: "G-YXCJ3GJVX3",
};

// Initialize Firebase
console.log("Initializing Firebase...");
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
