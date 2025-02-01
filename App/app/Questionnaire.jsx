import { useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Questionnaire = () => {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState({});

  const completeQuiz = async () => {
    await AsyncStorage.setItem("hasCompletedQuiz", "true");
    router.replace("/(tabs)/Home"); // Redirect to Home after completion
  };

  return (
    <View>
      <Text>Welcome! Let's customize your workout plan.</Text>
      {/* TODO: Add form inputs here */}
      <Button title="Finish Questionnaire" onPress={completeQuiz} />
    </View>
  );
};

export default Questionnaire;
