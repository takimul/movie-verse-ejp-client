// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";
// import { motion } from "framer-motion";

// const TopRatedMovies = () => {
//   const [movies, setMovies] = useState([]);
//   const [topRated, setTopRated] = useState([]);

//   useEffect(() => {
//     // Fetch all movies from the backend
//     fetch("https://movie-verse-server-three.vercel.app/movieCollection")
//       .then((response) => response.json())
//       .then((data) => {
//         setMovies(data);

//         // Sort movies by rating in descending order and pick the top 6
//         const sortedMovies = data.sort((a, b) => b.rating - a.rating);
//         setTopRated(sortedMovies.slice(0, 6));
//       })
//       .catch((error) => console.error("Error fetching movies:", error));
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Featured Movies</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {topRated.map((movie, index) => (
//           <motion.div
//             key={movie._id}
//             className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2, duration: 0.5 }}
//             whileHover={{ scale: 1.05 }}
//           >
//             <img
//               src={movie.poster}
//               alt={movie.title}
//               className="w-full h-48 object-cover"
//             />

//             <div className="p-4 bg-[#292c35] text-white">
//               <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
//               <p>
//                 <hr />
//                 <strong>Genre:</strong>{" "}
//                 <span className="text-gray-300">{movie.genre}</span>
//               </p>
//               <p>
//                 <strong>Duration:</strong>{" "}
//                 <span className="text-gray-300">{movie.duration} mins</span>
//               </p>
//               <p>
//                 <strong>Release Year:</strong>{" "}
//                 <span className="text-gray-300">{movie.releaseYear}</span>
//               </p>
//               <p>
//                 <strong>Rating:</strong>{" "}
//                 <span className="text-gray-300">{movie.rating} / 10</span>
//               </p>
//               <hr />
//               <Link
//                 to={`/movies/${movie._id}`}
//                 className="btn bg-[#404757] my-4 text-gray-300 hover:bg-[#404757] hover:text-gray-800 "
//               >
//                 See Details
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRatedMovies;

//theme

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ThemeContext } from "../Providers/ThemeProvider";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);

  // Access the theme from ThemeContext
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Fetch all movies from the backend
    fetch("https://movie-verse-server-three.vercel.app/movieCollection")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);

        // Sort movies by rating in descending order and pick the top 6
        const sortedMovies = data.sort((a, b) => b.rating - a.rating);
        setTopRated(sortedMovies.slice(0, 6));
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div
      className={`container mx-auto p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Featured Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topRated.map((movie, index) => (
          <motion.div
            key={movie._id}
            className={`border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            } flex flex-col h-full`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />

            <div
              className={`p-4 flex flex-col flex-grow ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p>
                <hr />
                <strong>Genre:</strong>{" "}
                <span
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {movie.genre}
                </span>
              </p>
              <p>
                <strong>Duration:</strong>{" "}
                <span
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {movie.duration} mins
                </span>
              </p>
              <p>
                <strong>Release Year:</strong>{" "}
                <span
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {movie.releaseYear}
                </span>
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                <span
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {movie.rating} / 10
                </span>
              </p>
              <hr />
            </div>

            <div className="mt-auto mx-auto">
              <Link
                to={`/movies/${movie._id}`}
                className={`btn my-4 ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-gray-100"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900"
                }`}
              >
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
