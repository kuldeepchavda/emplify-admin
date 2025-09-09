import { useState } from "react";
import useApi from "../../utils/Request.jsx"


export default function JobForm() {
    const { request } = useApi();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("");

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

        // Using a placeholder URL to avoid compilation errors.
        const data = await request(`${import.meta.env.VITE_BACKEND_URL}/job`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!data) return;

        if (data.success) {
            setMessage("Job Created Successfully!");
            setShowSuccess(true);
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
            setMessage("Error: " + data.message);
            setShowError(true);
        }
    };
    
    // Custom Modal component to replace native alert()
    const Modal = ({ type, message, onClose }) => {
        const isSuccess = type === 'success';
        const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
        const borderColor = isSuccess ? 'border-green-700' : 'border-red-700';
        const textColor = isSuccess ? 'text-white' : 'text-white';

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50" onClick={onClose}></div>
                <div className={`relative p-6 rounded-lg shadow-xl border-2 ${borderColor} ${bgColor} max-w-sm w-full transform transition-transform duration-300 ease-out scale-100`}>
                    <p className={`text-lg font-semibold text-center ${textColor}`}>{message}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 w-full bg-white text-gray-800 font-bold py-2 rounded-md shadow-md hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 flex justify-center items-center">
                <div className="bg-white p-10 md:p-16 rounded-xl shadow-lg w-11/12 md:w-3/4 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">Create Job Posting</h1>
                    <p className="text-sm md:text-base text-gray-500 mb-8">
                        Fill out the details below to create a new job listing.
                    </p>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4" onSubmit={handleSubmit}>
                        {/* Job Title */}
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                name="jobTitle"
                                placeholder="Job Title"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Job Description */}
                        <div className="col-span-1 md:col-span-2">
                            <textarea
                                name="jobDescription"
                                placeholder="Job Description"
                                value={formData.jobDescription}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        
                        {/* City & Pincode */}
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Salary & Employment Type */}
                        <div className="col-span-1">
                            <input
                                type="number"
                                name="salary"
                                placeholder="Salary"
                                value={formData.salary}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Full-Time</option>
                                <option>Part-Time</option>
                                <option>Internship</option>
                            </select>
                        </div>
                        
                        {/* Benefits */}
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                name="benefits"
                                placeholder="Benefits (comma separated)"
                                value={formData.benefits}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Education & Experience */}
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="educationLevel"
                                placeholder="Education Level"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <input
                                type="text"
                                name="experienceLevel"
                                placeholder="Experience Level"
                                value={formData.experienceLevel}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Required Skills */}
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                name="requiredSkills"
                                placeholder="Required Skills (comma separated)"
                                value={formData.requiredSkills}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Company Name */}
                        <div className="col-span-1 md:col-span-2">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        
                        {/* Application Deadline & Status */}
                        <div className="col-span-1">
                            <input
                                type="date"
                                name="applicationDeadline"
                                value={formData.applicationDeadline}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Active</option>
                                <option>Closed</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-1 md:col-span-2 mt-4">
                            <button
                                type="submit"
                                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition-colors duration-200"
                            >
                                Create Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Content - Placeholder Background */}
            <div className="flex-0.5 bg-gray-200 hidden md:block"></div>
            
            {showSuccess && <Modal type="success" message={message} onClose={() => setShowSuccess(false)} />}
            {showError && <Modal type="error" message={message} onClose={() => setShowError(false)} />}
        </div>
    );
}
