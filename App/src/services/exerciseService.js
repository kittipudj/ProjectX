const EXERCISEDB_API_URL = "https://exercisedb.p.rapidapi.com/exercises";
const API_KEY = "9392000a97msh9c55d9fd3723128p10806cjsna296a99cea05"; // Replace with your actual API key

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
