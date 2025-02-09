import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { auth } from "../src/firebaseConfig"; 
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

  if (loading) return null; 
  return user ? <Redirect href="/(tabs)" /> : <Redirect href="/screens/LoginScreen" />;
}
