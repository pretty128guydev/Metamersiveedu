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
import TagOverviewImg from "../assets/img/Tag Overview.jpg";
import TagGameplayImg from "../assets/img/Tag Gameplay.jpg";
// import TagVideo from "../assets/video/LTE Tag_V2.mp4";

function TagOverview() {
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
    <div className="overview ">
        <Header />
        <div className="overview-content text-default">
          &nbsp;
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">{translate("return-to-home")}</a>
            </li>
          </ul>
 
          <div className="row overflow-hidden">
            <div className="col-md-6">
            <a href="#section1"><img src={TagOverviewImg} width="400"/></a>
            </div>
            <div className="col-md-6">
              <a href="#section2"><img src={TagGameplayImg} width="400"/></a>
            </div>
          </div>

          &nbsp;
          <div id="section1" className="text-white">
            <h1 className="text-white">Tag Overview</h1>
            <div>&nbsp;</div>
            <h2 className="text-white">Focus</h2>
            Enhance reading and vocabulary by practicing 2,300 HKDSE centric vocabulary terms through pictures, symbols, fill in the blanks and MCQ
            <div>&nbsp;</div>

            <h2 className="text-white">Concept</h2>
            The game has multiplayer and single player capabilities. The game runs like a children’s game of freeze tag. The tagger’s aim is to catch as many people as possible. The other players aim to beat the tagger by finishing their 3 builds before the timer runs out. Each player selects a character with a specific ability to use throughout that round. The game has multiple maps and levels of difficulty to let students play at a level that challenges them. Can have up to 8 multiplayers in a game.
            <div>&nbsp;</div>
            
            <table class="table table-bordered text-white">
              <tbody>
                <tr>
                  <td>Single/Multiplayer Games</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
                <tr>
                  <td>Reading Targeted</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
                <tr>
                  <td>Unique Settings</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
                <tr>
                  <td>Powerups</td>
                  <td><i className="bi bi-check-circle"></i></td>
                </tr>
              </tbody>
            </table>
            <h2 className="text-white">Teacher</h2>
            TAG allows analytics to provide teachers with valuable insights into student performance and engagement in other areas of language development. The analytics include accuracy of answers, tracking the number of games played, question difficulty, and individual student performance. These analytics enable teachers to assess engagement, tailor instruction, identify areas for improvement to support student growth.      
            </div>

            <div>&nbsp;</div>
            <div id="section2">
              <h1 className="text-white">Tag Gameplay</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/YocegAEtGGg?si=ZTXit3sTh4mDPfnd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </div>
      </div>
    </>
  );
}

export default TagOverview;
