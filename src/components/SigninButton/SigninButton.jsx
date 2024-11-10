import React from "react";
import useLanguageToggle from "../../hooks/useLanguageToggle";

const SigninButton = () => {
  const { currentLanguage, toggleLanguage } = useLanguageToggle();
  return (
    <form action="/login">
      <button
        // style={{ position: "absolute", bottom: 0, left: 0 }}
        style={{
          marginTop: '15px',
          whiteSpace: "nowrap"
        }}
        className="btn btn-outline-theme btn-lg d-block fw-500 mb-3 mr-3"
      >
        {currentLanguage === "en" ? "Sign In" : "登入"}
      </button>
    </form>
  );
};

export default SigninButton;
