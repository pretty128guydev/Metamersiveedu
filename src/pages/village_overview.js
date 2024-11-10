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
import Games from "../assets/img/Games.jpg";
import Tag from "../assets/img/Tag.jpg";
import WordDash from "../assets/img/WordDash.jpg";
import Village from "../assets/img/Village.jpg";
import VillageOverviewImg from "../assets/img/The Village Overview.jpg";
import VillageGameplayImg from "../assets/img/The Village Gameplay.jpg";

function VillageOverview() {
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
    <div className="overview text-default">
        <Header />
        <div className="overview-content">
          &nbsp;
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">{translate("return-to-home")}</a>
            </li>
          </ul>

          <div className="row overflow-hidden">
            <div className="col-md-6">
            <a href="#section1"><img src={VillageOverviewImg} width="400"/></a>
            </div>
            <div className="col-md-6">
              <a href="#section2"><img src={VillageGameplayImg} width="400"/></a>
            </div>
          </div>

          &nbsp;
          <div id="section1" className="text-white">
            <h1 className="text-white">The Village Overview</h1>
            <h2 className="text-white">Focus</h2>
            Enhance listening, reading, speaking and writing abilities of students for the HKDSE at their own pace at home and in school
            <div>&nbsp;</div>

            <h2 className="text-white">Concept</h2>
            This game focuses on teaching kids some of the best practices and skills when taking examinations. It features over 40 learning videos that given students autonomy and ownership to equip themselves with the skills to bump their listening, reading, speaking and writing abilities. Students can then put their skills into practice by doing the skill drills specific to these different disciplines, earning Lumen Dollars every time they do. The money can be used to upgrade their homes with new furniture, open up new rooms and many more!
            <div>&nbsp;</div>

            <table class="table table-bordered text-white">
              <tbody>
                <tr>
                  <td>Single/Multiplayer Games</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
                <tr>
                  <td>4 Content Areas</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
                <tr>
                  <td>Sandbox Style</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
                <tr>
                  <td>Self-paced & Student Centric</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-white">Teacher</h2>
            The Village enables analytics to provide teachers with insights into student progress and engagement in a wider array of language development. It tracks proficiency levels in 4 main areas, points earned across content, question analysis, engagement levels, and preferred learning styles. These analytics inform instructional strategies, identify areas for improvement, and personalize support to enhance student learning and motivation.
          </div>

          <div>&nbsp;</div>
          <div id="section2">
            <h1 className="text-white">The Village Gameplay</h1>
            <video width="800px" height="800px" controls="controls">
              <source src="https://metamersive.com/wp-
                          content/uploads/20231020155223/Full-Stack-Development-_-
                          LIVE-Classes-_-GeeksforGeeks.mp4" type="video/mp4" />
             </video>
          </div>

        </div>
      </div>
    </>
  );
}

export default VillageOverview;
