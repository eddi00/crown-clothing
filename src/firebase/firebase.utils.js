// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (snapShot.exists()) {
    console.log("Document data:", snapShot.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);
