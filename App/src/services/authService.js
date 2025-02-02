import { auth, db } from "../firebase_config"; // ✅ Ensure lowercase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// Register New User & Save to Firestore
export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      gender: userData.gender,
      age: userData.age,
      height: userData.height,
      weight: userData.weight,
      goal: userData.goal,
      preferences: userData.preferences,
    });

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};
