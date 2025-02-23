import React from "react";
import { ThemeProvider } from "../context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      {/* Ensure that the ThemeProvider wraps the entire app */}
      {/* ...existing code... */}
    </ThemeProvider>
  );
}
