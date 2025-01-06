import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Providers/ThemeProvider";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [sortOption, setSortOption] = useState("rating-high-to-low"); // New state for sorting
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Fetch movies from backend
    fetch("https://movie-verse-server-three.vercel.app/movieCollection")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );
    setFilteredMovies(results);
  };

  // Sorting function
  const sortMovies = (movies) => {
    if (sortOption === "rating-high-to-low") {
      return [...movies].sort((a, b) => b.rating - a.rating); // Sort by rating high to low
    } else if (sortOption === "title-a-to-z") {
      return [...movies].sort((a, b) => a.title.localeCompare(b.title)); // Sort by title A to Z
    }
    return movies; // No sorting
  };

  // Apply sorting to filteredMovies
  useEffect(() => {
    setFilteredMovies(sortMovies(filteredMovies));
  }, [sortOption]);

  return (
    <>
      <Helmet>
        <title>All Movies - MovieVerse</title>
      </Helmet>
      <div
        className={`w-full pt-24 ${
          theme === "dark" ? "bg-[#1e212a]" : "bg-gray-100"
        }`}
      >
        <div className="container mx-auto p-6">
          <h1
            className={`text-3xl font-bold text-center mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            All Movies
          </h1>

          {/* Search Input */}
          <div className="mb-6 text-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by movie title..."
              className={`w-1/2 p-2 border rounded focus:outline-none ${
                theme === "dark"
                  ? "focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                  : "focus:ring-2 focus:ring-blue-400 bg-white text-black"
              }`}
            />
          </div>

          {/* Sort Options */}
          <div className="mb-6 text-center md:text-end">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={`p-2 border rounded focus:outline-none ${
                theme === "dark"
                  ? "focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                  : "focus:ring-2 focus:ring-blue-400 bg-white text-black"
              }`}
            >
              <option value="rating-high-to-low">
                Sort by Rating (High to Low)
              </option>
              <option value="title-a-to-z">Sort by Title (A to Z)</option>
            </select>
          </div>

          {/* Movies Grid */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <motion.div
                key={movie._id}
                className={`border rounded-lg shadow-md overflow-hidden ${
                  theme === "dark"
                    ? "bg-[#292c35] text-white"
                    : "bg-white text-black"
                } flex flex-col h-full`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                  <p>
                    <hr
                      className={`${
                        theme === "dark" ? "border-gray-600" : "border-gray-300"
                      }`}
                    />
                    <strong>Genre:</strong> {movie.genre}
                  </p>
                  <p>
                    <strong>Duration:</strong> {movie.duration} mins
                  </p>
                  <p>
                    <strong>Release Year:</strong> {movie.releaseYear}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.rating} / 10
                  </p>
                  <hr
                    className={`${
                      theme === "dark" ? "border-gray-600" : "border-gray-300"
                    }`}
                  />
                </div>

                <div className="mt-auto mx-auto w-fit">
                  <Link
                    to={`/movies/${movie._id}`}
                    className={`btn my-4  ${
                      theme === "dark"
                        ? "bg-[#404757] text-gray-300 hover:text-gray-800"
                        : "bg-gray-200 text-black hover:text-blue-500"
                    }`}
                  >
                    See Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredMovies.length === 0 && (
            <p
              className={`text-center ${
                theme === "dark" ? "text-gray-500" : "text-gray-700"
              }`}
            >
              No movies found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllMovies;
