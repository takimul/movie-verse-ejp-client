// import React, { useState, useEffect } from "react";
// import TopRatedMovies from "../components/TopRatedMovies";
// import Slider from "../components/Slider";
// import UpcomingMovies from "../components/UpcomingMovies";
// import TopTenImdb from "../components/TopTenImdb";
// import { Helmet } from "react-helmet";

// const HomePage = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Home - MovieVerse</title>
//       </Helmet>
//       <div>
//         <header className="p-4 bg-gray-200 dark:bg-gray-800 flex  items-center">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 w-3/4 text-center lg:pl-[20%] ">
//             Home Page
//           </h1>
//         </header>

//         {/* slider */}

//         <div className="">
//           <Slider></Slider>
//         </div>

//         {/* Top Rated Movies Section */}
//         <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
//           <TopRatedMovies />
//           <div>
//             <UpcomingMovies></UpcomingMovies>
//           </div>
//           <div>
//             <TopTenImdb></TopTenImdb>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePage;

//theme

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
        {/* <header className="p-4 bg-gray-200 dark:bg-gray-800 flex items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 w-3/4 text-center lg:pl-[20%]">
            Home Page
          </h1>
        </header> */}

        {/* Slider */}
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
