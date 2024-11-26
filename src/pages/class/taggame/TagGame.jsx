/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { Card, CardBody } from "./../../../components/card/card.jsx";
import { AppSettings } from "./../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import TagApi from "../../../api-clients/TagApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";
import { toast } from "react-toastify";
import { AdminAPI } from "../../../api-clients/AdminApi.js";
import "./TagGame.scss";

const loadingState = {
  before: 0,
  loading: 1,
  after: 2,
};

const TagGame = () => {
  const context = useContext(AppSettings);
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState();
  const [additionalClassName, setAdditionalClassName] = useState();
  const [className, setClassName] = useState("");
  const [classDesc, setClassDesc] = useState("");
  const [editStudent, setEditStudent] = useState(0);
  const [joinClassLoading, setJoinClassLoading] = useState(loadingState.before);
  const [editStudentStatus, setEditStudentStatus] = useState("blocked");

  const [loading, setLoading] = useState(false);
  const [addClassLoading, setAddClassLoading] = useState(loadingState.before);
  const { translate } = useLanguageToggle();
  const [addSelectedStudent, setAddSelectedStudent] = useState();
  const [missedStudents, setMissedStudents] = useState([]);
  const [editClassLoading, setEditClassLoading] = useState(loadingState.before);
  const [addedGmail, setAddedGmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [allStudents, setAllStudents] = useState([]);

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

  const isStudentIdExists = (student_id) => {
    return (
      selectedTable.students &&
      selectedTable.students.some(
        (student) => student.student_id === student_id
      )
    );
  };

  function toggleMobileSidebar(event, table) {
    event.preventDefault();

    setPosMobileSidebarToggled(true);
    setSelectedTable({
      ...table,
      students:
        table.students?.sort((a, b) => a.name.localeCompare(b.name)) || [],
    });

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

  useEffect(() => {
    // Function to handle fetching classrooms for a student
    const fetchStudentClassrooms = async () => {
      setLoading(true);
      try {
        const query = { student_id: userInfo.uid };
        const res = await TagApi.getJoinedClassrooms(query);

        // Update classrooms with student-specific status
        const updatedClassrooms = res.data.map((classroom) => {
          const student = classroom.students.find(
            (student) => student.student_id === userInfo.uid
          );
          if (student) {
            classroom.status = student.status; // Add status to classroom data
          }
          return classroom;
        });

        setTableData(updatedClassrooms);
      } catch (error) {
        console.error("Error fetching classrooms for student:", error);
      } finally {
        setLoading(false);
      }
    };

    // Function to handle fetching classrooms and students for a teacher
    const fetchTeacherData = async () => {
      setLoading(true);
      try {
        const classroomsRes = await TagApi.getClassroomsByTeacherId({
          teacher_id: userInfo.uid,
        });
        setTableData(classroomsRes.data.ret);

        const studentsRes = await AdminAPI.getStudent({
          schoolId: userInfo.schoolId,
        });
        setAllStudents(studentsRes.data.rows);
        setMissedStudents(studentsRes.data.rows);
      } catch (error) {
        notification.error({
          message: "Error",
          description: error.response?.data?.message || "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    // Determine if user is a student or teacher/admin and fetch the appropriate data
    if (userInfo.type === "Student") {
      fetchStudentClassrooms();
    } else {
      fetchTeacherData();
    }

    // Set layout context settings
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    // Clean up function to reset layout settings on component unmount
    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, [userInfo]);

  const handleAddStudent = () => {
    setJoinClassLoading(loadingState.loading);
    console.log(addSelectedStudent);
    const exists = isStudentIdExists(addSelectedStudent?.student_id);

    if (!exists) {
      TagApi.joinClassroom(addSelectedStudent)
        .then((res) => {
          let tmpTableData = tableData;
          console.log("Start => ", tmpTableData, selectedTable);
          for (let i = 0; i < tmpTableData.length; i++) {
            if (tmpTableData[i].id === selectedTable.id) {
              console.log("Second => ", tmpTableData[i]);
              tmpTableData[i].school_id = selectedTable.id;
              if (!tmpTableData[i].students)
                tmpTableData[i].students = [
                  {
                    name: addSelectedStudent.name,
                    student_id: addSelectedStudent.student_id,
                  },
                ];
              else
                tmpTableData[i].students.push({
                  name: addSelectedStudent.name,
                  student_id: addSelectedStudent.student_id,
                });
              console.log("Third => ", tmpTableData[i]);
              break;
            }
          }

          console.log("Finish => ", tmpTableData);
          setTableData(tmpTableData);
          setMissedStudents(
            missedStudents.filter(
              (item) => item.id !== addSelectedStudent.student_id
            )
          );

          setJoinClassLoading(loadingState.after);
        })
        .catch((_err) => {
          setJoinClassLoading(loadingState.after);
        });
    } else {
      setJoinClassLoading(loadingState.after);
      toast.error("Already that student has existed.", { autoClose: 3000 });
    }
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

  const blockStudent = () => {
    if (
      selectedTable &&
      selectedTable.students &&
      selectedTable.students.length > 0
    ) {
      let updatedStudents = selectedTable?.students;
      updatedStudents[editStudent].status = "blocked";

      updatedStudents = updatedStudents.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const body = {
        teacher_id: userInfo.uid,
        school_id: selectedTable.id,
        students: updatedStudents,
      };

      TagApi.editClassroom(body)
        .then((res) => {
          const index = tableData.findIndex(
            (item) => item.id === selectedTable.id
          );
          const tmpTableData = tableData;
          const updatedData = {
            students: updatedStudents,
          };

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
        .finally(() => console.log("Finished!"));
    }
  };

  const activeStudent = () => {
    if (
      selectedTable &&
      selectedTable.students &&
      selectedTable.students.length > 0
    ) {
      let updatedStudents = selectedTable?.students;
      updatedStudents[editStudent].status = "active";

      updatedStudents = updatedStudents.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      const body = {
        teacher_id: userInfo.uid,
        school_id: selectedTable.id,
        students: updatedStudents,
      };

      TagApi.editClassroom(body)
        .then((res) => {
          const index = tableData.findIndex(
            (item) => item.id === selectedTable.id
          );
          const tmpTableData = tableData;
          const updatedData = {
            students: updatedStudents,
          };

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
        .finally(() => console.log("Finished!"));
    }
  };

  const handleAddStudentByGmail = () => {
    setJoinClassLoading(loadingState.loading);
    const addedStudentByGmail = getStudentInfoByEmail(addedGmail);
    const exists = isStudentIdExists(addedStudentByGmail.student_id);
    if (!exists) {
      TagApi.joinClassroom(addedStudentByGmail)
        .then((res) => {
          let tmpTableData = tableData;
          console.log("Start => ", tmpTableData, selectedTable);
          for (let i = 0; i < tmpTableData.length; i++) {
            if (tmpTableData[i].id === selectedTable.id) {
              console.log("Second => ", tmpTableData[i]);
              tmpTableData[i].school_id = selectedTable.id;
              if (!tmpTableData[i].students)
                tmpTableData[i].students = [
                  {
                    name: addedStudentByGmail.name,
                    student_id: addedStudentByGmail.student_id,
                  },
                ];
              else
                tmpTableData[i].students.push({
                  name: addedStudentByGmail.name,
                  student_id: addedStudentByGmail.student_id,
                });
              console.log("Third => ", tmpTableData[i]);
              break;
            }
          }

          console.log("Finish => ", tmpTableData);
          setTableData(tmpTableData);
          setMissedStudents(
            missedStudents.filter(
              (item) => item.id !== addedStudentByGmail.student_id
            )
          );

          setJoinClassLoading(loadingState.after);
        })
        .catch((_err) => {
          setJoinClassLoading(loadingState.after);
        });
    } else {
      setJoinClassLoading(loadingState.after);
      toast.error("Already that student has existed.", { autoClose: 3000 });
    }
  };

  const handleAddClass = (event) => {
    event.preventDefault();

    if (userInfo.permission.tag === false) {
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
        schoolId: userInfo.schoolId,
      };

      setAddClassLoading(loadingState.loading);
      TagApi.addClassroom(body)
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
      TagApi.editClassroom(body)
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
    TagApi.deleteClassroom({ class_id: selectedTable.id })
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
  const handleRemoveStudent = () => {
    let removedStudents = [...selectedTable?.students];
    removedStudents.splice(editStudent, 1);

    removedStudents = removedStudents.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Adjust `editStudent` if it's out of bounds after the removal
    const newEditStudent = Math.min(editStudent, removedStudents.length - 1);

    const body = {
      teacher_id: userInfo.uid,
      school_id: selectedTable.id,
      students: removedStudents,
    };

    TagApi.editClassroom(body)
      .then((res) => {
        const index = tableData.findIndex(
          (item) => item.id === selectedTable.id
        );
        const tmpTableData = [...tableData];
        const updatedData = {
          students: removedStudents,
        };

        if (index !== -1) {
          tmpTableData[index] = { ...tmpTableData[index], ...updatedData };
          let tmpSelectedData = { ...selectedTable, ...updatedData };
          setSelectedTable(tmpSelectedData);
          setTableData(tmpTableData);
        }

        // Update editStudent to the new valid index
        setEditStudent(newEditStudent);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => console.log("Finished!"));
  };

  const handleJoinClass = (event) => {
    event.preventDefault();

    const classId = event.target.classroomId.value;

    if (classId !== "") {
      const body = {
        class_id: classId,
        student_id: userInfo.uid,
        name: userInfo.name,
      };

      setJoinClassLoading(loadingState.loading);
      TagApi.joinClassroom(body)
        .then((res) => {
          const updatedData = {
            ...res.data,
            id: res.data.school_id, // Add the "id" field
          };
          // Check if the class already exists in tableData by class_id
          const classExists = tableData.some(
            (classroom) => classroom.class_id === updatedData.class_id
          );

          if (!classExists) {
            // Only add the class if it does not already exist
            setTableData([...tableData, updatedData]);
          } else {
            toast.info("You are already enrolled in this class.", {
              autoClose: 3000,
            });
          }
          setJoinClassLoading(loadingState.after);
        })
        .catch((_err) => {
          toast.error(_err.response.data.status, { autoClose: 3000 });
          setJoinClassLoading(loadingState.after);
        });
    }
  };

  const filteredStudents = missedStudents
    ? missedStudents
        .filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
    : [];

  console.log(selectedTable);

  return (
    <div className="h-100">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">{translate("manage-classrooms")}</a>
        </li>
      </ul>

      <h1 className="page-header">
        <i className="fas fa-lg fa-fw me-2 fa-heartbeat"></i>
        {translate("tag-game")}{" "}
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
              {userInfo.type !== "Student" && (
                <button
                  type="button"
                  className="btn btn-theme btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#modalAddClass"
                >
                  <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                  {translate("add-class")}
                </button>
              )}
              {userInfo.type === "Student" && (
                <button
                  type="button"
                  className="btn btn-theme btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#modalJoinClass"
                >
                  <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                  {translate("join-classroom")}
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
                                      <i className="bi bi-circle-fill"></i>
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
                      {userInfo.type != "Student" &&
                      selectedTable &&
                      tableData &&
                      tableData.length > 0 ? (
                        <div className="d-flex justify-content-between w-100">
                          <div className="d-flex align-items-center">
                            <h5 className="pe-2">Students</h5>
                            <h6>
                              {selectedTable?.students
                                ? `${selectedTable?.students.length} found`
                                : "Not founded"}
                            </h6>
                          </div>
                          <div className="d-flex gap-3">
                            <button
                              type="button"
                              className="btn btn-theme btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#modalAddStudentByGmail"
                            >
                              <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                              Add Student By Email
                            </button>
                            <button
                              type="button"
                              className="btn btn-theme btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#modalAddStudent"
                            >
                              <i className="fas fa-lg fa-fw me-2 fa-plus"></i>
                              Add Student
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="pos-order">
                        {userInfo.type != "Student" &&
                        selectedTable?.students ? (
                          <div className="pos-order-students">
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
                      {translate("id")}:{" "}
                      <b className="text-theme text-dark fs-5">
                        {selectedTable ? selectedTable.id : "-"}
                      </b>
                    </div>
                  </div>
                  <hr className="m-0 opacity-3 text-primary" />
                  <PerfectScrollbar className="pos-sidebar-body">
                    <div className="d-flex justify-content-between w-100">
                      <h5 className="pos-order py-3">
                        Class Name: {selectedTable?.name}
                      </h5>
                      {userInfo.type != "Student" && selectedTable ? (
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
                      )}
                    </div>
                    <div className="d-flex justify-content-between w-100">
                      <h5 className="pos-order py-3">
                        Teacher Name: {selectedTable.teacherName}
                      </h5>
                    </div>
                    <hr className="m-0 opacity-3 text-primary" />
                    <div>
                      {selectedTable?.status && (
                        <div
                          className={`pos-order py-3 ${
                            selectedTable?.status === "active"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {selectedTable?.status}
                        </div>
                      )}
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
                          className="btn btn-outline-danger btn-lg w-100"
                          onClick={handleDeleteClass}
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
                    <label className="form-label  mb-0">
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
                    <label className="form-label  mb-0">
                      {translate("done")}
                    </label>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalAddStudent">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Student</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Students
                    <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex justify-content-between align-items-start">
                    {filteredStudents &&
                    filteredStudents.length > 0 &&
                    selectedTable ? (
                      <select
                        className="form-select"
                        style={{ width: 200 }}
                        onChange={(e) => {
                          setAddSelectedStudent({
                            student_id: filteredStudents[e.target.value].id,
                            name: filteredStudents[e.target.value].name,
                            class_id: selectedTable.id,
                          });
                        }}
                      >
                        {filteredStudents.map((student, idx) => (
                          <option value={idx}>{student.name}</option>
                        ))}
                      </select>
                    ) : (
                      <h6> No available students </h6>
                    )}
                    <div>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {joinClassLoading === loadingState.before && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    onClick={handleAddStudent}
                  >
                    <label className="form-label mb-0">Add Student</label>
                  </button>
                )}
                {joinClassLoading === loadingState.loading && <BarsScale />}
                {joinClassLoading === loadingState.after && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                    onClick={() => setJoinClassLoading(loadingState.before)}
                  >
                    <label className="form-label mb-0">
                      {translate("done")}
                    </label>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalAddStudentByGmail">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Student By Email</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Students
                    <span className="text-danger">*</span>
                  </label>
                  <div className="d-flex justify-content-between align-items-start">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Write Email..."
                      value={addedGmail}
                      onChange={(e) => setAddedGmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {joinClassLoading === loadingState.before && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    onClick={handleAddStudentByGmail}
                  >
                    <label className="form-label mb-0">Add Student</label>
                  </button>
                )}
                {joinClassLoading === loadingState.loading && <BarsScale />}
                {joinClassLoading === loadingState.after && (
                  <button
                    type="button"
                    className="btn btn-outline-theme"
                    data-bs-dismiss="modal"
                    onClick={() => setJoinClassLoading(loadingState.before)}
                  >
                    <label className="form-label mb-0">
                      {translate("done")}
                    </label>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modalEditStudent">
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
                  {selectedTable &&
                  selectedTable.students &&
                  selectedTable.students.length > 0 ? (
                    <div>
                      <label className="form-label">
                        {`Name: ${selectedTable.students[editStudent].name}`}
                      </label>
                      <br />

                      <label className="form-label">
                        {`ID: ${selectedTable.students[editStudent].student_id}`}
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <div>
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    data-bs-dismiss="modal"
                    onClick={handleRemoveStudent}
                  >
                    Remove
                  </button>
                  {editStudentStatus === "active" ? (
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                      onClick={blockStudent}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success m-1"
                      data-bs-dismiss="modal"
                      onClick={activeStudent}
                    >
                      Active
                    </button>
                  )}
                </div>
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
                    <label className="form-label mb-0">
                      {translate("save")}
                    </label>
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
                    <label className="form-label  mb-0">
                      {translate("done")}
                    </label>
                  </button>
                )}
              </div>
            </form>
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
};

export default TagGame;
