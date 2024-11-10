import React from "react";
import useLanguageToggle from "../../hooks/useLanguageToggle";

function Footer() {
  const { translate } = useLanguageToggle();

  return (
    <div id="footer" className="app-footer">
      &copy; {translate("footer-credit")}
    </div>
  );
}

export default Footer;
