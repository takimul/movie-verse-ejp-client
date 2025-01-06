// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loader from "../components/Loader";
// import { div } from "framer-motion/client";
// import { Helmet } from "react-helmet";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (!id) return;

//     setLoading(true);

//     // Fetch movie details
//     fetch(`https://movie-verse-server-three.vercel.app/movieCollection/${id}`)
//       .then((response) => {
//         if (!response.ok) throw new Error("Movie not found");
//         return response.json();
//       })
//       .then((data) => setMovie(data))
//       .catch((error) => {
//         console.error("Error fetching movie details:", error);
//         toast.error("Failed to fetch movie details.");
//       })
//       .finally(() => setLoading(false));

//     // Fetch user's favorite movies
//     if (user?.email) {
//       fetch(
//         `https://movie-verse-server-three.vercel.app/favorites?email=${user.email}`
//       )
//         .then((response) => {
//           if (!response.ok) throw new Error("Failed to fetch favorites");
//           return response.json();
//         })
//         .then((data) => setFavorites(data.map((fav) => fav.movieId)))
//         .catch((error) => console.error("Error fetching favorites:", error));
//     }
//   }, [id, user?.email]);

//   // Handle Add to Favorite
//   const handleAddToFavorite = () => {
//     if (!user) {
//       toast.error("Please log in to add to favorites!");
//       return;
//     }

//     if (loading) return;

//     // Check if the movie is already in favorites
//     if (favorites.includes(movie._id)) {
//       toast.info("This movie is already in your favorites!");
//       return;
//     }

//     setLoading(true);
//     const favoriteData = {
//       userEmail: user.email,
//       movieId: movie._id,
//       movieData: {
//         title: movie.title,
//         genre: movie.genre,
//         duration: movie.duration,
//         releaseYear: movie.releaseYear,
//         rating: movie.rating,
//         poster: movie.poster,
//       },
//     };

//     fetch("https://movie-verse-server-three.vercel.app/favorites", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(favoriteData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message) {
//           toast.success("Movie added to favorites successfully!");
//           setFavorites((prev) => [...prev, movie._id]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error adding to favorites:", error);
//         toast.error("Failed to add to favorites.");
//       })
//       .finally(() => setLoading(false));
//   };

//   // Handle Delete Movie
//   const handleDeleteMovie = () => {
//     if (loading) return;
//     setLoading(true);

//     fetch(`https://movie-verse-server-three.vercel.app/movieCollection/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.message) {
//           toast.success(data.message);
//           setTimeout(() => {
//             navigate("/movies");
//           }, 2000);
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting movie:", error);
//         toast.error("Failed to delete movie.");
//       })
//       .finally(() => setLoading(false));
//   };

//   if (!movie) {
//     return <Loader loading={loading} />;
//   }

//   return (
//     <>
//       <Helmet>
//         <title>{movie ? `${movie.title} - MovieVerse` : "Loading..."}</title>
//       </Helmet>
//       <div className="bg-[#1e212a] text-white py-6">
//         <div className="container mx-auto p-6 border rounded-lg shadow-md overflow-hidden ">
//           <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
//           <img
//             src={movie.poster}
//             alt={movie.title}
//             className="w-full h-full object-cover mb-6"
//           />
//           <p>
//             <strong>Genre:</strong> {movie.genre}
//           </p>
//           <p>
//             <strong>Duration:</strong> {movie.duration} mins
//           </p>
//           <p>
//             <strong>Release Year:</strong> {movie.releaseYear}
//           </p>
//           <p>
//             <strong>Rating:</strong> {movie.rating} / 10
//           </p>
//           <p>
//             <strong>Description:</strong>{" "}
//             {movie.summary || "No description available."}
//           </p>

//           <div className="flex mt-6 space-x-4">
//             {/* Add to Favorite Button */}
//             <button
//               onClick={handleAddToFavorite}
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Add to Favorite
//             </button>

