import Constants from "expo-constants";

const EXERCISEDB_API_URL = Constants.expoConfig.extra.EXERCISEDB_API_URL;
const API_KEY = Constants.expoConfig.extra.EXERCISEDB_API_KEY;

export async function fetchExercisesByCategory(category) {
  try {
    const response = await fetch(`${EXERCISEDB_API_URL}/bodyPart/${category}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch exercises");
    return await response.json();
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
}
