// import React, { useContext, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";
// import Loader from "./Loader";
// import Swal from "sweetalert2";
// import { IoIosSunny } from "react-icons/io";
// import { IoMoonOutline } from "react-icons/io5";
// import { ThemeContext, ThemeProvider } from "../Providers/ThemeProvider";

// const Navbar = () => {
//   const { user, signOutUser, loading } = useContext(AuthContext);
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleSignOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, sign out!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         signOutUser()
//           .then(() => {
//             Swal.fire("Signed Out!", "You have been signed out.", "success");
//           })
//           .catch((error) => {
//             Swal.fire(
//               "Error!",
//               "An error occurred while signing out.",
//               "error"
//             );
//           });
//       }
//     });
//   };

//   const defaultAvatar =
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "All Movies", path: "/movies" },
//     { name: "Add Movie", path: "/add-movie" },
//     { name: "My Favorites", path: "/favorites" },
//     { name: "About Us", path: "/about" },
//   ];

//   return (
//     <nav className="navbar bg-[#2e3440] text-white font-semibold fixed z-50">
//       <div className="navbar-start">
//         <NavLink to="/">
//           <img
//             src="https://i.ibb.co.com/MZNy0Hw/movie-verse.jpg"
//             className="h-10 w-10 rounded-full"
//             alt="Logo"
//           />
//         </NavLink>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navLinks.map((link, idx) => (
//             <li key={idx}>
//               <NavLink
//                 to={link.path}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-yellow-400 font-extrabold border-2 border-yellow-500 rounded-xl p-2"
//                     : "hover:text-yellow-400 transition-colors duration-200"
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="navbar-end">
//         <button
//           className="btn btn-sm bg-gray-300 text-black btn-outline mx-4 "
//           onClick={toggleTheme}
//         >
//           {theme === "light" ? <IoIosSunny /> : <IoMoonOutline />}
//         </button>
//         {/* Dropdown for Small Screens */}
//         <div className="dropdown dropdown-end lg:hidden relative z-50 ">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <svg
//               className="h-5 w-5"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={
//                   isMenuOpen
//                     ? "M6 18L18 6M6 6l12 12"
//                     : "M4 6h16M4 12h16M4 18h16"
//                 }
//               />
//             </svg>
//           </div>

//           <ul
//             tabIndex={0}
//             className={`menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow bg-[#2e3440] text-white font-semibold ${
//               isMenuOpen ? "block" : "hidden"
//             }`}
//           >
//             {navLinks.map((link, idx) => (
//               <li key={idx}>
//                 <NavLink
//                   to={link.path}
//                   className="hover:text-yellow-400"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {link.name}
//                 </NavLink>
//               </li>
//             ))}

//             <hr className="my-2" />

//             {loading ? (
//               <Loader loading={loading} />
//             ) : user ? (
//               <>
//                 <li>
//                   <span className="font-bold">{user.displayName}</span>
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleSignOut}
//                     className="text-red-500 hover:bg-red-100"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <NavLink
//                     to="/login"
//                     className="hover:bg-gray-200"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Log In
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     to="/sign-up"
//                     className="hover:bg-gray-200"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Register
//                   </NavLink>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>

//         {/* Buttons for Large Screens */}
//         {!loading && !user && (
//           <div className="hidden lg:flex space-x-4">
//             <NavLink to="/login">
//               <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">
//                 Log In
//               </button>
//             </NavLink>
//             <NavLink to="/sign-up">
//               <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200">
//                 Register
//               </button>
//             </NavLink>
//           </div>
//         )}

//         {user && !loading && (
//           <div className="hidden lg:flex items-center space-x-4">
//             <img
//               src={user.photoURL || defaultAvatar}
//               alt="User Avatar"
//               className="w-10 h-10 rounded-full border-2 border-gray-300"
//             />
//             <button
//               onClick={handleSignOut}
//               className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-100"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

//theme
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { IoIosSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { ThemeContext, ThemeProvider } from "../Providers/ThemeProvider";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire("Signed Out!", "You have been signed out.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "An error occurred while signing out.",
              "error"
            );
          });
      }
    });
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Movies", path: "/movies" },
    // { name: "Add Movie", path: "/add-movie" },
    // { name: "My Favorites", path: "/favorites" },
    ...(user
      ? [
          { name: "Add Movie", path: "/add-movie" },
          { name: "My Favorites", path: "/favorites" },
        ]
      : []),
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav
      className={`navbar font-semibold fixed z-50 w-full ${
        theme === "dark"
          ? "bg-[#2e3440] text-white"
          : "bg-gray-200 text-gray-900"
      }`}
    >
      <div className="navbar-start">
        <NavLink to="/">
          <img
            src="https://i.ibb.co.com/MZNy0Hw/movie-verse.jpg"
            className="h-10 w-10 rounded-full"
            alt="Logo"
          />
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? `text-yellow-400 font-extrabold border-2 border-yellow-500 rounded-xl p-2`
                    : `hover:text-yellow-400 transition-colors duration-200 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-800"
                      }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <button
          className={`btn btn-sm btn-outline mx-4 ${
            theme === "dark"
              ? "bg-gray-300 text-black"
              : "bg-yellow-200 text-black"
          }`}
          onClick={toggleTheme}
        >
          {theme === "light" ? <IoIosSunny /> : <IoMoonOutline />}
        </button>

        {/* Dropdown for Small Screens */}
        <div className="dropdown dropdown-end lg:hidden relative z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow ${
              theme === "dark"
                ? "bg-[#2e3440] text-white"
                : "bg-white text-gray-900"
            } font-semibold ${isMenuOpen ? "block" : "hidden"}`}
          >
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.path}
                  className="hover:text-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <hr className="my-2" />

            {loading ? (
              <Loader loading={loading} />
            ) : user ? (
              <>
                <li>
                  <span className="font-bold">{user.displayName}</span>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sign-up"
                    className="hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Buttons for Large Screens */}
        {!loading && !user && (
          <div className="hidden lg:flex space-x-4">
            <NavLink to="/login">
              <button
                className={`px-4 py-2 ${
                  theme === "dark"
                    ? "bg-blue-500 text-white"
                    : "bg-blue-600 text-white"
                } rounded hover:bg-blue-600 transition-colors duration-200`}
              >
                Log In
              </button>
            </NavLink>
            <NavLink to="/sign-up">
              <button
                className={`px-4 py-2 ${
                  theme === "dark"
                    ? "bg-green-500 text-white"
                    : "bg-green-600 text-white"
                } rounded hover:bg-green-600 transition-colors duration-200`}
              >
                Register
              </button>
            </NavLink>
          </div>
        )}

        {user && !loading && (
          <div className="hidden lg:flex items-center space-x-4">
            <img
              src={user.photoURL || defaultAvatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
