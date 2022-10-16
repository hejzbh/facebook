import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAxLETbLkHFgbc9_kHlZEpwS4Q468zv6fI",
  authDomain: "facebook-d5629.firebaseapp.com",
  projectId: "facebook-d5629",
  storageBucket: "facebook-d5629.appspot.com",
  messagingSenderId: "816558324934",
  appId: "1:816558324934:web:0eea1d51fae6c8d2ffebc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);