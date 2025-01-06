import { createBrowserRouter } from "react-router";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import MainLayout from "../Layout/MainLayout";
import SignUp from "../Pages/SignUp";
import AddMovie from "../Pages/AddMovie/AddMovie";
import AllMovies from "../Pages/AllMovies";
import MovieDetails from "../Pages/MovieDetails";
import MyFavorite from "../Pages/MyFavorite";
import UpdateMovie from "../Pages/UpdateMovie";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../Pages/AboutUs";
import NotFoundPage from "../Pages/NotFoundPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <HomePage></HomePage>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/about",
          element: <AboutUs></AboutUs>,
        },
        {
          path: "/add-movie",
          element: (
            <PrivateRoute>
              <AddMovie></AddMovie>
            </PrivateRoute>
          ),
        },
        {
          path: "/movies",
          element: <AllMovies></AllMovies>,
        },
        {
          path: "/favorites",
          element: (
            <PrivateRoute>
              <MyFavorite></MyFavorite>
            </PrivateRoute>
          ),
        },

        {
          path: "/movies/:id",
          element: (
            <PrivateRoute>
              <MovieDetails></MovieDetails>
            </PrivateRoute>
          ),
        },

        {
          path: "/movies/update/:id",
          element: <UpdateMovie></UpdateMovie>,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage></NotFoundPage>,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
