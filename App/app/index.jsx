//import ClearStorage from './ClearStorage';
import { View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Go to Debug Screen" onPress={() => router.push("/debug")} />
    </View>
  );
}


//export default function Index() {
  //return;
  //<ClearStorage />;
//}
