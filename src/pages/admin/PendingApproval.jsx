import { useState, useEffect } from "react";
import { db } from "../../config/firebase"; // Firestore configuration
import { collection, query, where, onSnapshot } from "firebase/firestore"; // Modular Firestore imports
import UserApi from "../../api-clients/UserApi";
import { useNotificationContext } from "../../context/NotificationContext";
import useLanguageToggle from "../../hooks/useLanguageToggle";
import "./pendingApproval.scss";

function AdminPanel() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingCount, setPendingCount] = useState(0); // Track count of pending users
  const [lastCount, setLastCount] = useState(0); // Track previous count to avoid redundant notifications
  const { showNotification } = useNotificationContext();
  // const navigate = useNavigate();
  const { translate } = useLanguageToggle();

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const pendingQuery = query(
      usersCollection,
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(pendingQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingUsers(users);

      // Update the count of pending users
      const newCount = users.length;
      setPendingCount(newCount);

      // Show notification if the count changes
      // if (newCount !== lastCount) {
      //   showNotification({
      //     type: "info",
      //     message: "Pending Approvals",
      //     description: `There are ${newCount} users waiting for your approval.`,
      //     duration: 10, // Optional: duration in seconds
      //   });

      //   setLastCount(newCount); // Update the last count
      // }
    });

    return () => unsubscribe();
  }, [db, lastCount, showNotification]);

  const handleApproval = async (userId, action) => {
    try {
      const classData = await UserApi.approveUser({
        userId: userId,
        action: action,
      });
      console.log(classData);
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mt-3 text-end mb-3">
        <a href="/home" className="btn btn-outline-info btn-lg">
          <i className="bi bi-arrow-left me-2"></i> Go Back
        </a>
      </div>
      <div className="row justify-content-center container">
        <div className="col-md-10">
          <div className="card shadow-lg">
            <div className="card-header bg-danger text-white text-center">
              <h3 className="mb-0">Pending User Approvals</h3>
            </div>
            <div className="card-body">
              {pendingUsers.length > 0 ? (
                <div className="list-group">
                  {pendingUsers.map((user) => (
                    <div
                      key={user.id}
                      className="list-group-item p-4 d-flex justify-content-between align-items-center shadow-sm rounded"
                      style={{
                        animation: "fadeIn 0.3s ease-in-out",
                      }}
                    >
                      <div>
                        <h5 className="fw-bold mb-1">{user.name}</h5>
                        <p className="mb-1 text-muted">
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p className="mb-0 text-muted">
                          <strong>School ID:</strong> {user.schoolId}
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-success btn-sm me-2 d-flex align-items-center mb-1"
                          onClick={() => handleApproval(user.id, "approve")}
                          style={{ minWidth: "100px" }}
                        >
                          <i className="bi bi-check-circle me-2"></i> Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm d-flex align-items-center"
                          onClick={() => handleApproval(user.id, "deny")}
                          style={{ minWidth: "100px" }}
                        >
                          <i className="bi bi-x-circle me-2"></i> Deny
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-center text-muted p-4"
                  style={{ animation: "fadeIn 0.5s ease-in-out" }}
                >
                  <i className="bi bi-people-fill fs-1 mb-3"></i>
                  <p className="mb-0">No pending users</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
