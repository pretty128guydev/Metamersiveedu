import React from "react";
import useLanguageToggle from "../../hooks/useLanguageToggle";

const LanguageButton = () => {
  const { currentLanguage, toggleLanguage } = useLanguageToggle();
  return (
    <button
      // style={{ position: "absolute", bottom: 0, left: 0 }}
      style={{
        marginTop: '15px',
        whiteSpace: "nowrap"
      }}
      onClick={() => toggleLanguage()}
      className="btn btn-outline-theme btn-lg d-block fw-500 mb-3 mr-3"
    >
      <i className="bi bi-globe ms-auto text-theme fs-16px my-n1"></i>&nbsp; 
      {currentLanguage === "en" ? "中文" : "English"}
    </button>
  );
};

export default LanguageButton;
