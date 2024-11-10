/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { Card, CardBody } from "./../../../components/card/card.jsx";
import { AppSettings } from "./../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import RomeoApi from "../../../api-clients/RomeoApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

const loadingState = {
  before: 0,
  loading: 1,
  after: 2,
};

function Romeo() {
  const context = useContext(AppSettings);
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [additionalClassName, setAdditionalClassName] = useState();
  const { translate } = useLanguageToggle();

  const [loading, setLoading] = useState(false);
  const [addClassLoading, setAddClassLoading] = useState(loadingState.before);

  const userInfo = useSelector((store) => store.auth.userInfo);

  const modalAddClass = document.getElementById("modalAddClass");

  modalAddClass?.addEventListener("shown.bs.modal", () => {
    const inputName = document.getElementById("classroomName");
    const inputDescription = document.getElementById("classroomDescription");

    if (inputName && inputDescription) {
      inputName.value = "";
      inputDescription.value = "";
      inputName.focus();
      setAddClassLoading(loadingState.before);
    }
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
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    setLoading(true);
    RomeoApi.getClassroomsByTeacherId({ teacher_id: userInfo.uid }).then(
      (res) => {
        setTableData(res.data);
        setLoading(false);
      }
    );

    return function cleanUp() {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  const handleAddClass = (event) => {
    event.preventDefault();

    console.log(userInfo.permission);

    if (userInfo.permission.romeo === false) {
      alert(
        "You have no permisstion to add classroom. You have to be subscribed."
      );
      return;
    }

    const name = event.target.classroomName.value;
    const description = event.target.classroomDescription.value;

    setAdditionalClassName(name);

    if (name !== "") {
      const body = {
        name: name,
        description: description,
        teacher_id: userInfo.uid,
        school_id: userInfo.schoolId,
      };

      setAddClassLoading(loadingState.loading);
      RomeoApi.addClassroom(body)
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

  return (
    <div className="h-100">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">{translate("return-to-home")}</a>
        </li>
      </ul>

      <h1 className="page-header">
        <i className="fas fa-lg fa-fw me-2 fa-heartbeat"></i>
        {translate("romeo-and-juliet")}{" "}
        <small>{translate("manage-classrooms-here")}...</small>
      </h1>

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
                                      <i className="bi bi-circle-fill"></i>
                                    </div>
                                    <div className="fw-bold">
                                      {translate("class")}
                                    </div>
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
                    <i className="fab fa-lg fa-fw me-2 fa-codepen"></i>
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
                      <h5 className="pos-order py-3">{selectedTable?.name}</h5>
                    </div>
                    <hr className="m-0 opacity-3 text-primary" />
                    <div>
                      <div className="pos-order py-3">
                        {selectedTable?.description}
                      </div>
                    </div>
                  </PerfectScrollbar>
                  {selectedTable && (
                    <div className="pos-sidebar-footer">
                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-outline-default btn-lg w-100"
                          disabled
                        >
                          {translate("delete-selected-class")}
                        </button>
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
            {(!userInfo.schoolData || (userInfo.schoolData && userInfo.schoolData.rAndJ === true)) ?
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
                        className="form-control form-control-lg bg-white bg-opacity-5"
                        rows="5"
                        placeholder=""
                        id="classroomDescription"
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
    </div>
  );
}

export default Romeo;
