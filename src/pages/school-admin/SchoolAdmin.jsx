import React, { useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";

import { AdminAPI } from "../../api-clients/AdminApi";

const SchoolAdmin = () => {
  const userInfo = useSelector((store) => store.auth.userInfo);
  const { schoolId } = userInfo;
  const [limits, setLimits] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLimits = async () => {
      try {
        const response = await AdminAPI.getSchoolLimits({ schoolId });
        setLimits(response.data);
      } catch (error) {
        setMessage("An error occurred while fetching limits.");
      }
    };

    fetchLimits();
  }, []);

  const sendRequest = async (requestType) => {
    try {
      const response = await AdminAPI.sendRequest({
        schoolId,
        requestType,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response
          ? error.response.data.message
          : "An error occurred while sending the request."
      );
    }
  };

  return (
    <div>
      <h2>Current Limits</h2>
      <p>Max Students: {limits.maxStudents || "N/A"}</p>
      <p>Current Student Count: {limits.currentStudentCount || "N/A"}</p>
      <p>
        Limited Date:{" "}
        {limits.limitedDate
          ? new Date(limits.limitedDate).toLocaleDateString()
          : "N/A"}
      </p>

      <h4>Send Request</h4>
      <button
        className="btn btn-outline-info me-1"
        onClick={() => sendRequest("extend-students")}
      >
        Extend Student Limit
      </button>
      <button
        className="btn btn-outline-info"
        onClick={() => sendRequest("extend-date")}
      >
        Extend Limited Date
      </button>

      {message && (
        <div class="alert alert-danger w-auto mt-2" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default SchoolAdmin;
