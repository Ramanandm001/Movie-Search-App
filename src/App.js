import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${query}`
      );
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default App;
