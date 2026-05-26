// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvRKBlZnEt-VIKd1ZcaffbMAtOV9Zjujc",
  authDomain: "physiomonitoring-e5cd2.firebaseapp.com",
  projectId: "physiomonitoring-e5cd2",
  storageBucket: "physiomonitoring-e5cd2.firebasestorage.app",
  messagingSenderId: "103890322034",
  appId: "1:103890322034:web:a2b27b2b5b9cf24f0978eb",
  measurementId: "G-4HETPCQGPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)