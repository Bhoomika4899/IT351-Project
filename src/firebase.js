// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXjXfxuGRyWbswkHB_42LW-von-N1FjX8",
  authDomain: "indianlangsystem.firebaseapp.com",
  projectId: "indianlangsystem",
  storageBucket: "indianlangsystem.appspot.com",
  messagingSenderId: "241429407183",
  appId: "1:241429407183:web:e225cffc1d55929eec1eba",
  measurementId: "G-RRY788NCHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };