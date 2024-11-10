import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "./../components/card/card.jsx";
import useLanguageToggle from "../hooks/useLanguageToggle.js";

function PagesError() {
  const navigate = useNavigate();
  const { translate } = useLanguageToggle();

  function handleBackBtn() {
    navigate(-1);
  }

  return (
    <div className="error-page">
      <div className="error-page-content">
        <Card className="mb-5 mx-auto" style={{ maxWidth: "320px" }}>
          <CardBody>
            <Card>
              <div className="error-code">404</div>
            </Card>
          </CardBody>
        </Card>
        <h1>{translate("oops")}!</h1>
        <h3>{translate("error-title")}</h3>
        <hr />
        <p className="mb-1">{translate("error-sub-title")}:</p>
        <p className="mb-5">
          <Link
            to="/"
            className="text-decoration-none text-primary text-opacity-50"
          >
            {translate("home")}
          </Link>
          <span className="link-divider"></span>
          <Link
            to="/class/romeo"
            className="text-decoration-none text-primary text-opacity-50"
          >
            {translate("romeo-and-juliet")}
          </Link>
        </p>
        <button
          onClick={handleBackBtn}
          className="btn btn-outline-theme px-3 rounded-pill"
        >
          <i className="fa fa-arrow-left me-1 ms-n1"></i> {translate("go-back")}
        </button>
      </div>
    </div>
  );
}

export default PagesError;
