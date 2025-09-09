import { useEffect, useState } from "react";
import useApi from "../../utils/Request";

const ReceivedApplications = () => {
  const { request } = useApi();
  const [applications, setApplications] = useState([]);

  // Fetch all applications (for admin)
  const fetchApplications = async () => {
    try {
      const data = await request(
        `${import.meta.env.VITE_BACKEND_URL}/apply/admin`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(data)
      setApplications(data );
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  // Update application status
  const updateStatus = async (applicationId, status) => {
    try {
      const data = await request(
        `${import.meta.env.VITE_BACKEND_URL}/apply/admin/update/status`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applicationId, status }),
        }
      );
      console.log("Status update response:", data);
      fetchApplications();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Received Applications</h2>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications received yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <div
              key={app._id}
              className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white flex flex-col justify-between"
            >
              {/* Job & User Info */}
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {app.jobTitle}
                </h3>
                <p className="text-sm text-gray-600">
                  Applicant: {app.applicantName || "Unknown"}
                </p>
                <p className="text-sm text-gray-500">{app.applicantEmail}</p>
                <p className="text-sm text-gray-700 mt-2">
                  Current Status:{" "}
                  <span className="font-medium text-blue-600">
                    {app.status}
                  </span>
                </p>
              </div>

              {/* Status Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                {["Pending", "Under Review", "Accepted", "Rejected"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(app._id, status)}
                      className={`px-3 py-1 rounded-md text-sm font-medium shadow-sm
                        ${
                          status === "Pending"
                            ? "bg-yellow-500 text-white hover:bg-yellow-600"
                            : status === "Under Review"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : status === "Accepted"
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReceivedApplications;
