import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux-store/auth";
import {
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import useLanguageToggle from "../../hooks/useLanguageToggle";
import LanguageButton from "../LanguageButton/LanguageButton";
import SigninButton from "../SigninButton/SigninButton";

function Header() {
  const notificationData = [];
  const { logout } = authActions;
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.auth.userInfo);
  const { translate } = useLanguageToggle();
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  /*
  {
    "icon": "bi bi-bag text-theme",
    "title": "NEW ORDER RECEIVED ($1,299)",
    "time": "JUST NOW"
  }
  */
  const toggleAppSidebarDesktop = () => {
    var elm = document.querySelector(".app");
    elm.classList.toggle("app-sidebar-collapsed");
  };

  const toggleAppSidebarMobile = () => {
    var elm = document.querySelector(".app");
    elm.classList.toggle("app-sidebar-mobile-toggled");
  };

  const toggleAppHeaderSearch = () => {
    var elm = document.querySelector(".app");
    elm.classList.toggle("app-header-menu-search-toggled");
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.replace("/landing");
  };

  return (
    <div id="header" className="app-header">
      <div className="desktop-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarDesktop}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div className="mobile-toggler">
        <button
          type="button"
          className="menu-toggler"
          onClick={toggleAppSidebarMobile}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      <div
        className={`brand ${
          isLoggedIn && userInfo.schoolData && userInfo.schoolData.isTrial
            ? "trial"
            : "normal"
        }`}
      >
        <Link to="/" className="brand-logo">
          <span className="brand-img">
            <span className="brand-img-text text-theme">M</span>
          </span>
          <span className="brand-text me-4">{translate("metamersive")}</span>
          {/* <span className="badge bg-success">Beta</span> */}

          {/* <LanguageButton /> */}
        </Link>
      </div>

      {!isLoggedIn && (
        <div className="menu">
          <SigninButton />
        </div>
      )}

      {isLoggedIn && (
        <div className="menu">
          {/* <div className="menu-item dropdown">
          <a href="#/" onClick={toggleAppHeaderSearch} className="menu-link">
            <div className="menu-icon">
              <i className="bi bi-search nav-icon"></i>
            </div>
          </a>
        </div> */}
          {/* <div className="menu-item dropdown dropdown-mobile-full">
            <a
              href="#/"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              className="menu-link"
            >
              <div className="menu-icon">
                <i className="bi bi-grid-3x3-gap nav-icon"></i>
              </div>
            </a>
            <div className="dropdown-menu fade dropdown-menu-end w-300px text-center p-0 mt-1">
              <div className="row row-grid gx-0">
                <div className="col-4">
                  <Link
                    to="/email/inbox"
                    className="dropdown-item text-decoration-none p-3 bg-none"
                  >
                    <div className="position-relative">
                      <i className="bi bi-circle-fill position-absolute text-theme top-0 mt-n2 me-n2 fs-6px d-block text-center w-100"></i>
                      <i className="bi bi-envelope text-theme h2 opacity-5 d-block my-1"></i>
                    </div>
                    <div className="fw-500 fs-10px text-primary">
                      {translate("inbox")}
                    </div>
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    to="/pos/customer-order"
                    className="dropdown-item text-decoration-none p-3 bg-none"
                  >
                    <div>
                      <i className="bi bi-hdd-network text-theme h2 opacity-5 d-block my-1"></i>
                    </div>
                    <div className="fw-500 fs-10px text-primary">
                      {translate("pos-system")}
                    </div>
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    to="/calendar"
                    className="dropdown-item text-decoration-none p-3 bg-none"
                  >
                    <div>
                      <i className="bi bi-calendar4 text-theme h2 opacity-5 d-block my-1"></i>
                    </div>
                    <div className="fw-500 fs-10px text-primary">
                      {translate("calendar")}
                    </div>
                  </Link>
                </div>
              </div>
              <div className="row row-grid gx-0">
                <div className="col-4">
                  <Link
                    to="/helper"
                    className="dropdown-item text-decoration-none p-3 bg-none"
                  >
                    <div>
                      <i className="bi bi-terminal text-theme h2 opacity-5 d-block my-1"></i>
                    </div>
                    <div className="fw-500 fs-10px text-primary">
                      {translate("helper")}
                    </div>
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    to="/settings"
                    className="dropdown-item text-decoration-none p-3 bg-none"
                  >
                    <div className="position-relative">
                      <i className="bi bi-circle-fill position-absolute text-theme top-0 mt-n2 me-n2 fs-6px d-block text-center w-100"></i>
                      <i className="bi bi-sliders text-theme h2 opacity-5 d-block my-1"></i>
                    </div>
                    <div className="fw-500 fs-10px text-primary">
                      {translate("settings")}
                    </div>
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    to="/widgets"
                    className="dropdown-item text-decoration-none p-3 bg-none"
                  >
                    <div>
                      <i className="bi bi-collection-play text-theme h2 opacity-5 d-block my-1"></i>
                    </div>
                    <div className="fw-500 fs-10px text-primary">
                      {translate("widgets")}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="menu-item dropdown dropdown-mobile-full">
            <a
              href="#/"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              className="menu-link"
            >
              <div className="menu-icon">
                <i className="bi bi-bell nav-icon"></i>
              </div>
              <div className="menu-badge bg-theme"></div>
            </a>
            <div className="dropdown-menu dropdown-menu-end mt-1 w-300px fs-11px pt-1">
              <h6 className="dropdown-header fs-10px mb-1">
                {translate("notifications")}
              </h6>
              <div className="dropdown-divider mt-1"></div>
              {notificationData.length > 0 ? (
                notificationData.map((notification, index) => (
                  <a
                    href="#/"
                    key={index}
                    className="d-flex align-items-center py-10px dropdown-item text-wrap"
                  >
                    <div className="fs-20px">
                      <i className={notification.icon}></i>
                    </div>
                    <div className="flex-1 flex-wrap ps-3">
                      <div className="mb-1 text-primary">
                        {notification.title}
                      </div>
                      <div className="small">{notification.time}</div>
                    </div>
                    <div className="ps-2 fs-16px">
                      <i className="bi bi-chevron-right"></i>
                    </div>
                  </a>
                ))
              ) : (
                <div className="dropdown-notification-item p-3 text-center">
                  {translate("no-record-found")}
                </div>
              )}
              <hr className="bg-white-transparent-5 mb-0 mt-2" />
              <div className="py-10px mb-n2 text-center">
                <a href="#/" className="text-decoration-none fw-bold">
                  {translate("see-all")}
                </a>
              </div>
            </div>
          </div> */}
          <div className="menu-item dropdown dropdown-mobile-full schoolname">
            <div className="menu-text d-sm-block d-none">
              {isLoggedIn
                ? userInfo.type == "SPAdmin"
                  ? "Super Admin"
                  : `${userInfo.schoolId}`
                : ""}
            </div>
          </div>
          <div className="menu-item dropdown dropdown-mobile-full">
            <a
              href="#/"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              className="menu-link"
            >
              <div className="menu-img online">
                <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-white bg-opacity-25 text-primary text-opacity-50 rounded-circle overflow-hidden">
                  <i className="bi bi-person-fill fs-32px mb-n3"></i>
                </div>
              </div>
              <div className="menu-text d-sm-block d-none">
                {isLoggedIn ? `${userInfo.name} : ${userInfo.email}` : ""}
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
              {/* {isLoggedIn && userInfo.sgAdmin && (
                <Link
                  to="/sg-admin"
                  className="text-primary dropdown-item d-flex align-items-center"
                >
                  {translate("school-group-admin")}{" "}
                  <UsergroupAddOutlined className="text-theme fs-16px ms-auto" />
                </Link>
              )} */}
              {isLoggedIn &&
                userInfo.ptAdmin &&
                Object.keys(userInfo.ptAdmin)
                  .map((key) => userInfo.ptAdmin[key])
                  .some((item) => item === true) && (
                  <Link
                    to="/pt-admin"
                    className="text-primary dropdown-item d-flex align-items-center"
                  >
                    {translate("principal-teacher")}{" "}
                    <UsergroupDeleteOutlined className="text-theme fs-16px ms-auto" />
                  </Link>
                )}
              {isLoggedIn && userInfo.email === "kh@aloestreeltd.com" && (
                <Link
                  to="/admin"
                  className="text-primary dropdown-item d-flex align-items-center"
                >
                  Admin Page
                  <SolutionOutlined className="text-theme fs-16px ms-auto" />
                </Link>
              )}
              {/* <Link
                to="/profile"
                className="text-primary dropdown-item d-flex align-items-center"
              >
                {translate("profile")}{" "}
                <i className="bi bi-person-circle ms-auto text-theme fs-16px my-n1"></i>
              </Link>
              <Link
                to="/email/inbox"
                className="text-primary dropdown-item d-flex align-items-center"
              >
                {translate("inbox")}{" "}
                <i className="bi bi-envelope ms-auto text-theme fs-16px my-n1"></i>
              </Link>
              <Link
                to="/calendar"
                className="text-primary dropdown-item d-flex align-items-center"
              >
                {translate("calendar")}{" "}
                <i className="bi bi-calendar ms-auto text-theme fs-16px my-n1"></i>
              </Link>
              <Link
                to="/settings"
                className="text-primary dropdown-item d-flex align-items-center"
              >
                {translate("settings")}{" "}
                <i className="bi bi-gear ms-auto text-theme fs-16px my-n1"></i>
              </Link>
              <div className="dropdown-divider"></div> */}
              <div
                className="text-primary dropdown-item d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                {isLoggedIn &&
                  userInfo.type === "Teacher" &&
                  translate("teacher")}
                {isLoggedIn &&
                  userInfo.type === "Student" &&
                  translate("student")}
                {isLoggedIn &&
                  userInfo.type === "SPAdmin" &&
                  translate("Super Admin")}
                {isLoggedIn &&
                  userInfo.type === "SGAdmin" &&
                  translate("School Admin")}
              </div>
              <div
                className="text-primary dropdown-item d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                {translate("logout")}{" "}
                <i className="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i>
              </div>
            </div>
          </div>
        </div>
      )}

      <form className="menu-search" method="POST" name="header_search_form">
        <div className="menu-search-container">
          <div className="menu-search-icon">
            <i className="bi bi-search"></i>
          </div>
          <div className="menu-search-input">
            <input
              type="text"
              className="form-control text-white form-control-lg"
              placeholder="Search menu..."
            />
          </div>
          <div className="menu-search-icon">
            <a href="#/" onClick={toggleAppHeaderSearch}>
              <i className="bi bi-x-lg"></i>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Header;
