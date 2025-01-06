import React, { useContext } from "react";
import TopRatedMovies from "../components/TopRatedMovies";
import Slider from "../components/Slider";
import UpcomingMovies from "../components/UpcomingMovies";
import TopTenImdb from "../components/TopTenImdb";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Providers/ThemeProvider";

const HomePage = () => {
  const { theme } = useContext(ThemeContext); // Access the current theme from ThemeContext

  return (
    <>
      <Helmet>
        <title>Home - MovieVerse</title>
      </Helmet>
      <div
        className={`min-h-screen pt-24 ${
          theme === "dark"
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <div>
          <Slider />
        </div>

        {/* Top Rated Movies Section */}
        <div className="p-4">
          <TopRatedMovies />
          <div>
            <UpcomingMovies />
          </div>
          <div>
            <TopTenImdb />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
