import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { auth } from "../src/firebaseConfig";  // ✅ Fix path reference
import { onAuthStateChanged } from "firebase/auth";

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // Wait for Firebase to check auth state
  
  return user ? <Redirect href="/Home" /> : <Redirect href="/SignUpScreen" />;
}
