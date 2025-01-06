import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../../Providers/ThemeProvider";

const AddMovie = ({ userEmail }) => {
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext); // Access theme from context
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const onSubmit = (data) => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    const movieData = { ...data, rating, userEmail };
    console.log("Form Data Submitted:", movieData);
    setLoading(true);

    fetch("https://movie-verse-server-three.vercel.app/movieCollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        toast.success("Movie submitted successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to submit movie details. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, i) => 1990 + i
  );

  return (
    <>
      <Helmet>
        <title>AddMovies- MovieVerse</title>
      </Helmet>
      <div
        className={`md:px-32 mx-auto pt-24 p-6 rounded-md shadow-md ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-6 ${
            theme === "dark" ? "text-blue-400" : "text-blue-700"
          }`}
        >
          Add Movie Details
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Movie Poster */}
          <div className="mb-4">
            <label
              htmlFor="poster"
              className={`block mb-2 font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
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
                  message: "Please provide a valid URL",
                },
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.poster && (
              <p className="text-sm text-red-500">{errors.poster.message}</p>
            )}
          </div>

          {/* Movie Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className={`block mb-2 font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
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
              className={`w-full px-3 py-2 border rounded-md ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label
              htmlFor="genre"
              className={`block mb-2 font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Genre
            </label>
            <select
              id="genre"
              {...register("genre", { required: "Genre is required" })}
              className={`w-full px-3 py-2 border rounded-md ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
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

          {/* Duration */}
          <div className="mb-4">
            <label
              htmlFor="duration"
              className={`block mb-2 font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
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
              className={`w-full px-3 py-2 border rounded-md ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.duration && (
              <p className="text-sm text-red-500">{errors.duration.message}</p>
            )}
          </div>

          {/* Release Year */}
          <div className="mb-4">
            <label
              htmlFor="releaseYear"
              className={`block mb-2 font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Release Year
            </label>
            <select
              id="releaseYear"
              {...register("releaseYear", {
                required: "Release Year is required",
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.releaseYear && (
              <p className="text-sm text-red-500">
                {errors.releaseYear.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label
              htmlFor="rating"
              className={`block mb-2 font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Rating
            </label>
            <ReactStars
              count={10}
              onChange={ratingChanged}
              size={30}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
          </div>

          {/* Summary */}
          <div className="mb-4">
            <label
              htmlFor="summary"
              className={`block mb-2 font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
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
              className={`w-full px-3 py-2 border rounded-md ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-200 border-gray-700"
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ></textarea>
            {errors.summary && (
              <p className="text-sm text-red-500">{errors.summary.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md focus:outline-none ${
              theme === "dark"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {loading && <Loader loading={loading} />}
        <ToastContainer />
      </div>
    </>
  );
};

export default AddMovie;
