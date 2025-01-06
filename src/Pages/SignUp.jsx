import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Providers/ThemeProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { createUser, updateCurrentUser, setLoading, loading } =
    useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access theme context

  // Password Validation Function
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!uppercaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const onSubmit = (data) => {
    const { email, password, fullName, photo } = data;
    setLoading(true);

    // Validate Password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setLoading(false);
      return;
    }

    setPasswordError("");

    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user) {
          updateCurrentUser(fullName, photo).then(() => {
            toast.success("Account created successfully!", {
              position: "top-center",
            });
            navigate("/");
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to create account. Email might already be in use.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - MovieVerse</title>
      </Helmet>
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark" ? "bg-[#1e212a]" : "bg-[#f4f4f4]"
        }`}
      >
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-full max-w-sm p-6 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700 text-white"
                : "bg-white border border-gray-300 text-black"
            } shadow-md rounded-md`}
          >
            <h2
              className={`mb-4 text-3xl font-extrabold text-center ${
                theme === "dark" ? "text-neon-green" : "text-neon-blue"
              }`}
            >
              Sign Up
            </h2>

            {/* full name */}
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 focus:ring-neon-green"
                    : "bg-gray-100 text-black border-gray-300 focus:ring-neon-blue"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="mb-6">
              <label htmlFor="photo" className="block mb-2 text-sm font-medium">
                Photo URL
              </label>
              <input
                id="photo"
                type="url"
                {...register("photo", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: "Invalid URL format",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 focus:ring-neon-green"
                    : "bg-gray-100 text-black border-gray-300 focus:ring-neon-blue"
                }`}
              />
              {errors.photo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 focus:ring-neon-green"
                    : "bg-gray-100 text-black border-gray-300 focus:ring-neon-blue"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 focus:ring-neon-green"
                    : "bg-gray-100 text-black border-gray-300 focus:ring-neon-blue"
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-white border-gray-700 focus:ring-neon-green"
                    : "bg-gray-100 text-black border-gray-300 focus:ring-neon-blue"
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-3 py-2 font-semibold rounded-md ${
                theme === "dark"
                  ? "bg-neon-green text-black hover:bg-neon-green-light"
                  : "bg-neon-blue text-white hover:bg-neon-blue-light"
              }`}
            >
              Sign Up
            </button>
          </form>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
