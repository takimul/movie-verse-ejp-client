import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add Movie Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Movie Poster */}
        <div className="mb-4">
          <label
            htmlFor="poster"
            className="block mb-2 font-medium text-gray-700"
          >
            Movie Poster URL
          </label>
          <input
            id="poster"
            type="url"
            {...register("poster", {
              required: "Movie Poster URL is required",
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.poster && (
            <p className="text-sm text-red-500">{errors.poster.message}</p>
          )}
        </div>

        {/* Movie Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 font-medium text-gray-700"
          >
            Movie Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: "Movie Title is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Genre */}
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block mb-2 font-medium text-gray-700"
          >
            Genre
          </label>
          <input
            id="genre"
            type="text"
            {...register("genre", { required: "Genre is required" })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.genre && (
            <p className="text-sm text-red-500">{errors.genre.message}</p>
          )}
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block mb-2 font-medium text-gray-700"
          >
            Duration (in minutes)
          </label>
          <input
            id="duration"
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: { value: 1, message: "Duration must be at least 1 minute" },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.duration && (
            <p className="text-sm text-red-500">{errors.duration.message}</p>
          )}
        </div>

        {/* Release Year */}
        <div className="mb-4">
          <label
            htmlFor="releaseYear"
            className="block mb-2 font-medium text-gray-700"
          >
            Release Year
          </label>
          <input
            id="releaseYear"
            type="number"
            {...register("releaseYear", {
              required: "Release Year is required",
              min: { value: 1900, message: "Enter a valid year" },
              max: {
                value: new Date().getFullYear(),
                message: "Year cannot be in the future",
              },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.releaseYear && (
            <p className="text-sm text-red-500">{errors.releaseYear.message}</p>
          )}
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block mb-2 font-medium text-gray-700"
          >
            Rating (1-10)
          </label>
          <input
            id="rating"
            type="number"
            {...register("rating", {
              required: "Rating is required",
              min: { value: 1, message: "Rating must be at least 1" },
              max: { value: 10, message: "Rating must not exceed 10" },
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.rating && (
            <p className="text-sm text-red-500">{errors.rating.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>

      {/* See Details Button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          className="px-4 py-2 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none"
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default Form;
