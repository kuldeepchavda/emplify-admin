import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../utils/Request"
const JobList = () => {
    const {request} = useApi();
    const [jobs, setJobs] = useState([]);

    const { user } = useContext(AuthContext); 

    useEffect(() => {
        const j = async () => {
            const data = await request(`${import.meta.env.VITE_BACKEND_URL}/job`, { method: "GET" })
            if (data) setJobs(data.data);
        }
        j();
    }, []);
    return (
        <div className="min-h-screen   text-zinc-100 p-3 md:p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-800">Available Jobs</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-6">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-zinc-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-zinc-900">{job.jobTitle}</h2>
                        <p className="text-zinc-700 mt-2">{job.companyName}</p>
                        <p className="text-zinc-500 mt-4">{job.jobDescription}</p>
                        <div className="mt-6   flex justify-end">
                            <button className="cursor-pointer px-4 py-2  bg-red-700 hover:bg-red-600 rounded-lg text-zinc-100 font-medium">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
