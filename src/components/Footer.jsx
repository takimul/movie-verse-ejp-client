import React, { useContext } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";
import { NavLink } from "react-router";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`py-8 ${
        theme === "dark"
          ? "bg-[#2e3440] text-white"
          : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="w-fit mx-auto">
            <NavLink to="/">
              <img
                src="https://i.ibb.co.com/MZNy0Hw/movie-verse.jpg"
                className="h-10 w-10 rounded-full"
                alt="Logo"
              />
            </NavLink>
          </div>
          <h2 className="text-2xl font-bold">Movie-Verse</h2>
          <p className="text-gray-400">
            Your gateway to cinematic experiences.
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="https://www.facebook.com/takimul.nihal/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-800"
              } hover:text-white transition`}
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/movieverse"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-800"
              } hover:text-white transition`}
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/movieverse"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-800"
              } hover:text-white transition`}
            >
              Instagram
            </a>
            <a
              href="https://youtube.com/movieverse"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-800"
              } hover:text-white transition`}
            >
              YouTube
            </a>
          </div>

          <div className="flex flex-wrap justify-center space-x-4 text-sm">
            <a
              href="/terms"
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-800"
              } hover:text-white transition`}
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-800"
              } hover:text-white transition`}
            >
              Privacy Policy
            </a>
            <a
              href="/faqs"
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-800"
              } hover:text-white transition`}
            >
              FAQs
            </a>
          </div>

          <div className="space-y-2 text-sm">
            <p className="text-gray-400">
              📧 Email:{" "}
              <a
                href="mailto:support@movieverse.com"
                className="text-white hover:underline"
              >
                support@movieverse.com
              </a>
            </p>
            <p className="text-gray-400">☎️ Phone: +880 1794 051479</p>
          </div>

          <p className="text-gray-600 text-xs mt-6">
            © 2024 Movie-Verse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
