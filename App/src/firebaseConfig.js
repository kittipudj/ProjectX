import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFwMGy5TCohGy_we4bAgYzq2ukS4QaXiA",
  authDomain: "customized-workout-planner.firebaseapp.com",
  projectId: "customized-workout-planner",
  storageBucket: "customized-workout-planner.firebasestorage.app",
  messagingSenderId: "451047491926",
  appId: "1:451047491926:web:c7351652c50bde68d2eef7",
  measurementId: "G-9H7XTWM91E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

