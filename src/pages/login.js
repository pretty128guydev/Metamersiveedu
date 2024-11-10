import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import validator from "validator";
import { Input, Modal } from "antd";
import UserApi from "../api-clients/UserApi.js";
// import { AdminAPI } from "../api-clients/AdminApi.js";
import Loading from "../components/loading/loading.jsx";
import clsx from 'clsx';
import { useDispatch } from "react-redux";
import { authActions } from "../redux-store/auth";
import { useSelector } from "react-redux";
import { notification } from "antd";
import useLanguageToggle from "../hooks/useLanguageToggle.js";

function PagesLogin() {
  const { login } = authActions;
  const [schoolId, setSchoolId] = useState('');
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const { translate } = useLanguageToggle();

  const [visible, setVisible] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [forgotLoading, setForogtLoading] = useState(false);
  // const [schoolData, setSchoolData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      setRedirect(true);
    }

    // setLoading(true);
    // AdminAPI.getSchools({}).then(data => {
    //   setSchoolData(data.data);
    // }).catch(err => notification.error({
    //   message: 'Error',
    //   description: err.message,
    // })).finally(() => setLoading(false));

    // eslint-disable-next-line
  }, []);

  const isValidateSchoolId = (schoolId) => {
    const regex = /^[A-Z]{3}-..$/;
    return regex.test(schoolId);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.userEmail.value;
    const password = event.target.userPassword.value;
    const schoolId = event.target.schoolId ? event.target.schoolId.value : null;

    const body = {
      email,
      password,
      schoolId,
    };

    setLoading(true);

    UserApi.login(body)
      .then((res) => {
        console.log('d:', res.data);
        dispatch(login(res.data));
        setRedirect(true);
      })
      .catch((err) => {
        notification.warning({
          message: 'Error',
          description: err.response.data.message,
        });
      }).finally(() => setLoading(false));
  }

  // const resendVerifiationEmail = () => {
  //   UserApi.sendVerificationEmail({}).then(data => {
  //     notification.success({
  //       message: 'Success',
  //       description: 'Verification email has successfully sent, Check your inbox'
  //     });
  //   }).catch(err => {
  //     notification.error({
  //       message: 'Error',
  //       description: err.response.data.message,
  //     });
  //   })
  // };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  const handleForgotPassword = () => {
    console.log('forgot pasword');
    if (validator.isEmail(email)) {
      setForogtLoading(true);
      UserApi.forgotPassword({ email }).then(data => {
        notification.success({
          message: 'Success',
          description: 'Please Check your inbox, password reset mail has sent to your email address',
        });
      }).catch(err => notification.error({
        message: 'Error',
        description: err.response.data.message,
      })).finally(() => setForogtLoading(false));
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="login">
          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center">{translate("login")}</h1>
              <div className="text-primary text-opacity-50 text-center mb-4">
                <p keyName="verify_identity">{translate("login-title")}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  School ID (3 Initials and 2 Combinations) <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={schoolId}
                  className={clsx({
                    "form-control form-control-lg bg-white bg-opacity-5": true,
                    "is-invalid": !isValidateSchoolId(schoolId),
                  })}
                  placeholder="e.g MEY-@1"
                  id="schoolId"
                  onChange={e => setSchoolId(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {translate("email-address")}{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg bg-white bg-opacity-5"
                  placeholder=""
                  id="userEmail"
                />
              </div>
              <div className="mb-3">
                <div className="d-flex">
                  <label className="form-label">
                    {translate("password")}{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <span
                    onClick={() => setVisible(true)}
                    className="ms-auto text-primary text-decoration-none text-opacity-50 bg-transparent border-none"
                    style={{ cursor: 'pointer' }}
                  >
                      {translate("forgot-password")}?
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control form-control-lg bg-white bg-opacity-5"
                  placeholder=""
                  id="userPassword"
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="customCheck1"
                  />
                  <label className="form-check-label" htmlFor="customCheck1">
                    {translate("remember-me")}
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3"
              >
                {translate("sign-in")}
              </button>
              {/* <button
                type="button"
                className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3"
                onClick={resendVerifiationEmail}
              >
                Resend Verification Email
              </button> */}
              <div className="text-center text-primary text-opacity-50">
                  {translate("dont-have-account")}?
                {" "}
                <Link to="/register">
                  {translate("sign-up")}
                </Link>
                .
              </div>
            </form>
          </div >
        </div >
      )
      }
      <Modal
        open={visible}
        title={
          <p keyName="forgot_password">"{translate("forgot-password")}?"</p>
        }
        confirmLoading={forgotLoading}
        okText="OK"
        cancelText="Cancel"
        onCancel={() => setVisible(false)}
        onOk={handleForgotPassword}
      >
        <p>{translate("input-email-address-here")}:</p>
        <Input onChange={e => setEmail(e.target.value)} value={email} />
        {
          email !== '' && !validator.isEmail(email) &&
          <div className="text-red mt-1"><p keyName="enter_valid_addr">{translate("enter-valid-email-address")}</p></div>
        }
      </Modal>
    </>
  );
}

export default PagesLogin;
