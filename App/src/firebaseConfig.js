import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAFwMGy5TCohGy_we4bAgYzq2ukS4QaXiA",
  authDomain: "customized-workout-planner.firebaseapp.com",
  projectId: "customized-workout-planner",
  storageBucket: "customized-workout-planner.firebasestorage.app",
  messagingSenderId: "451047491926",
  appId: "1:451047491926:web:c7351652c50bde68d2eef7",
  measurementId: "G-9H7XTWM91E"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

