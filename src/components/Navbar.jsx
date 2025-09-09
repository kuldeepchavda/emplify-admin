import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import hamburger from "../assets/hamburger3.png";
import { AuthContext } from "../context/AuthContext";

const LinkTag = ({ route_, name, onClick, className }) => (
  <Link
    to={`/${route_}`}
    onClick={onClick}
    className={`block font-medium transition-colors duration-200 px-3 py-2 rounded-md ${className}`}
  >
    {name}
  </Link>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Define menu items once
  const links = user
    ? [
        { route_: "", name: "Home" },
        { route_: "list_jobs", name: "Jobs" },
        { route_: "add_job", name: "Add Jobs" },
      ]
    : [
        { route_: "signup", name: "Signup" },
        { route_: "login", name: "Login" },
      ];

  return (
    <nav className="bg-zinc-100 shadow-xl font-sans">
      <div className="flex justify-between items-center w-11/12 md:w-10/12 mx-auto py-3">
        <Link to="/">
          <img
            src={logo}
            alt="company logo"
            className="w-12 md:w-16 rounded-full border-2 border-orange-500 hover:border-orange-400 transition-colors duration-200"
          />
        </Link>

        {/* Menu for both desktop & mobile */}
        <div
          className={`flex flex-col md:flex-row md:items-center md:gap-8 absolute md:static left-0 right-0 bg-zinc-200 md:bg-transparent rounded-lg md:rounded-none mx-4 md:mx-0 mt-16 md:mt-0 p-4 md:p-0 shadow-lg md:shadow-none transition-all duration-300 ${
            menuOpen ? "top-0 opacity-100" : "top-[-500px] opacity-0 md:opacity-100"
          }`}
        >
          {links.map((link) => (
            <LinkTag
              key={link.name}
              {...link}
              onClick={() => setMenuOpen(false)}
              className={`${
                menuOpen ? "text-black hover:text-orange-400" : "text-zinc-800 hover:text-blue-700"
              }`}
            />
          ))}

          {user && (
            <button
              className={` p-3 font-medium  rounded-full transition-colors duration-200 ${
                menuOpen
                  ? "text-red-600 text-left w-full hover:text-orange-400"
                  : "bg-red-500  hover:bg-orange-700 text-white"
              }`}
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden   rounded-full    transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <img src={hamburger} alt="menu" className="w-10 filter invert rounded-full" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
