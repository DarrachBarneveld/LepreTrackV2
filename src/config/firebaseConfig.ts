import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDol5t2_00HPZvwntBW_j9ILSliGNJMfB8",
  authDomain: "lepre-track.firebaseapp.com",
  projectId: "lepre-track",
  storageBucket: "lepre-track.appspot.com",
  messagingSenderId: "431766972649",
  appId: "1:431766972649:web:9014dc62d4e9e6199ea878",
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
