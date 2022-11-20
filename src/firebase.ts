import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TEST backend
const firebaseConfig = {
  apiKey: "AIzaSyDM5UmS-E3cknSsaMdF9gYNrhzoM717b_0",
  authDomain: "woomanup-front-test.firebaseapp.com",
  databaseURL:
    "https://woomanup-front-test-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "woomanup-front-test",
  storageBucket: "woomanup-front-test.appspot.com",
  messagingSenderId: "20915883248",
  appId: "1:20915883248:web:0d997a512b63d2e74a4635",
};


export const app = initializeApp(firebaseConfig);



export const db = getFirestore(app);
export const storage = getStorage(app);