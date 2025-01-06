import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    // Fetch all movies from the backend
    fetch("https://movie-verse-server-three.vercel.app/movieCollection")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);

        // Sort movies by rating in descending order and pick the top 6
        const sortedMovies = data.sort((a, b) => b.rating - a.rating);
        setTopRated(sortedMovies.slice(0, 6));
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ height: "60vh" }} // Set slider height to 60% of the viewport height
      >
        {topRated.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div className="border rounded-lg shadow-md overflow-hidden h-full">
              <div className="relative h-full">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <h1 className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white bg-gray-700 p-2">
                  {movie.title}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
