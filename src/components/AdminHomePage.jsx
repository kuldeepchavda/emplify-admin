// AdminHomePage.jsx
import { Link } from "react-router-dom";

import  {AppContext}  from "../context/AppContext";
import { useContext } from "react";
const AdminHomePage = () => {

  const {jobCounts } = useContext(AppContext);
  return (
    <div className="p-6 md:p-10 font-inter">
      {/* Header */}
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Manage jobs, view applicants, and oversee platform activity.
      </p>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          to="/add_job"
          className="p-6 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        >
          <h3 className="text-xl font-semibold mb-2">+ Create Job</h3>
          <p className="text-sm text-blue-100">
            Post a new job listing and start receiving applications.
          </p>
        </Link>

        <Link
          to="/list_jobs"
          className="p-6 bg-white rounded-2xl shadow hover:bg-gray-50 transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">📋 Manage Jobs</h3>
          <p className="text-sm text-gray-600">
            View, edit, or delete existing job postings.
          </p>
        </Link>

        <Link
          to="/profile"
          className="p-6 bg-white rounded-2xl shadow hover:bg-gray-50 transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">👤 My Profile</h3>
          <p className="text-sm text-gray-600">
            Update your admin profile and account settings.
          </p>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow">
          <h4 className="text-gray-500 text-sm">Total Jobs</h4>
          <p className="text-3xl font-bold text-blue-600">{jobCounts}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <h4 className="text-gray-500 text-sm">Applicants</h4>
          <p className="text-3xl font-bold text-green-600">128</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow">
          <h4 className="text-gray-500 text-sm">Active Recruiters</h4>
          <p className="text-3xl font-bold text-purple-600">7</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
