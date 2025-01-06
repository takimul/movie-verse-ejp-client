// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const UpcomingMovies = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     // Fetch data from the JSON file
//     fetch("/assets/upcomingMovies.json")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch upcoming movies");
//         }
//         return response.json();
//       })
//       .then((data) => setMovies(data))
//       .catch((error) =>
//         console.error("Error fetching upcoming movies:", error)
//       );
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Upcoming Movies</h1>
//       <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
//         Not released yet
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {movies.map((movie, index) => (
//           <motion.div
//             key={index}
//             className="rounded-lg overflow-hidden shadow-md bg-[#292c35] text-white"
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <img
//               src={movie.poster}
//               alt={movie.title}
//               className="w-full h-60 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
//               <p className="text-gray-400">Release Date: {movie.releaseDate}</p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//       {movies.length === 0 && (
//         <p className="text-center text-gray-500">No upcoming movies found.</p>
//       )}
//     </div>
//   );
// };

// export default UpcomingMovies;

//theme

import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../Providers/ThemeProvider";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const { theme } = useContext(ThemeContext); // Access the theme context

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/assets/upcomingMovies.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming movies");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) =>
        console.error("Error fetching upcoming movies:", error)
      );
  }, []);

  return (
    <div
      className={`container mx-auto p-6 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Movies</h1>
      <h1
        className={`text-3xl font-bold text-center mb-6 ${
          theme === "dark" ? "text-red-400" : "text-red-600"
        }`}
      >
        Not released yet
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie, index) => (
          <motion.div
            key={index}
            className={`rounded-lg overflow-hidden shadow-md ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-black"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Release Date: {movie.releaseDate}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      {movies.length === 0 && (
        <p
          className={`text-center ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          No upcoming movies found.
        </p>
      )}
    </div>
  );
};

export default UpcomingMovies;
