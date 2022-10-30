import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB9L4rsNjNt138rBYVHX0XdayARoGqwtok",
  authDomain: "insta-74789.firebaseapp.com",
  projectId: "insta-74789",
  storageBucket: "insta-74789.appspot.com",
  messagingSenderId: "588240249300",
  appId: "1:588240249300:web:faa9267f90ab92cd9f7641",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
