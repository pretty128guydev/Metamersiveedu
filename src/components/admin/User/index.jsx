import React from "react";
import useLanguageToggle from "../../../hooks/useLanguageToggle";

const UserManagement = () => {
  const { translate } = useLanguageToggle();

  return (
    <div className="user-management">
      <h6>{translate("user-management-text")}</h6>
    </div>
  );
};

export default UserManagement;