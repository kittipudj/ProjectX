import { useEffect, useState } from "react";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // ✅ Ensure layout is fully mounted
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      if (!isMounted) return; // 🚀 Prevents early navigation error

      console.log("🔍 Checking AsyncStorage...");
      try {
        await AsyncStorage.removeItem("userLoggedIn"); // Clears login state for testing
        const userExists = await AsyncStorage.getItem("userLoggedIn");

        console.log("📂 Retrieved from AsyncStorage:", userExists);

        if (!userExists) {
          console.log("🔄 Redirecting to SignUpScreen...");
          setTimeout(() => {
            router.replace("/SignUpScreen"); // ✅ Delayed navigation
          }, 500);
        } else {
          console.log("✅ User exists, going to Home...");
        }
      } catch (error) {
        console.error("❌ Error checking login:", error);
      }

      setLoading(false);
    };

    checkLogin();
  }, [isMounted]); // ✅ Only run when mounted

  if (loading) {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  console.log("✅ Rendering main UI");
  return <Slot />;
}
