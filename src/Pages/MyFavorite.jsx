import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Providers/ThemeProvider";

const MyFavorite = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access theme from context

  useEffect(() => {
    if (!authLoading && user?.email) {
      setIsLoading(true);
      fetch(
        `https://movie-verse-server-three.vercel.app/favorites?email=${user.email}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch favorites");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched Movies:", data);
          setMovies(data);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
          toast.error("Failed to load favorite movies.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [authLoading, user?.email]);

  const handleDelete = (id) => {
    if (isLoading) return;

    setIsLoading(true);
    fetch(`https://movie-verse-server-three.vercel.app/favorites/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete favorite movie");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Movie deleted successfully!");
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        toast.error("Failed to delete the movie.");
      })
      .finally(() => setIsLoading(false));
  };

  // Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Helmet>
        <title>My Favorites - MovieVerse</title>
      </Helmet>
      <div
        className={`w-full py-24 ${
          theme === "dark" ? "bg-[#1e212a]" : "bg-[#f9fafb]"
        }`}
      >
        <div className="container mx-auto p-6">
          <h1
            className={`text-3xl font-bold text-center mb-6 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            My Favorites
          </h1>
          <Loader loading={isLoading} />
          <motion.div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${
              isLoading ? "hidden" : "block"
            }`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {movies.map((movie) => (
              <motion.div
                key={movie._id}
                className={`border rounded-lg shadow-md overflow-hidden ${
                  theme === "dark"
                    ? "bg-[#292c35] text-white"
                    : "bg-white text-black"
                }`}
                variants={itemVariants}
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div
                  className={`p-4 ${
                    theme === "dark"
                      ? "bg-[#292c35] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <h2
                    className={`text-xl font-bold mb-2 ${
                      theme === "dark" ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {movie.title}
                  </h2>
                  <p>
                    <hr />
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
                  <hr />
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/movies/${movie.movieId}`}
                        className={`btn my-4 ${
                          theme === "dark"
                            ? "bg-[#404757] text-gray-300"
                            : "bg-[#404757] text-gray-800"
                        } hover:bg-[#404757] hover:text-gray-800`}
                      >
                        See Details
                      </Link>
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(movie._id)}
                      className="btn my-4 bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {!isLoading && movies.length === 0 && (
            <p className="text-center py-72 text-white">No favorites found.</p>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MyFavorite;
