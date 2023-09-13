import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABzh6Lir5sE7aEAdf66lzXh0GXwawn_AI",
  authDomain: "shopping-app-3983e.firebaseapp.com",
  projectId: "shopping-app-3983e",
  storageBucket: "shopping-app-3983e.appspot.com",
  messagingSenderId: "854311765986",
  appId: "1:854311765986:web:9babc47c90cec95d219bbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc }