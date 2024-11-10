/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import QuizGameApi from "../../../api-clients/QuizGameApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { loadingState } from "../../../utils/state.js";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function QuizGame() {
  const context = useContext(AppSettings);
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const { translate } = useLanguageToggle();

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [additionalClassName, setAdditionalClassName] = useState();

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
    const inputName = document.getElementById("classroomName");

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
      QuizGameApi.getClassroomsByTeacherId({ teacher_id: userInfo.uid }).then(
        (res) => {
          setTableData(res.data);
          setLoading(false);
        }
      );
    } else {
      console.log('hi, this is student!')
      const query = { student_id: userInfo.uid };
      QuizGameApi.getJoinedClassrooms(query)
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

  const handleAddClass = (event) => {
    event.preventDefault();

    const name = event.target.classroomName.value;
    const description = event.target.classroomDescription.value;
    const questionType = event.target.questionType.value;

    console.log(name, description, questionType);

    setAdditionalClassName(name);

    if (name !== "") {
      const body = {
        name: name,
        description: description,
        quizType: questionType,
        teacher_id: userInfo.uid,
        school_id: userInfo.schoolId,
      };

      setAddClassLoading(loadingState.loading);
      QuizGameApi.addClassroom(body)
        .then((res) => {
          setTableData([...tableData, res.data]);
          setAddClassLoading(loadingState.after);
        })
        .catch((err) => {
          console.log(err);
          setAddClassLoading(loadingState.after);
        });
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
      QuizGameApi.joinClassroom(body)
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
    QuizGameApi.deleteClassroom({ class_id: selectedTable.id }).then((_) => {
      const t_tableData = [...tableData].filter(
        (row) => row.id !== selectedTable.id
      );
      setTableData(t_tableData);
      setSelectedTable();
    });
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
              <Link to="#/" href="pos_counter_checkout.html">
                <div className="logo-img">
                  <i
                    className="bi bi-x-diamond text-default"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="logo-text text-default">{translate("classrooms")}</div>
              </Link>
            </div>

            <div className="d-flex align-items-center">
              <div className="hide-sm me-4">
                {tableData ? tableData.length : 0} {translate("founded")}
              </div>

              {
                userInfo.type !== 'Student' &&
                <button
                  type="button"
                  className="btn btn-theme btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAddClass"
                >
                  <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                  {translate("add-class")}
                </button>
              }
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
                    <div>
                      <div className="py-3 px-3">
                        <div className="mb-3">
                          <h5>{selectedTable?.name}</h5>
                        </div>
                        <div className="mb-3">{selectedTable?.description}</div>
                        <div className="mb-3">
                          {selectedTable && (
                            <Card>
                              <CardBody className="bg-theme bg-opacity-10">
                                {selectedTable?.quizType === "0"
                                  ? "Assessment"
                                  : "Check for understanding"}
                              </CardBody>
                            </Card>
                          )}
                        </div>
                      </div>
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
            {(!userInfo.schoolData || (userInfo.schoolData && userInfo.schoolData.quizGame === true)) ?
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
                        id="classroomName"
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
                    id="classroomDescription"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    {translate("quiz-type")}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-select-lg bg-white bg-opacity-5"
                    id="questionType"
                  >
                    <option value="0"> {translate("assessment")}</option>
                    <option value="1">
                      {" "}
                      {translate("check-for-understanding")}
                    </option>
                  </select>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-center">
                    <h5>{translate("faq")}</h5>
                  </div>
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                        >
                          {translate("what-is")}&nbsp;
                          <b>{translate("assessment")}</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {translate("students-answer-questions-without")}
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                        >
                          {translate("what-is")}&nbsp;
                          <b> {translate("check-for-understanding")}</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {translate("check-for-understanding-text")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {addClassLoading === loadingState.before && (
                  <button type="submit" className="btn btn-outline-theme">
                    {translate("save")}
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
</div> :
              <div>
                <div className="modal-header">
                  <p>Oops! It looks like you have no permission to create class. Your School Admin needs to purchase App before create class.</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

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

export default QuizGame;
