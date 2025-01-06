// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import ReactStars from "react-rating-stars-component";
// import Swal from "sweetalert2";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateMovie = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [rating, setRating] = useState(0);
//   const [initialMovie, setInitialMovie] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm();

//   const ratingChanged = (newRating) => setRating(newRating);

//   useEffect(() => {
//     if (!id) return;
//     fetch(`https://movie-verse-server-three.vercel.app/movieCollection/${id}`)
//       .then((response) => {
//         if (!response.ok) throw new Error("Movie not found");
//         return response.json();
//       })
//       .then((data) => {
//         setInitialMovie(data);
//         setRating(data.rating || 0);
//         Object.keys(data).forEach((key) => setValue(key, data[key]));
//       })
//       .catch((error) => console.error("Error fetching movie:", error));
//   }, [id, setValue]);

//   const onSubmit = (data) => {
//     if (rating === 0) {
//       Swal.fire({
//         icon: "error",
//         title: "Missing Rating",
//         text: "Please select a rating!",
//       });
//       return;
//     }
//     const updatedMovie = { ...data, rating };
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to update this movie?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, update it!",
//       cancelButtonText: "No, cancel!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(
//           `https://movie-verse-server-three.vercel.app/movieCollection/${id}`,
//           {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(updatedMovie),
//           }
//         )
//           .then((response) => response.json())
//           .then(() => {
//             Swal.fire({
//               icon: "success",
//               title: "Movie Updated",
//               text: "Movie updated successfully!",
//             }).then(() => navigate(`/movies/${id}`));
//           })
//           .catch((error) => {
//             console.error("Error updating movie:", error);
//             Swal.fire({
//               icon: "error",
//               title: "Update Failed",
//               text: "Failed to update the movie.",
//             });
//           });
//       }
//     });
//   };

//   const years = Array.from(
//     { length: new Date().getFullYear() - 1990 + 1 },
//     (_, i) => 1990 + i
//   );

//   if (!initialMovie) {
//     return (
//       <p className="text-center text-gray-400 mt-6">Loading movie details...</p>
//     );
//   }

//   return (
//     <div className="md:px-32 mx-auto p-6 bg-gray-800 text-gray-100 shadow-md rounded-md">
//       <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
//         Update Movie Details
//       </h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-4">
//           <label
//             htmlFor="poster"
//             className="block mb-2 font-medium text-gray-200"
//           >
//             Movie Poster URL
//           </label>
//           <input
//             id="poster"
//             type="url"
//             {...register("poster", {
//               required: "Movie Poster URL is required",
//               pattern: {
//                 value: /^(ftp|http|https):\/\/[^ "]+$/,
//                 message: "Provide a valid URL",
//               },
//             })}
//             className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.poster && (
//             <p className="text-sm text-red-500">{errors.poster.message}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="title"
//             className="block mb-2 font-medium text-gray-200"
//           >
//             Movie Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             {...register("title", {
//               required: "Movie Title is required",
//               minLength: {
//                 value: 2,
//                 message: "Title must be at least 2 characters long",
//               },
//             })}
//             className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.title && (
//             <p className="text-sm text-red-500">{errors.title.message}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="genre"
//             className="block mb-2 font-medium text-gray-200"
//           >
//             Genre
//           </label>
//           <select
//             id="genre"
//             {...register("genre", { required: "Genre is required" })}
//             className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Genre</option>
//             <option value="comedy">Comedy</option>
//             <option value="drama">Drama</option>
//             <option value="horror">Horror</option>
//             <option value="action">Action</option>
//             <option value="romance">Romance</option>
//             <option value="thriller">Thriller</option>
//             <option value="sci-fi">Science Fiction</option>
//             <option value="fantasy">Fantasy</option>
//             <option value="animation">Animation</option>
//             <option value="documentary">Documentary</option>
//           </select>
//           {errors.genre && (
//             <p className="text-sm text-red-500">{errors.genre.message}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="duration"
//             className="block mb-2 font-medium text-gray-200"
//           >
//             Duration (in minutes)
//           </label>
//           <input
//             id="duration"
//             type="number"
//             {...register("duration", {
//               required: "Duration is required",
//               min: {
//                 value: 60,
//                 message: "Duration must be at least 60 minutes",
//               },
//             })}
//             className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.duration && (
//             <p className="text-sm text-red-500">{errors.duration.message}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="releaseYear"
//             className="block mb-2 font-medium text-gray-200"
//           >
//             Release Year
//           </label>
//           <select
//             id="releaseYear"
//             {...register("releaseYear", {
//               required: "Release Year is required",
//             })}
//             className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Year</option>
//             {years.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//           {errors.releaseYear && (
//             <p className="text-sm text-red-500">{errors.releaseYear.message}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2 font-medium text-gray-200">Rating</label>
//           <ReactStars
//             count={10}
//             value={rating}
//             onChange={ratingChanged}
//             size={30}
//             isHalf={true}
//             emptyIcon={<i className="far fa-star"></i>}
//             halfIcon={<i className="fa fa-star-half-alt"></i>}
//             fullIcon={<i className="fa fa-star"></i>}
//             activeColor="#ffd700"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="summary"
//             className="block mb-2 font-medium text-gray-200"
//           >
//             Summary
//           </label>
//           <textarea
//             id="summary"
//             {...register("summary", {
//               required: "Summary is required",
//               minLength: {
//                 value: 10,
//                 message: "Summary must be at least 10 characters long",
//               },
//             })}
//             className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//           {errors.summary && (
//             <p className="text-sm text-red-500">{errors.summary.message}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
//         >
//           Update Movie
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateMovie;

