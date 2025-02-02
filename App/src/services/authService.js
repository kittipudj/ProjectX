import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const registerUser = async (email, password, userData) => {
  try {
    console.log("🚀 Registering user in Firebase:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("✅ Firebase created user:", user.uid);

    // ✅ Ensure Firestore is writing to the correct "users" collection
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      age: userData.age,
      height: userData.height,
      weight: userData.weight,
      goal: userData.goal,
    });

    console.log("✅ User data saved in Firestore");
    return user;
  } catch (error) {
    console.error("❌ Firebase Registration Error:", error);
    return null;
  }
};
