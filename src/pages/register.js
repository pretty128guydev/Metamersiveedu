import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Modal, Button, Tooltip } from "antd";
import clsx from "clsx";
import UserApi from "../api-clients/UserApi.js";
// import Loading from "../components/loading/loading.jsx";
import { notification } from "antd";
import { T } from "@tolgee/react";
import useLanguageToggle from "../hooks/useLanguageToggle.js";
import { useNotificationContext } from "../context/NotificationContext.js";
import "antd/dist/reset.css";

function PagesRegister() {
  const [api, contextHolder] = notification.useNotification();
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
  const { showNotification } = useNotificationContext();

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
      (isValidate(name) &&
        isValidate(email) &&
        userType !== "SGAdmin" &&
        isValidateSchoolId(event.target.schoolId.value) &&
        userPassword === confirmPassword) ||
      (isValidate(name) &&
        isValidate(email) &&
        userType === "SGAdmin" &&
        isValidateSchoolId(event.target.schoolId.value) &&
        schoolEmail.length > 1 &&
        websiteUrl.length > 1 &&
        userPassword === confirmPassword)
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
          // Show success notification
          // await api.success({
          //   message: <T keyName="success_registered" />,
          //   // description: <T keyName="please_check_inbox" />,
          // });

          // // Notify about pending status
          // await api.info({
          //   message: "Registration Pending",
          //   description:
          //     "Your registration is complete. Your account is now pending approval. Please wait for the admin to approve your account.",
          //   duration: 10, // Notification visible for 10 seconds
          // });

          // Delay the redirect to allow notifications to show

          // Show success notification
          // showNotification({
          //   type: "success",
          //   message: "Registration Successful",
          //   // description: "Please check your inbox to confirm your email.",
          //   duration: 5,
          //   persistent: true, // Ensures it persists after redirection
          // });

          showNotification({
            type: "success",
            message: "Registration Pending",
            description: "Your registration is complete. Your account is now pending approval. Please wait for the admin to approve your account.",
            duration: 15,
            // persistent: true, // Ensures it persists after redirection
          });
          setRedirect(true);
        })
        .catch((err) => {
          api.error({
            message: "Error",
            description: err.response.data.message,
          });
        })
        .finally(() => setLoading(false));
    } else {
      api.warning({
        message: "Warning",
        description: "Please input all required fields.",
      });
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {contextHolder}
      <div className="register">
        <div className="register-content">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center">
              {/* <T keyName={translate("signup")} /> */}
              Sign Up
            </h1>
            <p className="text-primary text-opacity-50 text-center">
              {/* <T keyName={translate("congrats")} /> */}
              Congratulations on taking the first step on a long journey with
              Metamersive.
            </p>
            <div className="mb-3">
              <label className="form-label">
                <T keyName={translate("name")} />{" "}
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={clsx({
                  "form-control form-control-lg bg-white bg-opacity-5": true,
                  "is-invalid": userName === "",
                })}
                placeholder="e.g John Smith"
                id="userName"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <T keyName={translate("email-address")} />{" "}
                <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={clsx({
                  "form-control form-control-lg bg-white bg-opacity-5": true,
                  "is-invalid": userEmail === "",
                })}
                placeholder="username@address.com"
                id="userEmail"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                {translate("password")}{" "}
                <span className="text-danger">
                  {translate("atleast-6-characters")} *
                </span>
              </label>
              <input
                type="password"
                className={clsx({
                  "form-control form-control-lg bg-white bg-opacity-5": true,
                  "is-invalid": userPassword.length < 6,
                })}
                id="userPassword"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                {translate("confirm-password")}{" "}
                <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className={clsx({
                  "form-control form-control-lg bg-white bg-opacity-5": true,
                  "is-invalid": confirmPassword !== userPassword,
                })}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                {translate("type")}
                <span className="text-danger">*</span>
              </label>
              <select
                className="form-select form-select-lg bg-white bg-opacity-5"
                value={userType}
                onChange={(e) => {
                  setUserType(e.target.value);

                  if (e.target.value === "SGAdmin") {
                    Modal.info({
                      title: "About School Group Admin",
                      content: (
                        <>
                          <p>
                            School Group Admin has the maximum privilege of the
                            school. He can set principal teachers who has top
                            authority in app for each apps. If you are the
                            manager of the school or headmaster, you can sign up
                            as a school group admin
                          </p>
                        </>
                      ),
                    });
                  } else if (e.target.value === "TrialTeacher") {
                    Modal.info({
                      title: "About Trial Teacher",
                      content: (
                        <>
                          <p>
                            You can test all the essential functions as a trial
                            teacher once you are approved.
                          </p>
                        </>
                      ),
                    });
                  }
                }}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="SGAdmin">School Admin</option>
                <option value="TrialTeacher">Trial Teacher</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                School ID:{" "}
                <span className="text-danger">
                  3 Initials and 2 Combinators*
                </span>
              </label>
              <Tooltip
                title={
                  <p>
                    First School ID must starts with 3 english letters,
                    Following '-' And 2 random characters including numbers,
                    letters, symbols.
                    <br />
                    i.e: SMG-1X, CGC-05, CHC-1%
                    <br />
                    This school ID is used for identifying your school
                    information.
                    <br />
                    If you are School Admin / HeadMaster, then you can write
                    your own school ID,
                    <br />
                    If you are teacher or student, you should get school ID from
                    your school admin.
                    <br />
                  </p>
                }
                color="volcano"
                placement="bottom"
              >
                <input
                  type="text"
                  className={clsx({
                    "form-control form-control-lg bg-white bg-opacity-5": true,
                    "is-invalid": !isValidateSchoolId(schoolId),
                  })}
                  value={schoolId}
                  onChange={(e) => setSchoolId(e.target.value)}
                  placeholder="e.g MEY-@1"
                  id="schoolId"
                />
              </Tooltip>
              <span></span>
            </div>
            {userType === "SGAdmin" && (
              <>
                <div>
                  <div className="mb-3">
                    <label className="form-label">
                      School Language <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-select-lg bg-white bg-opacity-5"
                      value={schoolType}
                      onChange={(e) => setSchoolType(e.target.value)}
                    >
                      <option value="lg_chinese">Chinese</option>
                      <option value="lg_english">English</option>
                      <option value="lg_other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    School Email<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={clsx({
                      "form-control form-control-lg bg-white bg-opacity-5": true,
                      "is-invalid": schoolEmail.length <= 0,
                    })}
                    id="schoolEmail"
                    placeholder="mtm@edu.hk"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Your School Website URL
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="url"
                    className={clsx({
                      "form-control form-control-lg bg-white bg-opacity-5": true,
                      "is-invalid": websiteUrl.length <= 0,
                    })}
                    id="websiteUrl"
                    value={websiteUrl}
                    placeholder="https://school.com"
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                  />
                </div>
              </>
            )}
            {userType === "TrialTeacher" && (
              <div>
                <div className="mb-3">
                  <label className="form-label">
                    Select Period <span className="text-danger">*</span>
                  </label>
                  <select
                    id="trialDay"
                    className="form-select form-select-lg bg-white bg-opacity-5"
                    value={trialDay}
                    onChange={(e) => setTrialDay(e.target.value)}
                  >
                    <option value="1">1 Day</option>
                    <option value="3">3 Day</option>
                  </select>
                </div>
              </div>
            )}
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="customCheck1"
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  value={agreeTerms}
                />
                <label className="form-check-label" htmlFor="customCheck1">
                  {translate("tnc")}{" "}
                  <a href="#/">{translate("terms-of-use")}</a>{" "}
                  {translate("and")}{" "}
                  <a href="#/">{translate("privacy-policy")}</a>.
                </label>
              </div>
            </div>
            <div className="mb-3">
              <Button
                htmlType="submit"
                className="btn btn-outline-theme btn-lg d-block w-100"
                disabled={!agreeTerms}
                loading={loading}
              >
                {translate("sign-up")}
              </Button>
            </div>
            <div className="text-primary text-opacity-50 text-center">
              {translate("already-have-an-account")}?{" "}
              <Link to="/login">{translate("sign-in")}</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PagesRegister;
