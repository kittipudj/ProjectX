import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      age: userData.age,
      height: userData.height,
      weight: userData.weight,
      goal: userData.goal,
    });

    console.log("✅ User registered successfully:", user);
    return user;
  } catch (error) {
    console.error("❌ Firebase Registration Error:", error);
    throw error;
  }
};
