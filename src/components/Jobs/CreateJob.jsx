import { useState } from "react";
import useApi from "../../utils/Request"; // ⬅️ centralized API handler

export default function JobForm() {
  const { request } = useApi(); // use our custom hook

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    city: "",
    pincode: "",
    salary: "",
    employmentType: "Full-Time",
    benefits: "",
    educationLevel: "",
    experienceLevel: "",
    requiredSkills: "",
    companyName: "",
    applicationDeadline: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      benefits: formData.benefits.split(",").map((b) => b.trim()),
      requiredSkills: formData.requiredSkills.split(",").map((s) => s.trim()),
    };

    const data = await request("http://localhost:5000/job/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!data) return; // handled by useApi (redirected if 403)

    if (data.success) {
      alert("Job Created Successfully!");
      setFormData({
        jobTitle: "",
        jobDescription: "",
        city: "",
        pincode: "",
        salary: "",
        employmentType: "Full-Time",
        benefits: "",
        educationLevel: "",
        experienceLevel: "",
        requiredSkills: "",
        companyName: "",
        applicationDeadline: "",
        status: "Active",
      });
    } else {
      alert("Error: " + data.message);
    }
  };

  return (
    <div className="flex  my-auto   ">
      <div className="bg-white shadow-xl md:rounded-2xl p-5 md:p-8 w-full md:w-1/2 mx-auto  md:border-2 border-zinc-800">
        <h1 className="text-3xl font-bold text-zinc-900 mb-6 text-center tracking-wide">
          Create Job Posting
        </h1> 

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Job Title */}
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-700 rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            required
          />

          {/* Description */}
          <textarea
            name="jobDescription"
            placeholder="Job Description"
            value={formData.jobDescription}
            onChange={handleChange}
            className="p-3 border-2 border-zinc-700 rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            rows="3"
            required
          />

          {/* Location */}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
            required
          />

          {/* Salary */}
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
            required
          />

          {/* Employment Type */}
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
          </select>

          {/* Benefits */}
          <input
            type="text"
            name="benefits"
            placeholder="Benefits (comma separated)"
            value={formData.benefits}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-700 rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />

          {/* Education & Experience */}
          <input
            type="text"
            name="educationLevel"
            placeholder="Education Level"
            value={formData.educationLevel}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <input
            type="text"
            name="experienceLevel"
            placeholder="Experience Level"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />

          {/* Skills */}
          <input
            type="text"
            name="requiredSkills"
            placeholder="Required Skills (comma separated)"
            value={formData.requiredSkills}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-700 rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />

          {/* Company */}
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-700 rounded-md col-span-2 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            required
          />

          {/* Deadline */}
          <input
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-2 md:p-3 border-2 border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            <option>Active</option>
            <option>Closed</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="col-span-2 bg-[#e0b92f] text-zinc-900 font-bold py-3 rounded-md shadow-md hover:bg-[#c9a728] transition border-2 border-zinc-800"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}
