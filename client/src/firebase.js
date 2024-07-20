// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "review-world-8404c.firebaseapp.com",
  projectId: "review-world-8404c",
  storageBucket: "review-world-8404c.appspot.com",
  messagingSenderId: "56031194341",
  appId: "1:56031194341:web:2bc16d0535bb33bf25780c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

