import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import hamburger from "../assets/hamburger.png"; // your uploaded icon
import { AuthContext } from "../context/AuthContext";

const LinkTag = ({ route_, name, onClick }) => (
  <Link
    to={`/${route_}`}
    onClick={onClick}
    className="block font-semibold text-zinc-800 hover:text-zinc-600 px-3 py-2"
  >
    {name}
  </Link>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-zinc-200 shadow-md">
      <div className="flex justify-between items-center w-11/12 md:w-10/12 mx-auto py-2">
        <Link to="/">
          <img
            src={logo}
            alt="company logo"
            className=" w-10 md:w-14 rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {user && (
            <>
            <LinkTag route_="" name="Home" />
          <LinkTag route_="list_jobs" name="Jobs" />
          <LinkTag route_="add_job" name="Add Jobs" />
          <button className="block font-semibold text-zinc-800 hover:text-zinc-600 px-3 py-2" onClick={()=>{console.log("Logout fetched")}}>Logout</button>
          </>
          )}
          {!user && (
            <>
              <LinkTag route_="signup" name="Signup" />
              <LinkTag route_="login" name="Login" />
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <img src={hamburger} alt="menu" className="w-8" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-100 shadow-md rounded-lg mx-4 mb-2">
          { user && (<>
          <LinkTag route_="" name="Home" onClick={() => setMenuOpen(false)} />
          <LinkTag
            route_="list_jobs"
            name="Jobs"
            onClick={() => setMenuOpen(false)}
          />
          <LinkTag
            route_="add_job"
            name="Add Jobs"
            onClick={() => setMenuOpen(false)}
          />
          <button className="block font-semibold text-zinc-800 hover:text-zinc-600 px-3 py-2" onClick={logout}>Logout</button>
          
          </>)}
          {!user && (
            <>
              <LinkTag
                route_="signup"
                name="Signup"
                onClick={() => setMenuOpen(false)}
              />
              <LinkTag
                route_="login"
                name="Login"
                onClick={() => setMenuOpen(false)}
              />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
