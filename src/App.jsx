import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar"
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Profile from "./components/Profile";
import { AuthContext } from "./context/AuthContext";
import JobForm from "./components/Jobs/CreateJob";
import JobList from "./components/Jobs/Jobs";
import AdminHomePage from "./components/AdminHomePage";

// Protected route wrapper
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <h2>Loading...</h2>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="bg-zinc-100">
        <Navbar />
      <div className=" md:w-11/12 mx-auto ">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add_job" element={<JobForm />} />
          <Route path="/list_jobs" element={<JobList />} /> 
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
