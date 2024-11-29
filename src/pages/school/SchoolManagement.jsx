/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useNavigate } from "react-router-dom";
import { notification, Select } from "antd";
import { Card, CardBody } from "../../components/card/card.jsx";
import { AppSettings } from "../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import BarsScale from "../../components/loading/BarsScale.jsx";
import useLanguageToggle from "../../hooks/useLanguageToggle.js";
import VillageApi from "../../api-clients/VillageApi.js";
import { AdminAPI } from "../../api-clients/AdminApi.js";
import { toast } from "react-toastify";
import { SGPTAPI } from "../../api-clients/SGPTApi.js";
import TagApi from "../../api-clients/TagApi.js";
import WordApi from "../../api-clients/WordApi.js";

const loadingState = {
  before: 0,
  loading: 1,
  after: 2,
};

const SchoolManagement = () => {
  const context = useContext(AppSettings);
  const { translate } = useLanguageToggle();
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [className, setClassName] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [selectedTable, setSelectedTable] = useState();
  const [additionalClassName, setAdditionalClassName] = useState();
  const [addSelectedStudent, setAddSelectedStudent] = useState();
  const [editStudent, setEditStudent] = useState(0);
  const [editStudentStatus, setEditStudentStatus] = useState("blocked");
  const [loading, setLoading] = useState(false);

  const [addClassLoading, setAddClassLoading] = useState(loadingState.before);
  const [editClassLoading, setEditClassLoading] = useState(loadingState.before);
  const [joinClassLoading, setJoinClassLoading] = useState(loadingState.before);

  const [allStudents, setAllStudents] = useState([]);
  const [missedStudents, setMissedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userInfo = useSelector((store) => store.auth.userInfo);

  const modalAddClass = document.getElementById("modalAddClass");
  modalAddClass?.addEventListener("shown.bs.modal", () => {
    const inputName = document.getElementById("classroomName");
    const inputDescription = document.getElementById("classroomDescription");

    inputName.value = "";
    inputDescription.value = "";
    inputName.focus();
    setAddClassLoading(loadingState.before);
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

    setClassName(table.name);
    setClassDesc(table.description);

    setEditStudent(0);
    setEditStudentStatus("block");

    if (table.students) {
      const tmpMissedStudents = [];
      for (let i = 0; i < allStudents.length; i++) {
        let flg = true;
        for (let j = 0; j < table.students.length; j++) {
          if (
            allStudents[i].name === table.students[j].name &&
            allStudents[i].id === table.students[j].student_id
          ) {
            flg = false;
            break;
          }
        }

        if (flg === true) {
          tmpMissedStudents.push(allStudents[i]);
        }
      }
      if (tmpMissedStudents && tmpMissedStudents.length > 0)
        setAddSelectedStudent({
          student_id: tmpMissedStudents[0].id,
          name: tmpMissedStudents[0].name,
          class_id: table.id,
        });
      else setAddSelectedStudent(null);
      setMissedStudents(tmpMissedStudents);
    } else {
      // setAddSelectedStudent({
      //   student_id: allStudents[0].id,
      //   name: allStudents[0].name,
      //   class_id: table.school_id,
      // });
      setMissedStudents(allStudents);
    }
    // setMissedStudents(missedStudents.filter((item) => !selectedTable.students.include({name: item.name, student_id: item.id})));
  }

  function dismissMobileSidebar(event) {
    event.preventDefault();

    setPosMobileSidebarToggled(false);
    setSelectedTable([]);
  }

  const handleNavigate = () => {
    const school_id = selectedTable?.id;
    if (school_id) {
      let url;
      url = `/school-management/${school_id}`;
      navigate(url);
    }
  };

  useEffect(() => {
    setLoading(true); // Start loading state

    AdminAPI.getSchools({})
      .then((data) => {
        setTableData(data.data);
        // Set initial data
        // const initialTabState = {};
        // data.data.forEach((item) => {
        //   for (const app of appTabList) {
        //     if (Object.keys(item).includes(app.key)) {
        //       initialTabState[`${item.id}`] = app.key;
        //       return;
        //     }
        //   }
        // });

        // setActiveTab(initialTabState);
      })
      .catch((err) =>
        notification.error({
          message: "Error",
          description: err.response.data.message,
        })
      )
      .finally(() => setLoading(false));

    // Fetch teachers by school ID
    // AdminAPI.getTeacherBySchoolId({ schoolId: userInfo.schoolId })
    //   .then(async (data) => {
    //     console.log(data.data.teachers);
    //     setTableData(data.data.teachers); // Set initial table data with teacher info

    //     // Fetch classroom data for each teacher from each API in parallel
    //     const classroomDataPromises = data.data.teachers.map((teacher) =>
    //       Promise.all([
    //         VillageApi.getClassroomsByTeacherId({ teacher_id: teacher.id }),
    //         TagApi.getClassroomsByTeacherId({ teacher_id: teacher.id }),
    //         WordApi.getClassroomsByTeacherId({ teacher_id: teacher.id }),
    //       ]).then(([villageRes, tagRes, wordRes]) => {
    //         // Combine results of all three API calls for this teacher
    //         return {
    //           teacherId: teacher.id,
    //           villageClassrooms: villageRes.data,
    //           tagClassrooms: tagRes.data,
    //           wordClassrooms: wordRes.data,
    //         };
    //       })
    //     );

    //     // Wait for all classroom data to be fetched
    //     const allClassroomData = await Promise.all(classroomDataPromises);

    //     // Update the table with the combined classroom data
    //     setTableData((prevTableData) =>
    //       prevTableData.map((teacher) => ({
    //         ...teacher,
    //         classrooms: allClassroomData.find(
    //           (classroom) => classroom.teacherId === teacher.id
    //         ),
    //       }))
    //     );
    //   })
    //   .catch((err) =>
    //     notification.error({
    //       message: "Error",
    //       description: err.response.data.message,
    //     })
    //   )
    //   .finally(() => setLoading(false));

    // Fetch students by school ID
    // AdminAPI.getStudent({ schoolId: userInfo.schoolId })
    //   .then((data) => {
    //     setAllStudents(data.data.rows);
    //     setMissedStudents(data.data.rows);
    //   })
    //   .catch((err) =>
    //     notification.error({
    //       message: "Error",
    //       description: err.response.data.message,
    //     })
    //   )
    //   .finally(() => setLoading(false));

    // Set full-screen content settings
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    // Cleanup on unmount
    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  const handleAddClass = (event) => {
    event.preventDefault();

    const name = event.target.classroomName.value;
    const description = event.target.classroomDescription.value;

    setAdditionalClassName(name);

    if (name !== "") {
      const body = {
        name: name,
        description: description,
        teacher_id: userInfo.uid,
        schoolId: userInfo.schoolId,
      };

      setAddClassLoading(loadingState.loading);
      VillageApi.addClassroom(body)
        .then((res) => {
          setTableData([...tableData, res.data]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setAddClassLoading(loadingState.after));
    }
  };

  const handleEditClass = (event) => {
    event.preventDefault();

    if (className !== "") {
      const body = {
        name: className,
        description: classDesc,
        school_id: selectedTable.id,
        teacher_id: userInfo.uid,
        schoolId: userInfo.schoolId,
      };

      setEditClassLoading(loadingState.loading);
      VillageApi.editClassroom(body)
        .then((res) => {
          // setTableData([...tableData]);

          // Key and new data
          // Find index of the object with the key
          const index = tableData.findIndex(
            (item) => item.id === selectedTable.id
          );
          const tmpTableData = tableData;
          const updatedData = {
            name: className,
            description: classDesc,
          };

          // Update if the object is found
          if (index !== -1) {
            tmpTableData[index] = { ...tmpTableData[index], ...updatedData };
            let tmpSelectedData = selectedTable;
            tmpSelectedData = { ...selectedTable, ...updatedData };
            setSelectedTable(tmpSelectedData);
            setTableData(tmpTableData);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setEditClassLoading(loadingState.after));
    }
  };

  const handleDeleteClass = () => {
    VillageApi.deleteClassroom({ class_id: selectedTable.id })
      .then((data) => {
        setTableData(tableData.filter((item) => item.id !== selectedTable.id));
        setSelectedTable();
        notification.success({
          message: "Success",
          description: "Successfully Deleted Class",
        });
      })
      .catch((err) =>
        notification.error({
          message: "Error",
          description: err.response.data.message,
        })
      );
  };

  const isStudentIdExists = (student_id) => {
    return (
      selectedTable.students &&
      selectedTable.students.some(
        (student) => student.student_id === student_id
      )
    );
  };

  const getStudentInfoByEmail = (email) => {
    const student = allStudents.find((student) => student.email === email);

    if (student) {
      return {
        student_id: student.id,
        name: student.name,
        class_id: selectedTable.id,
      };
    } else {
      return null; // Returns null if no student is found with the given email
    }
  };

  const filteredStudents = missedStudents
    ? missedStudents.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const activeSchool = async () => {
    if (selectedTable) {
      try {
        // Optimistically update the status in `selectedTable` and table data
        const newStatus =
          selectedTable.status === "active" ? "block" : "active";
        setTableData((prevData) =>
          prevData.map((school) =>
            school.id === selectedTable.id
              ? { ...school, status: newStatus }
              : school
          )
        );

        // Update selectedTable with the new status
        setSelectedTable({ ...selectedTable, status: newStatus });

        // Call the API to persist the change
        await AdminAPI.BlockSchool({
          schoolId: selectedTable.id,
          action: newStatus,
        });

        // Fetch updated data for consistency
        const data = await AdminAPI.getSchools({});
        setTableData(data.data);
      } catch (error) {
        console.error("An error occurred:", error);
        notification.error({
          message: "Error",
          description:
            error.response?.data?.message || "Failed to update status.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-100">
      <h1 className="page-header">
        <i className="fas fa-lg fa-fw me-2 fa-heartbeat"></i>
        Manage Schools
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
                    className="bi bi-x-diamond"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                </div>
                <div className="logo-text">{translate("Schools")}</div>
              </Link>
            </div>

            <div className="d-flex align-items-center">
              <div className="hide-sm me-4">
                {tableData ? tableData.length : 0} {translate("founded")}
              </div>
              {/* <button
                type="button"
                className="btn btn-theme btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#modalAddClass"
              >
                <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                {translate("add-teacher")}
              </button> */}
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
                                  href="#"
                                  className="pos-checkout-table-container"
                                  onClick={(event) =>
                                    toggleMobileSidebar(event, table)
                                  }
                                >
                                  <div className="pos-checkout-table-header">
                                    <div className="status">
                                      <i className="bi bi-circle-fill"></i>
                                    </div>
                                    <div className="fw-bold">School</div>
                                    {/* <div className="fw-bold display-6">
                                      {table.id.substr(0, 5) +
                                        (table.id.length > 5 ? "..." : "")}
                                    </div> */}
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
                      <div className="pos-order">
                        {userInfo.type != "Student" &&
                        selectedTable?.students ? (
                          <div>
                            {selectedTable.students.map((student, idx) => {
                              return (
                                <span
                                  role="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalEditStudent"
                                  className={`badge rounded-pill p-2 mx-1 ${
                                    student.status === "active"
                                      ? "bg-success"
                                      : "bg-danger"
                                  }`}
                                  onClick={() => {
                                    setEditStudent(idx);
                                    setEditStudentStatus(student.status);
                                  }}
                                >
                                  {student.name}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          ""
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
                      {/* {translate("id")}:{" "} */}
                      <b className="text-theme text-dark fs-5">
                        {/* {selectedTable ? selectedTable.id : "-"} */}
                      </b>
                    </div>
                  </div>
                  <hr className="m-0 opacity-3 text-primary" />
                  <PerfectScrollbar className="pos-sidebar-body">
                    {/* {userInfo.type != "Student" && selectedTable ? (
                        <button
                          type="button"
                          className="btn btn-light btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#modalEditClass"
                        >
                          Edit
                        </button>
                      ) : (
                        ""
                      )} */}
                    <hr className="m-0 opacity-3 text-primary" />
                    <div className="h-100">
                      {/* <div className="pos-order py-3 h-50 text-wrap text-break overflow-auto">
                        {selectedTable?.description}
                      </div> */}
                      {selectedTable?.id && (
                        <div
                          className="pos-order py-3 h-10 text-wrap text-break overflow-auto  cursor-pointer"
                          onClick={handleNavigate}
                        >
                          <span className="text-decoration-underline mr-1">
                            See more about school {`"${selectedTable?.id}"`}
                          </span>
                          <i class="bi bi-hand-index-fill rotate-right text-yellow rotate-right"></i>
                        </div>
                      )}
                      {selectedTable?.teacherCount > 1 && (
                        <div className="pos-order py-3 h-10 text-wrap text-break overflow-auto  cursor-pointer">
                          <span className="text-decoration-underline mr-1">
                            Count of Teachers:{" "}
                            {`${selectedTable?.teacherCount - 1}`}
                          </span>
                        </div>
                      )}
                      {selectedTable?.studentCount > 0 && (
                        <div className="pos-order py-3 h-10 text-wrap text-break overflow-auto  cursor-pointer">
                          <span className="text-decoration-underline mr-1">
                            Count of Students:{" "}
                            {`${selectedTable?.studentCount}`}
                          </span>
                        </div>
                      )}
                      {selectedTable?.websiteUrl && (
                        <div className="pos-order py-3 h-10 text-wrap text-break overflow-auto  cursor-pointer">
                          <span className="text-decoration-underline mr-1">
                            School Website: {`${selectedTable?.websiteUrl}`}
                          </span>
                        </div>
                      )}
                      {selectedTable?.schoolEmail && (
                        <div className="pos-order py-3 h-10 text-wrap text-break overflow-auto  cursor-pointer">
                          <span className="text-decoration-underline mr-1">
                            School Name: {`${selectedTable?.schoolEmail}`}
                          </span>
                        </div>
                      )}
                      {selectedTable?.email && (
                        <div className="pos-order py-3 h-10 text-wrap text-break overflow-auto  cursor-pointer">
                          <span className="text-decoration-underline mr-1">
                            School Admin Email: {`${selectedTable?.email}`}
                          </span>
                        </div>
                      )}
                      {selectedTable?.name && (
                        <div className="pos-order py-3 h-10 text-wrap text-break overflow-auto  cursor-pointer">
                          <span className="text-decoration-underline mr-1">
                            School Admin Name: {`${selectedTable?.name}`}
                          </span>
                        </div>
                      )}
                      {selectedTable?.status && (
                        <div
                          className={`pos-order py-3 cursor-pointer ${
                            selectedTable?.status === "active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                          data-bs-toggle="modal"
                          data-bs-target="#modalEditSchool"
                        >
                          {selectedTable?.status == "active"
                            ? "Activated"
                            : "Blocked"}
                        </div>
                      )}
                    </div>
                  </PerfectScrollbar>
                  {/* {selectedTable && userInfo.type !== "Student" && (
                    <div className="pos-sidebar-footer">
                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-lg w-100"
                          onClick={handleDeleteClass}
                        >
                          {translate("delete-selected-class")}
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="modal fade" id="modalAddClass">
        <div className="modal-dialog">
          <div className="modal-content">
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
                    })}
                    placeholder=""
                    id="classroomName"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
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
                    <label className="form-label mb-0">
                      {translate("save")}
                    </label>
                  </button>
                )}
                {addClassLoading === loadingState.loading && <BarsScale />}
                {addClassLoading === loadingState.after && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                  >
                    <label className="form-label">{translate("done")}</label>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalEditClass">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Classroom</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleEditClass}>
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
                    value={className}
                    id="classroomEditedName"
                    onChange={(e) => setClassName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {translate("description")}
                  </label>
                  <textarea
                    className="form-control form-control-lg bg-white bg-opacity-5"
                    rows="5"
                    placeholder=""
                    value={classDesc}
                    onChange={(e) => setClassDesc(e.target.value)}
                    id="classroomEditedDescription"
                  />
                </div>
              </div>
              <div className="modal-footer">
                {editClassLoading === loadingState.before && (
                  <button type="submit" className="btn btn-outline-theme">
                    <label className="form-label">{translate("save")}</label>
                  </button>
                )}
                {editClassLoading === loadingState.loading && <BarsScale />}
                {editClassLoading === loadingState.after && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                    onClick={() => setEditClassLoading(loadingState.before)}
                  >
                    <label className="form-label">{translate("done")}</label>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalEditSchool">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Student</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  {selectedTable ? (
                    <div>
                      <label className="form-label">
                        {`Name: ${selectedTable?.schoolEmail}`}
                      </label>
                      <br />

                      <label className="form-label">
                        {`ID: ${selectedTable?.id}`}
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <div>
                  {/* <button
                    type="button"
                    className="btn btn-danger m-1"
                    data-bs-dismiss="modal"
                    // onClick={handleRemoveSchool}
                  >
                    Remove
                  </button> */}
                  {selectedTable?.status === "active" ? (
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                      onClick={activeSchool}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success m-1"
                      data-bs-dismiss="modal"
                      onClick={activeSchool}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolManagement;
