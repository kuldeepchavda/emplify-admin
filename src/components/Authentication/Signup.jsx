import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toggleData } = useContext(AppContext);
  const { signup, errInfo } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password);
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-300 hover:scale-105 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              Create an account!
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input 
                id="email"
                name="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 sm:text-base transition-colors duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 sm:text-base transition-colors duration-200"
                required
              />
            </div>

            {/* Error Message */}
            {errInfo && (
              <p className="my-2 ml-auto w-fit text-red-500 font-semibold">
                {errInfo}
              </p>
            )}

            {/* Signup Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex flex-row justify-center my-4">
            <p className="mx-2 text-gray-600">Already a member?</p>
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors duration-200"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
