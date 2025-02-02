import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const userExists = await AsyncStorage.getItem("userLoggedIn");

      if (userExists) {
        console.log("✅ User exists, going to Home...");
        setUserLoggedIn(true);
      } else {
        console.log("🔄 Redirecting to Login...");
        router.replace("/LoginScreen"); // ✅ Send new users to login first
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // ✅ Show loading while checking
  }

  console.log("✅ Rendering main UI");
  return <Slot />;
}
