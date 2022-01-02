// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV283C4xr_oAiVI_AEW6Mvns9_A9eCfV0",
  authDomain: "crown-db-9141c.firebaseapp.com",
  projectId: "crown-db-9141c",
  storageBucket: "crown-db-9141c.appspot.com",
  messagingSenderId: "635305400071",
  appId: "1:635305400071:web:db372f9d53ebf6cb4c57a2",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const signInWithGoogle = () => signInWithPopup(auth, provider);

export { app, db, auth, signInWithGoogle };
