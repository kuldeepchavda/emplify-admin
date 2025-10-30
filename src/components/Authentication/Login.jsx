import { React, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { toggleData } = useContext(AppContext);
  const { login, errInfo } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const navigate = useNavigate();

  return (
    <div className="mt-10 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Log in to your account
          </h1>
          <p className="text-gray-500 text-sm">
            Please enter your credentials below, 123456
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              email
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 sm:text-base"
              required
            />
          </div>

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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 sm:text-base"
              required
            />
          </div>

          {errInfo && (
            <p className="my-2 text-sm text-red-600 font-medium">{errInfo}</p>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
