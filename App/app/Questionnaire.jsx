import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Questionnaire() {
  const router = useRouter();

  const completeQuiz = async () => {
    await AsyncStorage.setItem("hasCompletedQuiz", "true");
    router.replace("/(tabs)/Home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Questionnaire</Text>
      <Button title="Finish and Go to Home" onPress={completeQuiz} />
    </View>
  );
}
