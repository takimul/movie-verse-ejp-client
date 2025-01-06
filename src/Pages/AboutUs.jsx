import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Providers/ThemeProvider";

const AboutUs = () => {
  const { theme } = useContext(ThemeContext); // Access the theme context

  return (
    <>
      <Helmet>
        <title>About Us - MovieVerse</title>
      </Helmet>
      <div
        className={`w-full py-6 pt-24 ${
          theme === "dark" ? "bg-[#1e212a]" : "bg-gray-100"
        }`}
      >
        <div
          className={`container mx-auto p-6 rounded-lg shadow-md ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <h1
            className={`text-4xl font-bold text-center mb-6 ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}
          >
            About Movie Verse
          </h1>
          <div className="text-lg leading-relaxed">
            <p className="mb-4">
              Welcome to <span className="font-bold">Movie Verse</span> – your
              ultimate platform to explore, manage, and share your love for
              movies! Whether you're a casual moviegoer or a passionate
              cinephile, Movie Verse is designed to make managing your movie
              collection easy and enjoyable.
            </p>
            <h2
              className={`text-2xl font-semibold mb-3 ${
                theme === "dark" ? "text-blue-300" : "text-blue-500"
              }`}
            >
              What We Offer
            </h2>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>
                <strong>Add Movies:</strong> Create and share detailed movie
                entries with posters, ratings, and summaries.
              </li>
              <li>
                <strong>Update Information:</strong> Keep your movie records
                accurate and up-to-date with ease.
              </li>
              <li>
                <strong>Favorites:</strong> Curate your personal list of
                favorite movies and revisit them anytime.
              </li>
              <li>
                <strong>Delete Movies:</strong> Manage your collection by
                removing movies you no longer want to keep.
              </li>
              <li>
                <strong>Private Routes:</strong> Enjoy a secure experience with
                login and signup features, ensuring your movie collection is
                just for you.
              </li>
            </ul>
            <h2
              className={`text-2xl font-semibold mb-3 ${
                theme === "dark" ? "text-blue-300" : "text-blue-500"
              }`}
            >
              Our Mission
            </h2>
            <p className="mb-4">
              At <span className="font-bold">Movie Verse</span>, we believe
              movies are more than just entertainment – they’re experiences,
              memories, and stories that bring people together. Our mission is
              to provide a platform where movie lovers can organize, share, and
              celebrate their favorite films with ease and joy.
            </p>
            <h2
              className={`text-2xl font-semibold mb-3 ${
                theme === "dark" ? "text-blue-300" : "text-blue-500"
              }`}
            >
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Easy-to-use interface for seamless navigation.</li>
              <li>Secure private routes to protect your data.</li>
              <li>Features tailored for movie enthusiasts.</li>
              <li>Comprehensive tools for managing your movie collection.</li>
            </ul>
            <p>
              Thank you for choosing{" "}
              <span className="font-bold">Movie Verse</span>. Dive into the
              world of cinema and let’s build a movie collection that’s as
              unique as you are!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
