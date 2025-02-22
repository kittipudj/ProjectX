import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { auth, db } from "../src/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useRouter } from "expo-router"; // Import useRouter

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Auth state changed:", user);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          console.log("User document data:", docSnap.data());
          if (docSnap.data().questionnaireCompleted) {
            console.log("Questionnaire completed");
            setQuestionnaireCompleted(true);
          }
        }
        setUser(user);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("Navigating to Login");
        router.push("screens/LoginScreen");
      } else if (!questionnaireCompleted) {
        console.log("Navigating to Questionnaire");
        router.push("screens/QuestionnaireScreen");
      } else {
        console.log("Navigating to Home");
        router.push("(tabs)/Home");
      }
    }
  }, [loading, user, questionnaireCompleted, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}