import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import useApi from "../../utils/Request";

const JobList = () => {
  const { request } = useApi();
  const { user } = useContext(AuthContext);
  const { jobs, jobCounts,setJobs } = useContext(AppContext);



  const deleteJob = async (id) => {
    try {
      const res = await request(`${import.meta.env.VITE_BACKEND_URL}/job/${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen  text-gray-900 p-3 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-700">Available Jobs</h1>
      <div className=" w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(jobs) && jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-blue-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold text-blue-800">{job.jobTitle}</h2>
            <p className="text-gray-600 text-sm mb-2">{job.companyName}</p>
            <p className="text-gray-500 text-sm italic mb-4">{job.city}, {job.pincode}</p>
            <p className="text-gray-700 mb-4">{job.jobDescription}</p>

            <div className="text-sm space-y-2">
              <p><span className="font-semibold text-blue-700">Salary:</span> ₹{job.salary.toLocaleString()}</p>
              <p><span className="font-semibold text-blue-700">Employment Type:</span> {job.employmentType}</p>
              {job.educationLevel && (
                <p><span className="font-semibold text-blue-700">Education:</span> {job.educationLevel}</p>
              )}
              {job.experienceLevel && (
                <p><span className="font-semibold text-blue-700">Experience:</span> {job.experienceLevel}</p>
              )}
              {job.requiredSkills?.length > 0 && (
                <p><span className="font-semibold text-blue-700">Skills:</span> {job.requiredSkills.join(", ")}</p>
              )}
              {job.benefits?.length > 0 && (
                <p><span className="font-semibold text-blue-700">Benefits:</span> {job.benefits.join(", ")}</p>
              )}
              {job.applicationDeadline && (
                <p>
                  <span className="font-semibold text-blue-700">Deadline:</span>{" "}
                  {new Date(job.applicationDeadline).toLocaleDateString()}
                </p>
              )}
              <p>
                <span className="font-semibold text-blue-700">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    job.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-xs text-gray-400">
                Posted on {new Date(job.postingDate).toLocaleDateString()}
              </p>
              {user && (
                <button
                  onClick={() => deleteJob(job._id)}
                  className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-medium transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
