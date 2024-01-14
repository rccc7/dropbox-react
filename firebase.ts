import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    // RCCC: The API key is private and accessed only through an environment variable
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "multiple-apps2.firebaseapp.com",
    projectId: "multiple-apps2",
    storageBucket: "multiple-apps2.appspot.com",
    messagingSenderId: "361804825534",
    appId: "1:361804825534:web:2b53dc99efededee8f2fef"
  };

    // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   Singleton: Check that the database is not already initialized.
const app = getApps().length ? getApp():  initializeApp(firebaseConfig);

// Once initialized or obtained the app, get the other elements we'll need.
const db = getFirestore(app);
const storage = getStorage(app);
// By now, in this project we'll not use these elements, so we can comment these lines or leave as it is
// so they will be available when we need them.
const functions = getFunctions(app);
const auth = getAuth(app);

export {db, storage}

