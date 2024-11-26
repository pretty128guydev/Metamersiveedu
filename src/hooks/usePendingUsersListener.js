import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNotificationContext } from "../context/NotificationContext";

function usePendingUsersListener(userInfo) {
  const [pendingCount, setPendingCount] = useState(0);
  const { showNotification } = useNotificationContext();

  useEffect(() => {
    if (!userInfo || userInfo.type !== "SPAdmin") {
      // If user is not SPAdmin, don't proceed with setting up listener
      return;
    }

    const usersCollection = collection(db, "users");
    const pendingQuery = query(usersCollection, where("status", "==", "pending"));

    let lastCount = 0; // Track the previous count

    const unsubscribe = onSnapshot(pendingQuery, (snapshot) => {
      const newCount = snapshot.docs.length;

      // Trigger notification only if the count changes
      if (newCount !== lastCount) {
        showNotification({
          type: "info",
          message: "Pending User Approvals",
          description: `There are ${newCount} users awaiting approval.`,
          duration: 10,
        });
        lastCount = newCount; // Update the last count
      }

      setPendingCount(newCount); // Update the state
    });

    return () => unsubscribe(); // Clean up listener
  }, [userInfo, showNotification]); // Add userInfo as a dependency

  return pendingCount; // Expose count for other components if needed
}

export default usePendingUsersListener;
