import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD39dxQBzAlxgN8fcm1mMHIsFXUCJrzpCU",
  authDomain: "metamersive-beta.firebaseapp.com",
  projectId: "metamersive-beta",
  storageBucket: "metamersive-beta.appspot.com",
  messagingSenderId: "64124456719",
  appId: "1:64124456719:web:38704900bdcc82ac78387a",
  measurementId: "G-DSG3ZPR565",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export Firestore helper
export const getCollection = (name) => collection(db, name);

export default app;
