import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal, Button, Tooltip } from 'antd';
import clsx from "clsx";
import UserApi from "../api-clients/UserApi.js";
// import Loading from "../components/loading/loading.jsx";
import { notification } from "antd";
import { T } from "@tolgee/react";
import Header from '../components/header/header.jsx';
import useLanguageToggle from "../hooks/useLanguageToggle.js";
import SplashPage from "../assets/img/SplashPage.jpg";
import AboutUs from "../assets/img/AboutUs.jpg";
import AboutUs2 from "../assets/img/AboutUs2.jpg";
import OurProjects from "../assets/img/Our Projects.jpg";
import Games from "../assets/img/Games.jpg";
import Tag from "../assets/img/Tag.jpg";
import WordDash from "../assets/img/WordDash.jpg";
import Village from "../assets/img/Village.jpg";

function Landing() {
  const [redirect, setRedirect] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userName, setUserName] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolEmail, setSchoolEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [userType, setUserType] = useState("Student");
  const [schoolType, setSchoolType] = useState('lg_english');
  const [trialDay, setTrialDay] = useState('1');
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(false);
  const { translate } = useLanguageToggle();

  const isValidate = (arg0) => {
    if (arg0 === "") {
      return false;
    }
    return true;
  };

  const isValidateSchoolId = (schoolId) => {
    const regex = /^[A-Z]{3}-..$/;
    return regex.test(schoolId);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const name = event.target.userName.value;
    const email = event.target.userEmail.value;

    setUserName(name);
    setUserEmail(email);

    if (
      isValidate(name) &&
      isValidate(email) &&
      (userType === 'SGAdmin' && isValidateSchoolId(event.target.schoolId.value) && schoolEmail.length > 1 && websiteUrl.length > 1) &&
      userPassword === confirmPassword
    ) {
      setLoading(true);

      const body = {
        name: name,
        schoolId,
        schoolType,
        email: email,
        password: userPassword,
        type: userType,
        schoolEmail,
        websiteUrl,
        trialDay: userType === 'TrialTeacher' ? trialDay : null,
      };

      UserApi.register(body)
        .then((_res) => {
          notification.success({
            message: <T keyName="success_registered" />,
            description: <T keyName="please_check_inbox" />,
          });
          setRedirect(true);
        })
        .catch((err) => {
          notification.error({
            message: 'Error',
            description: err.response.data.message,
          });
        }).finally(() => setLoading(false));
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="landing">
        <Header />
        <div className="landing-content">
        <div className="overflow-hidden">
                <img src={SplashPage}/>
        </div>
        <div className="overflow-hidden">
                <img src={AboutUs}/>
        </div>
        <div className="overflow-hidden">
                <img src={AboutUs2}/>
        </div>
        <div className="overflow-hidden">
                <img src={OurProjects}/>
        </div>
        <div className="row overflow-hidden">
          <div className="col-md-4">
            <a href="tag_overview"><img src={Tag}/></a>
          </div>
          <div className="col-md-4">
            <a href="worddash_overview"><img src={WordDash}/></a>
          </div>
          <div className="col-md-4">
            <a href="village_overview"><img src={Village}/></a>
          </div>
        </div>

    </div>
  </div>
    </>
  );
}

export default Landing;
