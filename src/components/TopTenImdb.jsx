import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../Providers/ThemeProvider";

const TopTenImdb = () => {
  const [movies, setMovies] = useState([]);
  const { theme } = useContext(ThemeContext); // Access the theme context

  useEffect(() => {
    fetch("/assets/topImdb.json")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Failed to load movies:", error));
  }, []);

  // Variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div
      className={`container mx-auto p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Recent IMDB Top 10
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.title}
            className={`rounded-lg shadow-md overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
            }`}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className={`p-4 h-full`}>
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <hr
                className={`${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
              />
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <strong>Rating:</strong> {movie.rating}
              </p>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-700"
                }`}
              >
                <strong>Release Year:</strong> {movie.releaseYear}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopTenImdb;
