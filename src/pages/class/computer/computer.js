/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import ComputerAPI from "../../../api-clients/ComputerProjectApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { loadingState } from "../../../utils/state.js";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function Computer() {
  const context = useContext(AppSettings);
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [additionalClassName, setAdditionalClassName] = useState();

  const [loading, setLoading] = useState(false);
  const [addClassLoading, setAddClassLoading] = useState(loadingState.before);
  const [joinClassLoading, setJoinClassLoading] = useState(loadingState.before);
  const { translate } = useLanguageToggle();

  const userInfo = useSelector((store) => store.auth.userInfo);

  const modalAddClass = document.getElementById("modalAddClass");

  const navigate = useNavigate();

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

  function openClass(table) {
    navigate(`${table.id}`, {
      state: { classInfo: table },
    });
  }

  function dismissMobileSidebar(event) {
    event.preventDefault();

    setPosMobileSidebarToggled(false);
    setSelectedTable([]);
  }

  useEffect(() => {
    setLoading(true);

    if (userInfo.type === "Teacher") {
      ComputerAPI.getClassroomsByTeacherId({ teacher_id: userInfo.uid }).then(
        (res) => {
          setTableData(res.data);
          setLoading(false);
        }
      );
    } else if (userInfo.type === 'Student') {
      const query = { student_id: userInfo.uid };
      ComputerAPI.getJoinedClassrooms(query)
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

    setAdditionalClassName(name);

    if (name !== "") {
      const body = {
        name: name,
        teacher_id: userInfo.uid,
        school_id: userInfo.schoolId,
      };

      setAddClassLoading(loadingState.loading);
      ComputerAPI.addClassroom(body)
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
      ComputerAPI.joinClassroom(body)
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
    ComputerAPI.deleteClassroom({ class_id: selectedTable.id }).then((_) => {
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
                    className="bi bi-x-diamond"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="logo-text">{translate("classrooms")}</div>
              </Link>
            </div>

            <div className="d-flex align-items-center">
              <div className="hide-sm me-4">
                {tableData ? tableData.length : 0} {translate("founded")}
              </div>

              <button
                type="button"
                className="btn btn-theme btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalAddClass"
              >
                <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                {translate("add-class")}
              </button>
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
                              className="col-xl-4 col-lg-4 col-md-6 pb-3"
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
                                  onDoubleClick={() => openClass(table)}
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
                                      {table.name.substr(0, 10) +
                                        (table.name.length > 10 ? "..." : "")}
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

                  {selectedTable && (
                    <div className="pos-sidebar-footer">
                      <div className="mt-3">
                        <div className="btn-group d-flex" onClick={handleDeleteClass}>
                          <div className="btn btn-outline-default rounded-0 w-150px">
                            <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>
                            <br />
                            <span className="small">
                              {translate("leave-class")}
                            </span>
                          </div>
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

      <div className="modal fade" id="modalAddClass">
        <div className="modal-dialog">
          <div className="modal-content">
            {(!userInfo.schoolData || (userInfo.schoolData && userInfo.schoolData.computer === true)) ?
              <div>
                <div className="modal-header">
                  <h5 className="modal-title">{translate("add-classrooms")}</h5>
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
                         {translate("name")}<span className="text-danger">*</span>
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

export default Computer;
