import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal, Button, Tooltip } from "antd";
import clsx from "clsx";
import UserApi from "../api-clients/UserApi.js";
// import Loading from "../components/loading/loading.jsx";
import { notification } from "antd";
import { T } from "@tolgee/react";
import Header from "../components/header/header.jsx";
import useLanguageToggle from "../hooks/useLanguageToggle.js";
import SplashPage from "../assets/img/SplashPage.jpg";
import AboutUs from "../assets/img/AboutUs.jpg";
import AboutUs2 from "../assets/img/AboutUs2.jpg";
import Games from "../assets/img/Games.jpg";
import Tag from "../assets/img/Tag.jpg";
import WordDash from "../assets/img/WordDash.jpg";
import Village from "../assets/img/Village.jpg";
import WordDashOverviewImg from "../assets/img/Word Dash Overview.jpg";
import WordDashGameplayImg from "../assets/img/Word Dash Gameplay.jpg";
// import WordDashVideo from "../assets/video/LTE Word Dash.mov";

function WordDashOverview() {
  const [redirect, setRedirect] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [userName, setUserName] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [userType, setUserType] = useState("Student");
  const [schoolType, setSchoolType] = useState("lg_english");
  const [trialDay, setTrialDay] = useState("1");
  const [schoolId, setSchoolId] = useState("");
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
      userType === "SGAdmin" &&
      isValidateSchoolId(event.target.schoolId.value) &&
      schoolEmail.length > 1 &&
      websiteUrl.length > 1 &&
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
        trialDay: userType === "TrialTeacher" ? trialDay : null,
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
            message: "Error",
            description: err.response.data.message,
          });
        })
        .finally(() => setLoading(false));
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
              <a href="#section1">
                <img src={WordDashOverviewImg} width="400" />
              </a>
            </div>
            <div className="col-md-6">
              <a href="#section2">
                <img src={WordDashGameplayImg} width="400" />
              </a>
            </div>
          </div>
          &nbsp;
          <div id="section1" className="text-white">
            <h1 className="text-white">Word Dash Overview</h1>
            <h2 className="text-white">Focus</h2>
            Enhance spelling and HKDSE vocabulary terms
            <div>&nbsp;</div>
            <h2 className="text-white">Concept</h2>
            The game has multiplayer and single player capabilities. Players can
            choose to collaborate in teams of up to 5 or compete against friends
            in a free-for-all. The aim of the game is to get the most points by
            answering the mystery words, collecting letters, and spelling out as
            many different words as possible. Like some word games, certain
            letters are worth more than others. This game also features the use
            of power ups that can either help you and your team, or hinder your
            opponents. This game has 3 different maps. Each pose it’s own unique
            obstacle. It also gives students the chance to learn from one
            another, see what the highest scoring words were, what mystery words
            they missed and even who scored the highest in one game. Can have up
            to 8 multiplayers in a game.
            <div>&nbsp;</div>
            <table class="table table-bordered text-white">
              <tbody>
                <tr>
                  <td>Single/Multiplayer Games</td>
                  <td>
                    <i className="bi bi-check-circle"></i>
                  </td>
                </tr>
                <tr>
                  <td>Vocabulary/Spelling</td>
                  <td>
                    <i className="bi bi-check-circle"></i>
                  </td>
                </tr>
                <tr>
                  <td>Unique Settings</td>
                  <td>
                    <i className="bi bi-check-circle"></i>
                  </td>
                </tr>
                <tr>
                  <td>Powerups</td>
                  <td>
                    <i className="bi bi-check-circle"></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-white">Teacher</h2>
            Word Dash uses analytics to provide teachers with insights into
            students' progress and performance. It tracks mystery words,
            spelling words, and mistakes made to identify areas of struggle.
            Teachers can assess overall progress through game results and
            customize settings for a tailored experience. The analytics also
            provide insights into language skills, creativity, and areas needing
            attention. By analyzing these data, teachers can scaffold learning,
            personalize instruction, and promote engagement in vocabulary for
            language development
          </div>
          <div>&nbsp;</div>
          <div id="section2">
            <h1 className="text-white">Word Dash Gameplay</h1>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/uGT46_ugoKc?si=5QOaUoO_z3BE9oXJ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

export default WordDashOverview;
