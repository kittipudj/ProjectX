import { Tabs } from "expo-router";
import { Entypo, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Layout() {
  const { theme } = useTheme();

  return (
    <>
      {/* Separator Line Above the Tab Bar */}
      <View style={{ height: 1, backgroundColor: "#ccc", width: "100%" }} />

      <Tabs screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: theme === "light" ? "#fff" : "#111", // Use theme for background color
          height: 65,
          borderTopWidth: 0,
          elevation: 10, // Shadow effect
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#1f66f2",
        tabBarInactiveTintColor: "#777",
      }}>
        <Tabs.Screen name="Home" options={{ tabBarIcon: ({ color }) => <Entypo name="home" size={28} color={color} /> }} />
        <Tabs.Screen name="Discover" options={{ tabBarIcon: ({ color }) => <Entypo name="compass" size={28} color={color} /> }} />
        <Tabs.Screen name="Report" options={{ tabBarIcon: ({ color }) => <MaterialCommunityIcons name="lightning-bolt" size={28} color={color} /> }} />
        <Tabs.Screen name="Profile" options={{ tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} /> }} />
      </Tabs>
    </>
  );
}