//             {/* Delete Movie Button */}
//             <button
//               onClick={handleDeleteMovie}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//             >
//               Delete Movie
//             </button>

//             {/* Update Movie Button */}
//             <button
//               onClick={() => navigate(`/movies/update/${id}`)}
//               className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//             >
//               Update Movie
//             </button>
//           </div>

//           <Loader loading={loading} />
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default MovieDetails;

//theme

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Providers/ThemeProvider";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access theme from context

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Fetch movie details
    fetch(`https://movie-verse-server-three.vercel.app/movieCollection/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Movie not found");
        return response.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to fetch movie details.");
      })
      .finally(() => setLoading(false));

    // Fetch user's favorite movies
    if (user?.email) {
      fetch(
        `https://movie-verse-server-three.vercel.app/favorites?email=${user.email}`
      )
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch favorites");
          return response.json();
        })
        .then((data) => setFavorites(data.map((fav) => fav.movieId)))
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [id, user?.email]);

  // Handle Add to Favorite
  const handleAddToFavorite = () => {
    if (!user) {
      toast.error("Please log in to add to favorites!");
      return;
    }

    if (loading) return;

    // Check if the movie is already in favorites
    if (favorites.includes(movie._id)) {
      toast.info("This movie is already in your favorites!");
      return;
    }

    setLoading(true);
    const favoriteData = {
      userEmail: user.email,
      movieId: movie._id,
      movieData: {
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration,
        releaseYear: movie.releaseYear,
        rating: movie.rating,
        poster: movie.poster,
      },
    };

    fetch("https://movie-verse-server-three.vercel.app/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoriteData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success("Movie added to favorites successfully!");
          setFavorites((prev) => [...prev, movie._id]);
        }
      })
      .catch((error) => {
        console.error("Error adding to favorites:", error);
        toast.error("Failed to add to favorites.");
      })
      .finally(() => setLoading(false));
  };

  // Handle Delete Movie
  const handleDeleteMovie = () => {
    if (loading) return;
    setLoading(true);

    fetch(`https://movie-verse-server-three.vercel.app/movieCollection/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message);
          setTimeout(() => {
            navigate("/movies");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        toast.error("Failed to delete movie.");
      })
      .finally(() => setLoading(false));
  };

  if (!movie) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <Helmet>
        <title>{movie ? `${movie.title} - MovieVerse` : "Loading..."}</title>
      </Helmet>
      <div
        className={`py-6 pt-24 ${
          theme === "dark" ? "bg-[#1e212a]" : "bg-[#f9fafb]"
        }`}
      >
        <div
          className={`container mx-auto p-6 border rounded-lg shadow-md overflow-hidden ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <h1
            className={`text-3xl font-bold mb-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            {movie.title}
          </h1>
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover mb-6"
          />
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
            <strong>Duration:</strong> {movie.duration} mins
          </p>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
            <strong>Rating:</strong> {movie.rating} / 10
          </p>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
            <strong>Description:</strong>{" "}
            {movie.summary || "No description available."}
          </p>

          <div className="flex mt-6 space-x-4">
            {/* Add to Favorite Button */}
            <button
              onClick={handleAddToFavorite}
              className={`px-4 py-2 ${
                theme === "dark"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-600 text-black"
              } rounded hover:bg-blue-600`}
            >
              Add to Favorite
            </button>

            {/* Delete Movie Button */}
            <button
              onClick={handleDeleteMovie}
              className={`px-4 py-2 ${
                theme === "dark"
                  ? "bg-red-500 text-white"
                  : "bg-red-600 text-black"
              } rounded hover:bg-red-600`}
            >
              Delete Movie
            </button>

            {/* Update Movie Button */}
            <button
              onClick={() => navigate(`/movies/update/${id}`)}
              className={`px-4 py-2 ${
                theme === "dark"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-600 text-black"
              } rounded hover:bg-yellow-600`}
            >
              Update Movie
            </button>
          </div>

          <Loader loading={loading} />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
