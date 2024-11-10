/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import CPAPI from "../../../api-clients/ComputerProjectApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { students } from "./data.js";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function ComputerClassInfo() {

  const context = useContext(AppSettings);
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const [unitType, setUnitType] = useState(1);

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();

  const [loading, setLoading] = useState(false);
  const { translate } = useLanguageToggle();

  const userInfo = useSelector((store) => store.auth.userInfo);

  const { classId } = useParams();

  const modalAddClass = document.getElementById("modalAddClass");

  const navigate = useNavigate();
  const openMissingItem = () => {
    navigate(`${selectedTable.id}/missingItem`, {
      state: { classInfo: selectedTable },
    });
  };
  const openEvidenceList = () => {
    navigate(`${selectedTable.id}/evidenceList`, {
      state: { classInfo: selectedTable },
    });
  };
  const openStampList = () => {
    navigate(`${selectedTable.id}/stampList`, {
      state: { classInfo: selectedTable },
    });
  };

  modalAddClass?.addEventListener("shown.bs.modal", () => {
    const inputName = document.getElementById("classroomName");

    inputName.value = "";
    inputName.focus();
  });

  function toggleMobileSidebar(event, table) {
    event.preventDefault();

    setPosMobileSidebarToggled(true);
    setSelectedTable(table);
  }

  function dismissMobileSidebar(event) {
    event.preventDefault();

    setPosMobileSidebarToggled(false);
    setSelectedTable([]);
  }

  useEffect(() => {
    console.log(classId)
    setLoading(true);
    CPAPI.getUsersbyClassroomId({ classroom_id: classId }).then(
      (res) => {
        console.log("getUsersbyClassroomId === >>> ", res.data);
        setTableData(res.data);
        setLoading(false);
      }
    );

    // context.setAppHeaderNone(true);
    // context.setAppSidebarNone(true);
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    return function cleanUp() {
      // context.setAppHeaderNone(false);
      // context.setAppSidebarNone(false);
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="h-100">
      <Card
        className={
          "pos pos-vertical " +
          (posMobileSidebarToggled ? "pos-mobile-sidebar-toggled" : "")
        }
        id="pos"
      >
        <CardBody className="pos-container">
          <div className="pos-header d-flex justify-content-between">
            <div className="logo">
              <Link to="#/" href="pos_counter_checkout.html">
                <div className="logo-img">
                  <i
                    className="bi bi-x-diamond"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="logo-text">{translate("students")}</div>
              </Link>
            </div>

            <div className="d-flex align-items-center">
              <div className="hide-sm me-4">
                {tableData ? tableData.length : 0}
              </div>
            </div>
          </div>

          <div className="pos-content">
            <div className="pos">
              <div className="pos-container">
                <div className="pos-content h-100">
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <BarsScale />
                    </div>
                  ) : (
                    <PerfectScrollbar className="pos-content-container p-3 h-100">
                      <div className="m-2">
                        <Link className="icon" to="" onClick={goBack}>
                          <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>{" "}
                          {translate("return")}
                        </Link>
                      </div>
                      <div className="row gx-3">
                        {/* {tableData && tableData.length > 0 ? (
                          tableData.map((table, index) => ( */}
                        {students && students.length > 0 ? (
                          students.map((table, index) => (
                            <div
                              className="col-xl-3 col-lg-4 col-md-6 pb-3"
                              key={index}
                            >
                              <Card
                                className={
                                  "pos-checkout-table in-use" +
                                  (selectedTable &&
                                    table.id === selectedTable.id
                                    ? " selected"
                                    : "")
                                }
                              >
                                <div
                                  className="pos-checkout-table-container d-flex align-items-center justify-content-center"
                                  style={{ cursor: "pointer" }}
                                  onClick={(event) =>
                                    toggleMobileSidebar(event, table)
                                  }
                                >
                                  <div className="pos-checkout-table-header">
                                    <div className="status">
                                      <i
                                        className={clsx({
                                          "bi bi-circle-fill text-theme": true,
                                        })}
                                      ></i>
                                    </div>
                                    <div className="fw-bold">
                                      {translate("student")}
                                    </div>
                                    <div className="fw-bold display-6">
                                      {table.name.substr(0, 5) +
                                        (table.name.length > 5 ? "..." : "")}
                                    </div>
                                    <div className="text-primary text-opacity-50">
                                      {translate("id")}: {table.id}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          ))
                        ) : (
                          <div className="col-12">
                            {translate("no-students-found")}
                          </div>
                        )}
                      </div>
                    </PerfectScrollbar>
                  )}
                </div>

                <div className="pos-sidebar" id="pos-sidebar">
                  <div className="pos-sidebar-header">
                    <div className="back-btn">
                      <button
                        type="button"
                        onClick={dismissMobileSidebar}
                        className="btn"
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </div>
                    <i className="fas fa-lg fa-fw me-2 fa-list-ol"></i>
                    <div className="title">{translate("badges")}</div>
                    <div className="order">
                      {translate("id")}:{" "}
                      <b className="text-theme">
                        {selectedTable ? selectedTable.id : "-"}
                      </b>
                    </div>
                  </div>

                  {selectedTable && (
                    <div>
                      <div className="pos-content">
                        <div class="d-flex justify-content-around">
                          <ul className="nav nav-tabs nav-tabs-v2 px-4">
                            {[1, 2].map((level) => (
                              <li className="nav-item me-3" key={`level${level}`}>
                                <div
                                  className={clsx({
                                    "nav-link px-2": true,
                                    active: level === 1,
                                  })}
                                  data-bs-toggle="tab"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setUnitType(level)}
                                >
                                  {translate("unit")} {level}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pos-sidebar-footer">
                        <div className="mt-3">
                          {userInfo.type === "Teacher" ?
                            unitType == 1 ?
                              (<div className="btn-group d-flex flex-grow-0.5 justify-content-center">
                                <div
                                  className="btn btn-outline-danger rounded-0 w-75px"
                                  onClick={openMissingItem}
                                >
                                  <br />
                                  <span className="small">
                                    {translate("missing-item")}
                                  </span>
                                </div>
                              </div>)
                              :
                              (<div className="btn-group d-flex">
                                <div
                                  className="btn btn-outline-danger rounded-0 w-150px"
                                  onClick={openEvidenceList}
                                >
                                  <br />
                                  <span className="small">
                                    {translate("evidence")}
                                  </span>
                                </div>
                                <div
                                  className="btn btn-outline-danger rounded-0 w-150px"
                                  onClick={openStampList}
                                >
                                  <br />
                                  <span className="small">
                                    {translate("stamp")}
                                  </span>
                                </div>
                              </div>)
                            : (
                              <div className="btn-group d-flex">
                                <div className="btn btn-outline-default rounded-0 w-150px">
                                  <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>
                                  <br />
                                  <span className="small">{translate("leave-class")}</span>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ComputerClassInfo;
