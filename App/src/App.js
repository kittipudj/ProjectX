import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";

const ExerciseAPI = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", {
                    method: "GET",
                    headers: {
                        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
                        "x-rapidapi-key": "9392000a97msh9c55d9fd3723128p10806cjsna296a99cea05"  // 🔒 Replace with .env variable
                    }
                });
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("API Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size="large" color="#3b7dd8" /> : (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    text: { fontSize: 18, color: "#1F2937", marginBottom: 10 }
});

export default ExerciseAPI;