//theme

import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Providers/ThemeProvider";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [initialMovie, setInitialMovie] = useState(null);
  const { theme } = useContext(ThemeContext); // Access theme context

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const ratingChanged = (newRating) => setRating(newRating);

  useEffect(() => {
    if (!id) return;
    fetch(`https://movie-verse-server-three.vercel.app/movieCollection/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Movie not found");
        return response.json();
      })
      .then((data) => {
        setInitialMovie(data);
        setRating(data.rating || 0);
        Object.keys(data).forEach((key) => setValue(key, data[key]));
      })
      .catch((error) => console.error("Error fetching movie:", error));
  }, [id, setValue]);

  const onSubmit = (data) => {
    if (rating === 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Rating",
        text: "Please select a rating!",
      });
      return;
    }
    const updatedMovie = { ...data, rating };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this movie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://movie-verse-server-three.vercel.app/movieCollection/${id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMovie),
          }
        )
          .then((response) => response.json())
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Movie Updated",
              text: "Movie updated successfully!",
            }).then(() => navigate(`/movies/${id}`));
          })
          .catch((error) => {
            console.error("Error updating movie:", error);
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: "Failed to update the movie.",
            });
          });
      }
    });
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, i) => 1990 + i
  );

  if (!initialMovie) {
    return (
      <p className="text-center text-gray-400 mt-6">Loading movie details...</p>
    );
  }

  return (
    <div
      className={`md:px-32 mx-auto pt-24 p-6 ${
        theme === "dark"
          ? "bg-gray-800 text-gray-100"
          : "bg-gray-100 text-gray-900"
      } shadow-md rounded-md`}
    >
      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          theme === "dark" ? "text-blue-400" : "text-blue-700"
        }`}
      >
        Update Movie Details
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="poster"
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Movie Poster URL
          </label>
          <input
            id="poster"
            type="url"
            {...register("poster", {
              required: "Movie Poster URL is required",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Provide a valid URL",
              },
            })}
            className={`w-full px-3 py-2 border ${
              theme === "dark"
                ? "border-gray-700 bg-gray-900 text-gray-200"
                : "border-gray-300 bg-white text-gray-900"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.poster && (
            <p className="text-sm text-red-500">{errors.poster.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Movie Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Movie Title is required",
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters long",
              },
            })}
            className={`w-full px-3 py-2 border ${
              theme === "dark"
                ? "border-gray-700 bg-gray-900 text-gray-200"
                : "border-gray-300 bg-white text-gray-900"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="genre"
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Genre
          </label>
          <select
            id="genre"
            {...register("genre", { required: "Genre is required" })}
            className={`w-full px-3 py-2 border ${
              theme === "dark"
                ? "border-gray-700 bg-gray-900 text-gray-200"
                : "border-gray-300 bg-white text-gray-900"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Genre</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="fantasy">Fantasy</option>
            <option value="animation">Animation</option>
            <option value="documentary">Documentary</option>
          </select>
          {errors.genre && (
            <p className="text-sm text-red-500">{errors.genre.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Duration (in minutes)
          </label>
          <input
            id="duration"
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: {
                value: 60,
                message: "Duration must be at least 60 minutes",
              },
            })}
            className={`w-full px-3 py-2 border ${
              theme === "dark"
                ? "border-gray-700 bg-gray-900 text-gray-200"
                : "border-gray-300 bg-white text-gray-900"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.duration && (
            <p className="text-sm text-red-500">{errors.duration.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="releaseYear"
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Release Year
          </label>
          <select
            id="releaseYear"
            {...register("releaseYear", {
              required: "Release Year is required",
            })}
            className={`w-full px-3 py-2 border ${
              theme === "dark"
                ? "border-gray-700 bg-gray-900 text-gray-200"
                : "border-gray-300 bg-white text-gray-900"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.releaseYear && (
            <p className="text-sm text-red-500">{errors.releaseYear.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-200">Rating</label>
          <ReactStars
            count={10}
            value={rating}
            onChange={ratingChanged}
            size={30}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="summary"
            className={`block mb-2 font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Summary
          </label>
          <textarea
            id="summary"
            {...register("summary", {
              required: "Summary is required",
              minLength: {
                value: 10,
                message: "Summary must be at least 10 characters long",
              },
            })}
            className={`w-full px-3 py-2 border ${
              theme === "dark"
                ? "border-gray-700 bg-gray-900 text-gray-200"
                : "border-gray-300 bg-white text-gray-900"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          ></textarea>
          {errors.summary && (
            <p className="text-sm text-red-500">{errors.summary.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none ${
            theme === "dark" ? "bg-green-600" : "bg-green-500"
          }`}
        >
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
