import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { auth } from "../src/firebaseConfig"; // Ensure the correct path
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

  if (loading) return null; // Wait until auth is checked
  return user ? <Redirect href="/Home" /> : <Redirect href="/LoginScreen" />;
}
