import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Modal, notification, Spin } from 'antd';
import { Link, useParams, useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { FillingGapQuiz, MultiChoiceExtraQuiz, TrueFalseQuiz, MultiChoiceQuiz, LongAnswerQuiz, DragAndMatchQuiz, DragAndOrderQuiz } from "../../../components/QBQuiz";

import SkillDrillApi from "../../../api-clients/SkillDrillApi.js";
import QBApi from "../../../api-clients/QBApi.js";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

function SDEditClass() {
  const context = useContext(AppSettings);
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [selectedSubjectData, setSelectedSubjectData] = useState();
  const [selectedTopicData, setSelectedTopicData] = useState();
  const [selectedBatch, setSelectedBatch] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [curLevel, setCurLevel] = useState(1);
  const { classId } = useParams();
  const { translate } = useLanguageToggle();

  const location = useLocation();
  const { classInfo } = location.state;
  console.log('clas:', classInfo);
  const [quizData, setQuizData] = useState(classInfo.questions);
  const [currentBatchData, setCurrentBatchData] = useState(classInfo.questions['0']);
  const [className, setClassName] = useState(classInfo.name);
  const [classDescription, setClassDescription] = useState(
    classInfo.description
  );

  useEffect(() => {
    const getSubjectAndTopic = async () => {
      setLoading(true);
      const subjects = await QBApi.getSubjects({ teacher_id: userInfo.uid });
      setSubjectData(subjects.data);

      const _topicData = [];
      for (const subject of subjects.data) {
        const response = await QBApi.getTopics({ teacher_id: subject.teacher_id, subject_id: subject.id });
        response.data.forEach((topic) => {
          const _topic = {
            subject_id: subject.id,
            topic_id: topic.id,
            topic_name: topic.name,
          }
          _topicData.push(_topic);
        })
      }
      await setTopicData(_topicData);
      if (classInfo.bankInfo && classInfo.bankInfo) {
        setSelectedSubjectData(classInfo.bankInfo.subjectId);
        setSelectedTopicData(classInfo.bankInfo.topicId);
      } else {
        await setSelectedSubjectData(subjects.data.at(0).id);
      }
      setLoading(false);
    };

    getSubjectAndTopic();
  }, [classId]);

  useEffect(() => {
    topicData.forEach((topic) => {
      console.log('effect calling:', topic.topic_id);
      if (topic.subject_id === selectedSubjectData) {
        console.log('set orignskekr', topic.topic_id);
        setSelectedTopicData(topic.topic_id);
        return;
      }
    });
  }, [selectedSubjectData]);

  useEffect(() => {
    console.log('effect called?');
    if (classInfo.questions && classInfo.questions[`${selectedBatch + 1}`]) {
      console.log('curlevel:', curLevel);
      console.log('insta:', classInfo.questions[`${selectedBatch + 1}`].filter(quiz => Number(quiz.level) === curLevel));
      setCurrentBatchData(curLevel === 0 ? classInfo.questions[`${selectedBatch + 1}`] : classInfo.questions[`${selectedBatch + 1}`].filter(quiz => Number(quiz.level) === curLevel));
    }
  }, [curLevel]);

  useEffect(() => {
    context.setAppHeaderNone(true);
    context.setAppSidebarNone(true);
    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    return function cleanUp() {
      context.setAppHeaderNone(false);
      context.setAppSidebarNone(false);
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };

    // eslint-disable-next-line
  }, []);

  var toggleMobileSidebar = (event) => {
    event.preventDefault();
    setPosMobileSidebarToggled(true);
  };

  var dismissMobileSidebar = (event) => {
    event.preventDefault();
    setPosMobileSidebarToggled(false);
  };

  const handleSubjectChange = (event) => {
    event.preventDefault();
    setSelectedSubjectData(event.target.value);
  }

  const handleSaveInfo = () => {
    setLoading(true);
    SkillDrillApi.setBankInfo({
      classId,
      selectedBatch,
      teacher_id: subjectData.filter(item => item.id === selectedSubjectData)[0].teacher_id,
      subjectId: selectedSubjectData,
      topicId: selectedTopicData,
    }).then((data) => {
      setQuizData(data.data.result);
      console.log('data:', data.data.result);
      setCurrentBatchData(data.data.result[`${selectedBatch + 1}`]);
      classInfo.bankInfo = {
        subjectId: selectedSubjectData,
        topicId: selectedTopicData,
      };
      classInfo.questions = data.data.result;
      notification.success({
        message: 'Success',
        description: 'Successfully Updated Bank Information'
      });
    }).catch(err => {
      if (err.response.data.type === 'count-error') {
        Modal.warn({
          title: 'Use Hook!',
          content: (
            <>
              <p>{err.response.data.message}</p>
            </>
          ),
        });
        return;
      }
      notification.error({
        message: 'Error',
        description: err.response.data.message,
      });
    }).finally(() => setLoading(false));
  }

  const handleSelectBatch = (index) => {
    setSelectedBatch(index);

    setCurrentBatchData(quizData[`${index + 1}`]);
  };

  return (
    <div className="h-100">
      <Card
        className={
          "pos " + (posMobileSidebarToggled ? "pos-mobile-sidebar-toggled" : "")
        }
        id="pos"
      >
        <CardBody className="pos-container">
          <div className="pos-sidebar" id="pos-sidebar">
            <div className="h-100 d-flex flex-column p-0">
              <CardHeader>
                <div className="d-flex justify-content-between align-items-center py-2">
                  <div className="title">
                    {translate("classroom-infomations")}
                  </div>
                  <Link className="icon" to="/class/quiz/SD">
                    <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>{" "}
                    {translate("return")}
                  </Link>
                </div>
              </CardHeader>

              <div className="pos-sidebar-header">
                <div className="back-btn">
                  <button
                    type="button"
                    onClick={dismissMobileSidebar}
                    className="btn"
                  >
                    <i className="bi bi-chevron-left me-2"></i>
                    {translate("back")}
                  </button>
                </div>
              </div>

              <PerfectScrollbar className="pos-sidebar-body tab-content h-100">
                <div className="px-3">
                  <div className="mb-3">
                    <label className="form-label">
                      {translate("name")}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={clsx({
                        "form-control form-control-md bg-white bg-opacity-5": true,
                        "is-invalid": className === "",
                      })}
                      placeholder=""
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      {" "}
                      {translate("description")}
                    </label>
                    <textarea
                      className="form-control form-control-md bg-white bg-opacity-5"
                      rows="6"
                      placeholder=""
                      value={classDescription}
                      onChange={(e) => setClassDescription(e.target.value)}
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
                        "form-control form-control-md bg-white bg-opacity-5": true,
                        "is-invalid": className === "",
                      })}
                      placeholder=""
                      defaultValue={classInfo.batchCount}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      {translate("questions-per-batch")}{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className={clsx({
                        "form-control form-control-md bg-white bg-opacity-5": true,
                        "is-invalid": className === "",
                      })}
                      placeholder=""
                      defaultValue={classInfo.questionCount}
                    />
                  </div>
                  {/* <div className="mt-3">
                    <div className="btn-group d-flex">
                      <button
                        className="btn btn-outline-theme rounded-0 w-150px"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAddClass"
                      >
                        <span className="small">Edit Demotion/Promotion Rule</span>
                      </button>
                    </div>
                  </div> */}
                </div>
                <br />
              </PerfectScrollbar>

              {/* <div className="pos-sidebar-footer">

                <div className="mt-3">
                  {updateClassLoading ? (
                    <div className="d-flex justify-content-center">
                      <BarsScale />
                    </div>
                  ) : (
                    <div className="btn-group d-flex">
                      <button
                        className="btn btn-outline-theme rounded-0 w-150px"
                        onClick={() => handleUpdateClassInfo()}
                      >
                        <i className="far fa-lg fa-fw me-2 fa-save"></i>
                        <br />
                        <span className="small">Save Information</span>
                      </button>
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>

          <div className="pos-menu">
            <div className="logo">
              <Link to="/">
                <div className="logo-img">
                  <i
                    className="bi bi-x-diamond"
                    style={{ fontSize: "2.1rem" }}
                  ></i>
                </div>
                <div className="logo-text">{translate("skill-drill")}</div>
              </Link>
            </div>
            <div className="nav-container">
              <PerfectScrollbar className="h-100">
                <ul className="nav nav-tabs">
                  <li className="nav-item" key="import-id">
                    <div
                      className={clsx({
                        "nav-link": true,
                        "active": selectedBatch === -2,
                      })}
                      onClick={() => { handleSelectBatch(-2); }}
                      style={{ cursor: "pointer" }}
                    >
                      <Card>
                        <CardBody>
                          <i className="fa fa-fw fa-university"></i>
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {translate("import-from-question-bank")}
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </li>
                  <li className="nav-item" key="pre-test">
                    <div
                      className={clsx({
                        "nav-link": true,
                        "active": selectedBatch === -1,
                      })}
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleSelectBatch(-1); }}
                    >
                      <Card>
                        <CardBody>
                          <i className="fa fa fa-mortar-board"></i>
                          <div style={{ whiteSpace: "pre-wrap" }}>
                            {translate("pretest-rookie-level")}
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </li>
                  {
                    classInfo.batchCount && Array(Number(classInfo.batchCount - 1)).fill().map((_, index) => (
                      <li className="nav-item" key={index}>
                        <div
                          className={clsx({
                            "nav-link": true,
                            "active": selectedBatch === index,
                          })}
                          style={{ cursor: "pointer" }}
                          onClick={() => { handleSelectBatch(index); }}
                        >
                          <Card>
                            <CardBody>
                              <i className="fa fa-fw fa-star-half"></i>
                              <div style={{ whiteSpace: "pre-wrap" }}>
                                  {`${translate("batch")}${index + 1}`}
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </li>)
                    )
                  }
                </ul>
              </PerfectScrollbar>
            </div>
          </div>

          <div className="pos-content">
            <PerfectScrollbar className="pos-content-container h-100 p-4">
              {
                loading ? <Spin /> : (
                  <div>
                    {
                      selectedBatch === -2 &&
                      <Card className="mb-3">
                        <div className="info text-center mt-3">
                        <h5>{translate("bank-subject-info")}:</h5>
                          <p className="mt-2">
                            {
                              classInfo.bankInfo &&
                                subjectData.filter((item) => item.id === classInfo.bankInfo.subjectId).length > 0 ? subjectData.filter((item) => item.id === classInfo.bankInfo.subjectId)[0].name : 'Not Selected Yet'
                            }
                          </p>
                        <h5>{translate("bank-topic-info")}:</h5>
                          <p className="mt-2">
                            {
                              classInfo.bankInfo &&
                                topicData.filter((item) => item.topic_id === classInfo.bankInfo.topicId).length > 0 ? topicData.filter((item) => item.topic_id === classInfo.bankInfo.topicId)[0].topic_name : 'Not Selected Yet'
                            }
                          </p>
                        </div>
                        <form className="was-validated">
                          <CardHeader className="d-flex justify-content-between align-items-center">
                            <div className="me-2 fa-lg p-2">
                            {translate("select-subject-and-import")}
                          </div>                            {/* <div>
                      <div className="btn-group btn-group-sm d-flex">
                        <button
                          className="btn btn-outline-danger rounded-sm"
                        >
                          <i className="fas fa-md fa-fw fa-trash-alt"></i>
                        </button>
                        <>
                          <button
                            className="btn btn-outline-theme rounded-sm"
                            type="submit"
                          >
                            <i className="fas fa-md fa-fw fa-save"></i>
                          </button>
                          <button
                            className="btn btn-outline-default rounded-sm"
                          >
                            <i className="fas fa-md fa-fw fa-window-close"></i>
                          </button>
                        </>
                      </div>
                    </div> */}
                          </CardHeader>
                          <CardBody>
                            {(
                              <div>
                                <div className="mb-3">
                                  <label className="form-label">
                                  {translate("question-subject")}{" "}
                                    Question Subject <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    className="form-select form-select-lg bg-white bg-opacity-5"
                                    id="questionSubject"
                                    onChange={handleSubjectChange}
                                  >
                                    {subjectData && subjectData.length > 0 ? (
                                      subjectData.map((subject, index) => (
                                        <option key={index} value={subject.id}>{subject.name}</option>
                                      ))
                                    ) : <option value="0" disabled>
                                      {translate("no-subject")}
                                    </option>}
                                  </select>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">
                                  {translate("question-topic")}{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    className="form-select form-select-lg bg-white bg-opacity-5"
                                    id="questionTopic"
                                    onChange={(e) => setSelectedTopicData(e.target.value)}
                                  >
                                    {topicData && topicData.length > 0 ? (
                                      topicData.filter((topic) => topic.subject_id === selectedSubjectData).map((top, index) => (
                                        <option key={index} value={top.topic_id}>{top.topic_name}</option>
                                      )
                                      )) : <option value="0" disabled>{translate("no-subject")}</option>}
                                  </select>
                                </div>
                                <button
                                  className="btn btn-outline-theme btn-sm mb-3"
                                  type="button"
                                  onClick={handleSaveInfo}
                                >
                                  {translate("update-bank-information")}
                                </button>
                              </div>)
                            }
                          </CardBody>
                        </form>
                      </Card>
                    }
                    {
                      selectedBatch !== -2 &&
                      <div>
                        <ul className="nav nav-tabs nav-tabs-v2 px-4 border" style={{ borderColor: "rgba(255, 255, 255, 0.3) !important" }}>
                          {[0, 1, 2, 3].map((level) => (
                            <li className="nav-item me-3" key={`level${level}`}>
                              <div
                                className={clsx({
                                  "nav-link px-2": true,
                                  active: level === 1,
                                })}
                                data-bs-toggle="tab"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  console.log('level', level);
                                  setCurLevel(level);
                                }}
                              >
                                {translate("level")} {level === 0 ? 'All' : level}
                              </div>
                            </li>
                          ))}
                        </ul>
                        {
                          !loading && currentBatchData &&
                          currentBatchData.map((quiz, index) => {
                            switch (parseFloat(quiz.type)) {
                              case 0:
                                return (
                                  <TrueFalseQuiz
                                    isEditable={false}
                                    key={`QB_TF_Quiz-${index}`}
                                    index={index}
                                    teacher_id={classInfo.bankInfo.teacher_id}
                                    subject_id={selectedSubjectData}
                                    topic_id={selectedTopicData}
                                    level={curLevel}
                                    data={quiz}
                                  />
                                );
                              case 1:
                                return (
                                  <MultiChoiceQuiz
                                    isEditable={false}
                                    key={`QB_MC_Quiz-${index}`}
                                    index={index}
                                    teacher_id={classInfo.bankInfo.teacher_id}
                                    subject_id={selectedSubjectData}
                                    topic_id={selectedTopicData}
                                    level={curLevel}
                                    data={quiz}
                                  />
                                );
                              case 6:
                                return (
                                  <MultiChoiceExtraQuiz
                                    isEditable={false}
                                    key={`QB_MCE_Quiz-${index}`}
                                    index={index}
                                    teacher_id={classInfo.bankInfo.teacher_id}
                                    subject_id={selectedSubjectData}
                                    topic_id={selectedTopicData}
                                    level={curLevel}
                                    data={quiz}
                                  />
                                );
                              case 2:
                                return (
                                  <FillingGapQuiz
                                    isEditable={false}
                                    key={`QB_FG_Quiz-${index}`}
                                    index={index}
                                    teacher_id={classInfo.bankInfo.teacher_id}
                                    subject_id={selectedSubjectData}
                                    topic_id={selectedTopicData}
                                    level={curLevel}
                                    data={quiz}
                                  />
                                );
                              case 3:
                                return (
                                  <LongAnswerQuiz
                                    isEditable={false}
                                    key={`QB_LA_Quiz-${index}`}
                                    index={index}
                                    teacher_id={classInfo.bankInfo.teacher_id}
                                    subject_id={selectedSubjectData}
                                    topic_id={selectedTopicData}
                                    level={curLevel}
                                    data={quiz}
                                  />
                                );
                              case 4:
                                return (
                                  <DragAndMatchQuiz
                                    isEditable={false}
                                    key={`QB_DM_Quiz-${index}`}
                                    index={index}
                                    teacher_id={classInfo.bankInfo.teacher_id}
                                    subject_id={selectedSubjectData}
                                    topic_id={selectedTopicData}
                                    level={curLevel}
                                    data={quiz}
                                  />
                                );
                              case 5:
                                return (
                                  <DragAndOrderQuiz
                                    isEditable={false}
                                    key={`QB_DO_Quiz-${index}`}
                                    index={index}
                                    teacher_id={classInfo.bankInfo.teacher_id}
                                    subject_id={selectedSubjectData}
                                    topic_id={selectedTopicData}
                                    level={curLevel}
                                    data={quiz}
                                  />
                                );
                              default:
                                break;

                            }
                          })
                        }
                      </div>
                    }
                  </div>
                )
              }

            </PerfectScrollbar>
          </div>
        </CardBody>
      </Card>
      {/* <div className="modal fade" id="modalAddClass">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Demotion / Promotion Rule</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleEditRule}>
              <div className="modal-body">
                <div className="mb-4">
                  <label className="form-label">
                    Leveling of Student <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-select-lg bg-white bg-opacity-5"
                    id="questionType"
                  >
                    <option value="0">Need help</option>
                    <option value="1">Strong</option>
                    <option value="2">Standard</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Need Help<span className="text-danger">*</span>
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
                    Standard<span className="text-danger">*</span>
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
                    Strong<span className="text-danger">*</span>
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
                  <div className="d-flex justify-content-center">
                    <h5>FAQ</h5>
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
                          What is&nbsp;<b>Leveling of Student</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
                          What is&nbsp;<b>Demotion</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                        >
                          What is&nbsp;<b>Promotion</b>?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-outline-theme">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-theme"
                  data-bs-dismiss="modal"
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <a
        href="#/"
        className="pos-mobile-sidebar-toggler"
        onClick={toggleMobileSidebar}
      >
        <i className="far fa-lg fa-fw fa-edit"></i>
      </a>
    </div >
  );
}

export default SDEditClass;
