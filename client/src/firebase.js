// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cozycorner-1437c.firebaseapp.com",
  projectId: "cozycorner-1437c",
  storageBucket: "cozycorner-1437c.appspot.com",
  messagingSenderId: "230645491833",
  appId: "1:230645491833:web:99ce1715b2b74130eccca8"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);