import React, { useState, useEffect } from "react";

import "./home.scss";
import { AdminAPI } from "../../api-clients/AdminApi";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await AdminAPI.getRequests();
        setRequests(response.data);
      } catch (error) {
        setMessage("An error occurred while fetching requests.");
      }
    };

    fetchRequests();
  }, []);

  const approveRequest = async (requestId) => {
    try {
      const response = await AdminAPI.approveRequest({
        requestId,
      });
      setMessage(response.data.message);
      setRequests(requests.filter((request) => request.id !== requestId));
    } catch (error) {
      setMessage("An error occurred while approving the request.");
    }
  };

  return (
    <div className="admin-home">
      <div className="header">
        <div className="info">
          <h3>Welcome To Admin Page</h3>
        </div>
      </div>
      <div className="">
        <h5>Pending Requests</h5>
        {requests.length > 0 ? (
          <ul>
            {requests.map((request) => (
              <li className="border p-2 " key={request.id}>
                <p>School ID: {request.schoolId}</p>
                <p>Request Type: {request.requestType}</p>
                <button onClick={() => approveRequest(request.id)}>
                  Approve
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending requests.</p>
        )}
        {message && (
          <div class="alert alert-danger w-auto mt-2" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRequests;
