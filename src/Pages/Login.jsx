// import React, { useState, useContext } from "react";
// import { useForm } from "react-hook-form";
// import { FcGoogle } from "react-icons/fc";
// import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../firebase.config";
// import { AuthContext } from "../Providers/AuthProvider";
// import Loader from "../components/Loader";
// import { Helmet } from "react-helmet";

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const { signInUser, signInWithGoogle } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();

//   const email = watch("email");

//   const onSubmit = (data) => {
//     if (isSignUp) {
//       console.log("Sign-Up Data:", data);
//     } else {
//       const { email, password } = data;
//       setLoading(true);
//       signInUser(email, password)
//         .then(() => {
//           // toast.success("Login successful!");
//           setTimeout(() => {
//             navigate("/");
//           });
//         })
//         .catch((error) => {
//           if (error.code === "auth/wrong-password") {
//             toast.error("Incorrect password. Please try again.");
//           } else if (error.code === "auth/user-not-found") {
//             toast.error("User not found. Please check your email.");
//           } else {
//             toast.error("Something went wrong. Please try again later.");
//           }
//           console.error("Error:", error);
//         })
//         .finally(() => setLoading(false));
//     }
//   };

//   // Forget Password
//   const handleForgetPassword = () => {
//     if (!email) {
//       toast.error("Please enter an email address to reset your password.");
//     } else {
//       sendPasswordResetEmail(auth, email)
//         .then(() => {
//           toast.success(`Password reset email sent to ${email}`);
//         })
//         .catch((error) => {
//           if (error.code === "auth/invalid-email") {
//             toast.error("Invalid email address. Please try again.");
//           } else if (error.code === "auth/user-not-found") {
//             toast.error("No user found with this email.");
//           } else {
//             toast.error("Failed to send password reset email. Try again.");
//           }
//           console.error("Error:", error);
//         });
//     }
//   };

//   // Google Login Handler
//   const handleGoogleLogin = () => {
//     setLoading(true);
//     signInWithGoogle()
//       .then(() => {
//         // toast.success("Google Login successful!");
//         navigate("/");
//       })
//       .catch((error) => {
//         toast.error("Google Login failed. Please try again later.");
//         console.error("Error:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <Helmet>
//         <title>LogIn - MovieVerse</title>
//       </Helmet>
//       <div className="flex items-center justify-center min-h-screen bg-[#1e212a]">
//         {loading ? (
//           <Loader loading={loading} />
//         ) : (
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="w-full max-w-sm p-6 bg-gray-800 border border-gray-700 shadow-md rounded-md"
//           >
//             <h2 className="mb-4 text-3xl font-extrabold text-center text-neon-green">
//               {isSignUp ? "Sign Up" : "Login"}
//             </h2>

//             {/* Email Field */}
//             <div className="mb-6">
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-300"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 className="w-full px-3 py-2 text-gray-100 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-green"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-500">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-300"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//                 className="w-full px-3 py-2 text-gray-100 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-green"
//               />
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-500">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Forgot Password */}
//             <div className="mb-6 text-right">
//               <p
//                 onClick={handleForgetPassword}
//                 className="text-sm text-neon-blue hover:underline cursor-pointer"
//               >
//                 Forgot Password?
//               </p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full px-3 py-2 font-semibold text-black bg-neon-green rounded-md hover:bg-neon-green-light focus:outline-none"
//             >
//               Login
//             </button>

//             {/* Google Login */}
//             <div className="my-6 text-center">
//               <p className="text-sm text-gray-400">or</p>
//               <button
//                 type="button"
//                 onClick={handleGoogleLogin}
//                 className="w-full px-3 py-2 mt-2 font-semibold text-gray-900 bg-gray-100 border border-gray-600 rounded-md hover:bg-gray-200 focus:outline-none flex items-center justify-center"
//               >
//                 <FcGoogle className="w-5 h-5 mr-2" />
//                 Sign in with Google
//               </button>
//             </div>

//             {/* Toggle Sign Up / Login */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-400">
//                 Don't have an account?{" "}
//                 <Link to="/sign-up">
//                   <button
//                     type="button"
//                     className="text-neon-blue hover:underline"
//                   >
//                     Sign Up
//                   </button>
//                 </Link>
//               </p>
//             </div>
//           </form>
//         )}

//         <ToastContainer
//           position="top-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       </div>
//     </>
//   );
// };

// export default Login;

//theme

import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";

import Loader from "../components/Loader";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Providers/ThemeProvider";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Access the theme context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const email = watch("email");

  const onSubmit = (data) => {
    if (isSignUp) {
      console.log("Sign-Up Data:", data);
    } else {
      const { email, password } = data;
      setLoading(true);
      signInUser(email, password)
        .then(() => {
          setTimeout(() => {
            navigate("/");
          });
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Incorrect password. Please try again.");
          } else if (error.code === "auth/user-not-found") {
            toast.error("User not found. Please check your email.");
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
          console.error("Error:", error);
        })
        .finally(() => setLoading(false));
    }
  };

  // Forget Password
  const handleForgetPassword = () => {
    if (!email) {
      toast.error("Please enter an email address to reset your password.");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success(`Password reset email sent to ${email}`);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            toast.error("Invalid email address. Please try again.");
          } else if (error.code === "auth/user-not-found") {
            toast.error("No user found with this email.");
          } else {
            toast.error("Failed to send password reset email. Try again.");
          }
          console.error("Error:", error);
        });
    }
  };

  // Google Login Handler
  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error("Google Login failed. Please try again later.");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>LogIn - MovieVerse</title>
      </Helmet>
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark" ? "bg-[#1e212a]" : "bg-gray-100"
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
              {isSignUp ? "Sign Up" : "Login"}
            </h2>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
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
                className={`w-full px-3 py-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:ring-neon-green"
                    : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-neon-blue"
                } rounded-md focus:outline-none focus:ring-2`}
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
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-3 py-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 border-gray-700 focus:ring-neon-green"
                    : "bg-gray-100 text-gray-900 border-gray-300 focus:ring-neon-blue"
                } rounded-md focus:outline-none focus:ring-2`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mb-6 text-right">
              <p
                onClick={handleForgetPassword}
                className={`text-sm ${
                  theme === "dark" ? "text-neon-blue" : "text-gray-700"
                } hover:underline cursor-pointer`}
              >
                Forgot Password?
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-3 py-2 font-semibold rounded-md focus:outline-none ${
                theme === "dark"
                  ? "bg-neon-green text-black hover:bg-neon-green-light"
                  : "bg-neon-blue text-white hover:bg-neon-blue-light"
              }`}
            >
              Login
            </button>

            {/* Google Login */}
            <div className="my-6 text-center">
              <p className="text-sm text-gray-400">or</p>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className={`w-full px-3 py-2 mt-2 font-semibold rounded-md focus:outline-none flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-gray-100 text-gray-900 border-gray-600 hover:bg-gray-200"
                    : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                }`}
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
            </div>

            {/* Toggle Sign Up / Login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link to="/sign-up">
                  <button
                    type="button"
                    className={`${
                      theme === "dark" ? "text-neon-blue" : "text-gray-700"
                    } hover:underline`}
                  >
                    Sign Up
                  </button>
                </Link>
              </p>
            </div>
          </form>
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Login;
