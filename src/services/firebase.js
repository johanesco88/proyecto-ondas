// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0N3dNqvDsgjW79ps9m8v3D9Tt-t8v67c",
  authDomain: "ondascolciencias-340e0.firebaseapp.com",
  projectId: "ondascolciencias-340e0",
  storageBucket: "ondascolciencias-340e0.firebasestorage.app",
  messagingSenderId: "426631762662",
  appId: "1:426631762662:web:3222aeb263a58edbf56127"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
