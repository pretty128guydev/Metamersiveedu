/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Button, notification, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import SkillDrillApi from "../../../api-clients/SkillDrillApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { loadingState } from "../../../utils/state.js";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function SkillDrill() {
  const context = useContext(AppSettings);
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [conditionLoading, setConditionLoading] = useState(false);
  const [additionalClassName, setAdditionalClassName] = useState();
  const { translate } = useLanguageToggle();

  const [loading, setLoading] = useState(false);
  const [addClassLoading, setAddClassLoading] = useState(loadingState.before);
  const [joinClassLoading, setJoinClassLoading] = useState(loadingState.before);

  const userInfo = useSelector((store) => store.auth.userInfo);

  const modalAddClass = document.getElementById("modalAddClass");

  const navigate = useNavigate();
  const openEditClass = () => {
    navigate(`editClass/${selectedTable.id}`, {
      state: { classInfo: selectedTable },
    });
  };

  modalAddClass?.addEventListener("shown.bs.modal", () => {
    const inputName = document.getElementById("add_classroomName");

    if (inputName) {
      inputName.value = "";
      inputName.focus();
      setAddClassLoading(loadingState.before);
    }
  });

  const modalJoinClass = document.getElementById("modalJoinClass");
  modalJoinClass?.addEventListener("shown.bs.modal", () => {
    const inputId = document.getElementById("classroomId");

    inputId.value = "";
    inputId.focus();
    setJoinClassLoading(loadingState.before);
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
    setLoading(true);

    if (userInfo.type === "Teacher") {
      SkillDrillApi.getClassroomsByTeacherId({ teacher_id: userInfo.uid }).then(
        (res) => {
          console.log("dat:", res.data);
          setTableData(res.data);
          setLoading(false);
        }
      );
    } else {
      const query = { student_id: userInfo.uid };
      SkillDrillApi.getJoinedClassrooms(query)
        .then((res) => {
          setTableData(res.data);
          setLoading(false);
        })
        .catch((_err) => {
          setLoading(false);
        });
    }

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

  useEffect(() => {
    // Todo her....
    if (selectedTable && document.getElementById("batchCount")) {
      document.getElementById("batchCount").value = selectedTable.batchCount;
      document.getElementById("questionCount").value =
        selectedTable.questionCount;
      document.getElementById("traineeToRookie_promote1").value =
        selectedTable.traineeToRookie_promote.level1;
      document.getElementById("traineeToRookie_promote2").value =
        selectedTable.traineeToRookie_promote.level2;
      document.getElementById("traineeToRookie_promote3").value =
        selectedTable.traineeToRookie_promote.level3;
      document.getElementById("rookieToTrainee_demote1").value =
        selectedTable.rookieToTrainee_demote.level1;
      document.getElementById("rookieToTrainee_demote2").value =
        selectedTable.rookieToTrainee_demote.level2;
      document.getElementById("rookieToTrainee_demote3").value =
        selectedTable.rookieToTrainee_demote.level3;
      document.getElementById("rookieToPro_promote1").value =
        selectedTable.rookieToPro_promote.level1;
      document.getElementById("rookieToPro_promote2").value =
        selectedTable.rookieToPro_promote.level2;
      document.getElementById("rookieToPro_promote3").value =
        selectedTable.rookieToPro_promote.level3;
      document.getElementById("proToRookie_demote1").value =
        selectedTable.proToRookie_demote.level1;
      document.getElementById("proToRookie_demote2").value =
        selectedTable.proToRookie_demote.level2;
      document.getElementById("proToRookie_demote3").value =
        selectedTable.proToRookie_demote.level3;
    }
  }, [selectedTable]);

  const handleAddClass = (event) => {
    event.preventDefault();
    const name = document.getElementById("add_classroomName").value;
    const body = {
      teacher_id: userInfo.uid,
      name,
      description: document.getElementById("add_classroomDescription").value,
      batchCount: document.getElementById("add_batchCount").value,
      questionCount: document.getElementById("add_questionCount").value,
      traineeToRookie_promote: {
        level1: document.getElementById("add_traineeToRookie_promote1").value,
        level2: document.getElementById("add_traineeToRookie_promote2").value,
        level3: document.getElementById("add_traineeToRookie_promote3").value,
      },
      rookieToTrainee_demote: {
        level1: document.getElementById("add_rookieToTrainee_demote1").value,
        level2: document.getElementById("add_rookieToTrainee_demote2").value,
        level3: document.getElementById("add_rookieToTrainee_demote3").value,
      },
      rookieToPro_promote: {
        level1: document.getElementById("add_rookieToPro_promote1").value,
        level2: document.getElementById("add_rookieToPro_promote2").value,
        level3: document.getElementById("add_rookieToPro_promote3").value,
      },
      proToRookie_demote: {
        level1: document.getElementById("add_proToRookie_demote1").value,
        level2: document.getElementById("add_proToRookie_demote2").value,
        level3: document.getElementById("add_proToRookie_demote3").value,
      },
    };
    // const subjectId = event.target.questionSubject.value;
    // const topicId = event.target.questionTopic.value;
    // const questionCount = event.target.classroomQuestionCount.value;

    setAdditionalClassName(document.getElementById("add_classroomName").value);

    if (name !== "") {
      setAddClassLoading(loadingState.loading);
      SkillDrillApi.addClassroom(body)
        .then((res) => {
          setTableData([...tableData, res.data]);
        })
        .catch((err) =>
          notification.warning({
            message: "Error",
            description: err.response.data.message,
          })
        )
        .finally(() => setAddClassLoading(loadingState.after));
    }
  };

  const handleJoinClass = (event) => {
    event.preventDefault();

    const classId = event.target.classroomId.value;

    if (classId !== "") {
      const body = {
        class_id: classId,
        student_id: userInfo.uid,
      };

      setJoinClassLoading(loadingState.loading);
      SkillDrillApi.joinClassroom(body)
        .then((res) => {
          setTableData([...tableData, res.data]);
          setJoinClassLoading(loadingState.after);
        })
        .catch((_err) => {
          setJoinClassLoading(loadingState.after);
        });
    }
  };

  const handleDeleteClass = () => {
    SkillDrillApi.deleteClassroom({ class_id: selectedTable.id }).then((_) => {
      const t_tableData = [...tableData].filter(
        (row) => row.id !== selectedTable.id
      );
      setTableData(t_tableData);
      setSelectedTable();
    });
  };

  const handleSaveClass = () => {
    const body = {
      batchCount: document.getElementById("batchCount").value,
      questionCount: document.getElementById("questionCount").value,
      traineeToRookie_promote: {
        level1: document.getElementById("traineeToRookie_promote1").value,
        level2: document.getElementById("traineeToRookie_promote2").value,
        level3: document.getElementById("traineeToRookie_promote3").value,
      },
      rookieToTrainee_demote: {
        level1: document.getElementById("rookieToTrainee_demote1").value,
        level2: document.getElementById("rookieToTrainee_demote2").value,
        level3: document.getElementById("rookieToTrainee_demote3").value,
      },
      rookieToPro_promote: {
        level1: document.getElementById("rookieToPro_promote1").value,
        level2: document.getElementById("rookieToPro_promote2").value,
        level3: document.getElementById("rookieToPro_promote3").value,
      },
      proToRookie_demote: {
        level1: document.getElementById("proToRookie_demote1").value,
        level2: document.getElementById("proToRookie_demote2").value,
        level3: document.getElementById("proToRookie_demote3").value,
      },
    };
    if (Number(body.batchCount) <= 2) {
      notification.warning({
        message: "Warning!",
        description: "Batch Count can not be smaller than 2",
      });
      return;
    }
    setConditionLoading(true);
    SkillDrillApi.updateClassroom({ class_id: selectedTable.id }, body)
      .then(() => {
        setTableData(
          tableData.map((item) => {
            if (item.id !== selectedTable.id) {
              return item;
            }
            return {
              ...item,
              ...body,
            };
          })
        );
        setSelectedTable({
          ...selectedTable,
          ...body,
        });
        notification.success({
          message: "Success",
          description: "Successfully Saved Conditions!",
        });
      })
      .catch((err) =>
        notification.warning({
          message: "Error",
          description: err.response.data.message,
        })
      )
      .finally(() => setConditionLoading(false));
  };

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
              <Link to="#/">
                <div className="logo-img">
                  <i
                    className="bi bi-x-diamond text-default"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="logo-text text-default">
                  {translate("classrooms")}
                </div>
              </Link>
            </div>

            <div className="d-flex align-items-center">
              <div className="hide-sm me-4">
                {tableData ? tableData.length : 0} {translate("founded")}
              </div>

              {userInfo.type !== "Student" && (
                <button
                  type="button"
                  className="btn btn-theme btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAddClass"
                >
                  <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                  {translate("add-class")}{" "}
                </button>
              )}
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
                      <div className="row gx-3">
                        {tableData && tableData.length > 0 ? (
                          tableData.map((table, index) => (
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
                                <a
                                  href="#/"
                                  className="pos-checkout-table-container"
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
                                    <div className="fw-bold">Class</div>
                                    <div className="fw-bold display-6">
                                      {table.name.substr(0, 5) +
                                        (table.name.length > 5 ? "..." : "")}
                                    </div>
                                    <div className="text-primary text-opacity-50">
                                      {translate("id")}: {table.id}
                                    </div>
                                  </div>
                                </a>
                              </Card>
                            </div>
                          ))
                        ) : (
                          <div className="col-12">
                            {translate("no-records-found")}
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
                    <div className="title">{translate("details")}</div>
                    <div className="order">
                      {translate("id")}:{" "}
                      <b className="text-theme">
                        {selectedTable ? selectedTable.id : "-"}
                      </b>
                    </div>
                  </div>
                  <hr className="m-0 opacity-3 text-primary" />
                  <PerfectScrollbar className="pos-sidebar-body">
                    <div className="pos-sidebar-footer">
                      {selectedTable && (
                        <div className="mt-3">
                          {userInfo.type === "Teacher" ? (
                            <div className="d-flex flex-column">
                              {
                                <Card
                                  className={
                                    "pos-checkout-table in-use mb-2 p-2"
                                  }
                                >
                                  {conditionLoading ? (
                                    <Spin />
                                  ) : (
                                    <div className="d-flex flex-column">
                                      <hr className="m-0 mb-2"></hr>
                                      <div className="text-center mb-3">
                                        <h6>{translate("batch-count")}</h6>
                                        <div className="d-flex justify-content-center mb-2">
                                          <input
                                            className={clsx({
                                              "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                              "is-invalid":
                                                additionalClassName === "",
                                            })}
                                            style={{
                                              width: "50%",
                                              maxHeight: "1.7rem",
                                              minHeight: "1.7rem",
                                            }}
                                            placeholder=""
                                            id="batchCount"
                                            // value={Number(selectedTable.batchCount)}
                                          />
                                        </div>
                                        <h6>
                                          {translate(
                                            "questions-per-batch-count"
                                          )}
                                        </h6>
                                        <div className="d-flex justify-content-center">
                                          <input
                                            className={clsx({
                                              "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                              "is-invalid":
                                                additionalClassName === "",
                                            })}
                                            style={{
                                              width: "50%",
                                              maxHeight: "1.7rem",
                                              minHeight: "1.7rem",
                                            }}
                                            placeholder=""
                                            id="questionCount"
                                            // value={Number(selectedTable.questionCount)}
                                          />
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-center text-center">
                                        <h6>
                                          {translate("promotion-demotion-rule")}
                                        </h6>
                                      </div>

                                      <div>
                                        <div className="d-flex flex-column px-3">
                                          <span>
                                            -{" "}
                                            {translate(
                                              "rookie-trainee-demotion"
                                            )}
                                          </span>
                                          <ul>
                                            {[1, 2, 3].map((level, index) => (
                                              <li
                                                key={`Level${index}`}
                                                className="d-flex my-2"
                                              >
                                                <span className="px-2 d-flex align-items-center">{`Level ${level} ${
                                                  level === 3 ? "=" : "<"
                                                } `}</span>
                                                <input
                                                  type="number"
                                                  className={clsx({
                                                    "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                                    "is-invalid":
                                                      additionalClassName ===
                                                      "",
                                                  })}
                                                  style={{
                                                    width: "50%",
                                                    maxHeight: "1.7rem",
                                                    minHeight: "1.7rem",
                                                  }}
                                                  placeholder=""
                                                  id={`rookieToTrainee_demote${level}`}
                                                  // value={selectedTable.rookieToTrainee_demote[`level${level}`]}
                                                />
                                                %
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="d-flex flex-column px-3">
                                          <span>
                                            -{" "}
                                            {translate(
                                              "trainee-rookie-promotion"
                                            )}
                                          </span>
                                          <ul>
                                            {[1, 2, 3].map((level, index) => (
                                              <li
                                                key={`Level${index}`}
                                                className="d-flex my-2"
                                              >
                                                <span className="px-2 d-flex align-items-center">{`Level ${level} > `}</span>
                                                <input
                                                  type="number"
                                                  className={clsx({
                                                    "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                                    "is-invalid":
                                                      additionalClassName ===
                                                      "",
                                                  })}
                                                  style={{
                                                    width: "50%",
                                                    maxHeight: "1.7rem",
                                                    minHeight: "1.7rem",
                                                  }}
                                                  placeholder=""
                                                  // value={selectedTable.traineeToRookie_promote[`level${level}`]}
                                                  id={`traineeToRookie_promote${level}`}
                                                />
                                                %
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="d-flex flex-column px-3">
                                          <span>
                                            -{" "}
                                            {translate("rookie-pro-promotion")}
                                          </span>
                                          <ul>
                                            {[1, 2, 3].map((level, index) => (
                                              <li
                                                key={`Level${index}`}
                                                className="d-flex my-2"
                                              >
                                                <span className="px-2 d-flex align-items-center">{`Level ${level} > `}</span>
                                                <input
                                                  type="number"
                                                  className={clsx({
                                                    "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                                    "is-invalid":
                                                      additionalClassName ===
                                                      "",
                                                  })}
                                                  style={{
                                                    width: "50%",
                                                    maxHeight: "1.7rem",
                                                    minHeight: "1.7rem",
                                                  }}
                                                  placeholder=""
                                                  id={`rookieToPro_promote${level}`}
                                                  // value={selectedTable.rookieToPro_promote[`level${level}`]}
                                                />
                                                %
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="d-flex flex-column px-3">
                                          <span>
                                            -{" "}
                                            {translate(
                                              "pro-to-rookie-demotion"
                                            )}
                                          </span>
                                          <ul>
                                            {[1, 2, 3].map((level, index) => (
                                              <li
                                                key={`Level${index}`}
                                                className="d-flex my-2"
                                              >
                                                <span className="px-2 d-flex align-items-center">{`Level ${level} < `}</span>
                                                <input
                                                  type="number"
                                                  className={clsx({
                                                    "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                                    "is-invalid":
                                                      additionalClassName ===
                                                      "",
                                                  })}
                                                  style={{
                                                    width: "50%",
                                                    maxHeight: "1.7rem",
                                                    minHeight: "1.7rem",
                                                  }}
                                                  placeholder=""
                                                  id={`proToRookie_demote${level}`}
                                                  // value={selectedTable.proToRookie_demote[`level${level}`]}
                                                />
                                                %
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <Button onClick={handleSaveClass}>
                                    {translate("save")}
                                  </Button>
                                </Card>
                              }
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                  </PerfectScrollbar>

                  {selectedTable && (
                    <div className="pos-sidebar-footer">
                      <div className="mt-3">
                        {userInfo.type === "Teacher" ? (
                          <div className="btn-group d-flex">
                            <div
                              className="btn btn-outline-danger rounded-0 w-150px"
                              onClick={handleDeleteClass}
                            >
                              <i className="fas fa-lg fa-fw fa-trash-alt"></i>
                              <br />
                              <span className="small">
                                {translate("remove")}
                              </span>
                            </div>
                            <div
                              className="btn btn-outline-theme rounded-0 w-150px"
                              onClick={openEditClass}
                            >
                              <i className="fas fa-lg fa-fw fa-edit"></i>
                              <br />
                              <span className="small">
                                {translate("edit-class")}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="btn-group d-flex">
                            <div className="btn btn-outline-default rounded-0 w-150px">
                              <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>
                              <br />
                              <span className="small">
                                {translate("leave-class")}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="modal fade" id="modalAddClass">
        <div className="modal-dialog">
          <div className="modal-content">
            {!userInfo.schoolData ||
            (userInfo.schoolData && userInfo.schoolData.quizGame === true) ? (
              <div>
                <div className="modal-header">
                  <h5 className="modal-title">{translate("add-classroom")}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <form onSubmit={handleAddClass}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">
                        {translate("name")}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={clsx({
                          "form-control form-control-lg bg-white bg-opacity-5": true,
                          "is-invalid": additionalClassName === "",
                        })}
                        placeholder=""
                        id="add_classroomName"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        {" "}
                        {translate("description")}
                      </label>
                      <textarea
                        className="form-control form-control-md bg-white bg-opacity-5"
                        rows="5"
                        placeholder=""
                        id="add_classroomDescription"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        {translate("batch-count")}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={clsx({
                          "form-control form-control-lg bg-white bg-opacity-5": true,
                          "is-invalid": additionalClassName === "",
                        })}
                        placeholder=""
                        id="add_batchCount"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        {translate("question-per-batch")}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={clsx({
                          "form-control form-control-lg bg-white bg-opacity-5": true,
                          "is-invalid": additionalClassName === "",
                        })}
                        placeholder=""
                        id="add_questionCount"
                      />
                    </div>

                    <div className="d-flex flex-column border border-rounded mb-3 p-2">
                      <label className="form-label">
                        {translate("promotion-demotion-rule")}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex flex-column px-3">
                        <span>- {translate("rookie-trainee-demotion")}</span>
                        <ul>
                          {[1, 2, 3].map((level, index) => (
                            <li key={`Level${index}`} className="d-flex my-2">
                              <span className="px-2">{`Level ${level} : `}</span>
                              <input
                                type="number"
                                className={clsx({
                                  "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                  "is-invalid": additionalClassName === "",
                                })}
                                style={{
                                  width: "50%",
                                  maxHeight: "1.7rem",
                                  minHeight: "1.7rem",
                                }}
                                placeholder=""
                                id={`add_rookieToTrainee_demote${level}`}
                              />
                              %
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="d-flex flex-column px-3">
                        <span>- {translate("trainee-rookie-promotion")}</span>
                        <ul>
                          {[1, 2, 3].map((level, index) => (
                            <li key={`Level${index}`} className="d-flex my-2">
                              <span className="px-2">{`Level ${level} : `}</span>
                              <input
                                type="number"
                                className={clsx({
                                  "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                  "is-invalid": additionalClassName === "",
                                })}
                                style={{
                                  width: "50%",
                                  maxHeight: "1.7rem",
                                  minHeight: "1.7rem",
                                }}
                                placeholder=""
                                id={`add_traineeToRookie_promote${level}`}
                              />
                              %
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="d-flex flex-column px-3">
                        <span>- {translate("rookie-to-pro-promotion")}</span>
                        <ul>
                          {[1, 2, 3].map((level, index) => (
                            <li key={`Level${index}`} className="d-flex my-2">
                              <span className="px-2">{`Level ${level} : `}</span>
                              <input
                                type="number"
                                className={clsx({
                                  "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                  "is-invalid": additionalClassName === "",
                                })}
                                style={{
                                  width: "50%",
                                  maxHeight: "1.7rem",
                                  minHeight: "1.7rem",
                                }}
                                placeholder=""
                                id={`add_rookieToPro_promote${level}`}
                              />
                              %
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="d-flex flex-column px-3">
                        <span>- {translate("pro-to-rookie-demotion")}</span>
                        <ul>
                          {[1, 2, 3].map((level, index) => (
                            <li key={`Level${index}`} className="d-flex my-2">
                              <span className="px-2">{`Level ${level} : `}</span>
                              <input
                                type="number"
                                className={clsx({
                                  "form-control form-control-lg bg-white bg-opacity-5 mx-1": true,
                                  "is-invalid": additionalClassName === "",
                                })}
                                style={{
                                  width: "50%",
                                  maxHeight: "1.7rem",
                                  minHeight: "1.7rem",
                                }}
                                placeholder=""
                                id={`add_proToRookie_demote${level}`}
                              />
                              %
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {addClassLoading === loadingState.before && (
                      <button type="submit" className="btn btn-outline-theme">
                        Save
                      </button>
                    )}
                    {addClassLoading === loadingState.loading && <BarsScale />}
                    {addClassLoading === loadingState.after && (
                      <button
                        type="button"
                        className="btn btn-outline-theme"
                        data-bs-dismiss="modal"
                      >
                        {translate("done")}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div className="modal-header">
                  <p>
                    Oops! It looks like you have no permission to create class.
                    Your School Admin needs to purchase App before create class.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="modal fade" id="modalRuleClass">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Demotion/Promotion</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleSaveRuleClass}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={clsx({
                      "form-control form-control-lg bg-white bg-opacity-5": true,
                      "is-invalid": additionalClassName === "",
                    })}
                    placeholder=""
                    id="classroomName"
                  />
                </div>
              </div>
              <div className="modal-footer">
                {addClassLoading === loadingState.before && (
                  <button type="submit" className="btn btn-outline-theme">
                    Save
                  </button>
                )}
                {addClassLoading === loadingState.loading && <BarsScale />}
                {addClassLoading === loadingState.after && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >
                    Done
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div> */}

      <div className="modal fade" id="modalJoinClass">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{translate("join-classroom")}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleJoinClass}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    {translate("classroom-id")}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg bg-white bg-opacity-5"
                    placeholder=""
                    id="classroomId"
                  />
                </div>
              </div>
              <div className="modal-footer">
                {joinClassLoading === loadingState.before && (
                  <button type="submit" className="btn btn-outline-theme">
                    {translate("join")}
                  </button>
                )}
                {joinClassLoading === loadingState.loading && <BarsScale />}
                {joinClassLoading === loadingState.after && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >
                    {translate("done")}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillDrill;
