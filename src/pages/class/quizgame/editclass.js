import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useParams, useLocation } from "react-router-dom";
import { Card, CardBody, CardHeader } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { loadingState } from "../../../utils/state";

import { TrueFalseQuiz } from "../../../components/quiz/TF.jsx";
import { MultiChoiceQuiz } from "../../../components/quiz/MC.jsx";
import { MultiChoiceExtraQuiz } from '../../../components/quiz/MCE.jsx';
import { FillingGapQuiz } from "../../../components/quiz/FG.jsx";
import { LongAnswerQuiz } from "../../../components/quiz/LA.jsx";
import { DragAndMatchQuiz } from "../../../components/quiz/DM.jsx";
import { DragAndOrderQuiz } from "../../../components/quiz/DO.jsx";
import QGApi from "../../../api-clients/QuizGameApi";
import QBApi from "../../../api-clients/QBApi.js";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import useLanguageToggle from "../../../hooks/useLanguageToggle.js";

const quiz_category = [
  {
    icon: "fa fa-fw fa-hand-peace",
    text: "True/False",
    type: 0,
  },
  {
    icon: "fa fa-fw  fa-hand-spock ",
    text: "Multiple Choice",
    type: 1,
  },
  {
    icon: "fa fa-fw fa-handshake",
    text: "Multiple Choice(Extra)",
    type: 6,
  },
  {
    icon: "fa fa-fw fa-hand-lizard",
    text: "Filling Gap",
    type: 2,
  },
  {
    icon: "fa fa-fw fa-hand-paper",
    text: "Long Answer",
    type: 3,
  },
  {
    icon: "fa fa-fw fa-hand-scissors",
    text: "Drag and Match",
    type: 4,
  },
  {
    icon: "fa fa-fw fa-hand-rock",
    text: "Drag and Order",
    type: 5,
  },
];

const TF_Quiz_Template = {
  question: "",
  type: 0,
  answer: false,
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

const MC_Quiz_Template = {
  question: "",
  type: 1,
  subQuestions: ["", ""],
  answer: "A",
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

const MC_Extra_Quiz_Template = {
  question: "",
  type: 6,
  subQuestions: ["", ""],
  answer: "A",
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

const FG_Quiz_Template = {
  question: "",
  type: 2,
  answer: [],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

const LA_Quiz_Template = {
  question: "",
  type: 3,
  answer: "",
  keyPhrases: [],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

const DM_Quiz_Template = {
  question: "",
  type: 4,
  subQuestions: ["", ""],
  subMatches: ["", ""],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

const DO_Quiz_Template = {
  question: "",
  type: 5,
  subQuestions: ["", ""],
  normalHint: "",
  exactHint: "",
  point: "",
  isEditing: true,
};

function QGEditClass() {
  const context = useContext(AppSettings);
  const userInfo = useSelector((store) => store.auth.userInfo);

  const [posMobileSidebarToggled, setPosMobileSidebarToggled] = useState(false);
  const [categoryType, setCategoryType] = useState(-1);
  const [quizList, setQuizList] = useState([]);
  const [exportLoading, setExportLoading] = useState(loadingState.before);
  const [importedCount, setImportedCount] = useState(0);
  const { translate } = useLanguageToggle();

  const { classId } = useParams();
  const [subjectData, setSubjectData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [selectedSubjectData, setSelectedSubjectData] = useState();
  const [selectedTopicData, setSelectedTopicData] = useState();
  const [selectedQuizs, setSelectedQuizs] = useState([]);
  const [areAllSelected, setAreAllSelected] = useState(false);
  const [exportAll, setExportAll] = useState(0);

  const [updateClassLoading, setUpdateClassLoading] = useState(false);
  const [getQuestionsLoading, setGetQuestionsLoading] = useState(false);

  const location = useLocation();
  const { classInfo } = location.state;
  const [className, setClassName] = useState(classInfo.name);
  const [classDescription, setClassDescription] = useState(
    classInfo.description
  );
  const [classQuestionType, setClassQuestionType] = useState(
    classInfo.quizType
  );
  const [classQuestionCount, setClassQuestionCount] = useState("question_count" in classInfo ? classInfo["question_count"] : 0);

  const [curLevel, setCurLevel] = useState(1);

  const modalImport = document.getElementById("modalImportClass");
  modalImport?.addEventListener("shown.bs.modal", () => {
    // setEmailsToShare([]);
    setExportLoading(loadingState.before);
  });

  const modalExport = document.getElementById("modalExportClass");
  modalExport?.addEventListener("shown.bs.modal", () => {
    // setEmailsToShare([]);
    setExportLoading(loadingState.before);
  });

  useEffect(() => {
    setGetQuestionsLoading(true);

    setSelectedQuizs([]);
    setAreAllSelected(false);

    QBApi.getSubjects({ teacher_id: userInfo.uid }).then(async (res) => {
      setSubjectData(res.data);

      setSelectedSubjectData(res.data.at(0).id);
      const _topicData = [];
      for (let i = 0; i < res.data.length; i++) {
        const subject = res.data[i];
        await QBApi.getTopics({ teacher_id: userInfo.uid, subject_id: subject.id }).then((response) => {
          response.data.forEach((topic) => {
            const _topic = {
              subject_id: subject.id,
              topic_id: topic.id,
              topic_name: topic.name,
            }
            _topicData.push(_topic);
          })
        })
      };

      const topics = _topicData.filter((topic) => topic.subject_id === res.data.at(0).id)
      if (topics.length > 0)
        setSelectedTopicData(topics[0].topic_id);
      else setSelectedTopicData(undefined);
      setTopicData(_topicData);
    });
    QGApi.getAllQuestionsByClassroomId({
      class_id: classId,
      level_id: curLevel,
    })
      .then((res) => {
        console.log("quiz list === >>>", res);
        setCategoryType(-1);
        setQuizList(res.data);
        setGetQuestionsLoading(false);
      })
      .catch((_) => {
        setGetQuestionsLoading(false);
      });
  }, [classId, curLevel]);

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

  var showType = (event, type) => {
    event.preventDefault();
    selectCategory(type);
  };

  const selectCategory = (type) => {

    const t_quizList = [...quizList];
    const len = t_quizList.length;

    if (len > 0 && t_quizList[len - 1].isEditing === true) {
      t_quizList.splice(len - 1, 1);
    }

    switch (Number(type)) {
      case 0:
        t_quizList.push(TF_Quiz_Template);
        break;
      case 1:
        t_quizList.push(MC_Quiz_Template);
        break;
      case 6:
        t_quizList.push(MC_Extra_Quiz_Template);
        break;
      case 2:
        t_quizList.push(FG_Quiz_Template);
        break;
      case 3:
        t_quizList.push(LA_Quiz_Template);
        break;
      case 4:
        t_quizList.push(DM_Quiz_Template);
        break;
      default:
        t_quizList.push(DO_Quiz_Template);
    }
    setQuizList(t_quizList);
    setCategoryType(type);
  }

  const updateQuizData = (index, data) => {
    const t_quizList = [...quizList];
    t_quizList[index] = data;
    setQuizList(t_quizList);
  };

  const exportOneQuiz = (index) => {
    setExportAll(1);
  }

  const removeQuizData = async (idx) => {
    const t_quizList = [...quizList];

    for (let i = 0; i < selectedQuizs.length; i++) {
      const quizId = selectedQuizs[i];
      let filteredIndex = undefined;
      t_quizList
        .filter((t_quiz, index) => { if (t_quiz.id === quizId) { filteredIndex = index; return true; } })
      if (filteredIndex !== undefined) {
        await QGApi.deleteQuestion(
          {
            class_id: classId,
            quiz_id: quizId
          }).then((_) => {
            t_quizList.splice(filteredIndex, 1);
            setQuizList([]);
            setTimeout(() => {
              setQuizList(t_quizList);
            }, 10);
          })
      };
    };
  }

  const handleSelect = (index, isSelected) => {
    let tmpSelectedQuizs = selectedQuizs;

    if (index === undefined)
      return;

    if (!isSelected && tmpSelectedQuizs.includes(index)) {
      const idx = tmpSelectedQuizs.indexOf(index);
      if (idx > -1) {
        tmpSelectedQuizs.splice(idx, 1);
      }
    }

    if (isSelected && !tmpSelectedQuizs.includes(index))
      tmpSelectedQuizs.push(index);

    setSelectedQuizs(tmpSelectedQuizs);
    setAreAllSelected(tmpSelectedQuizs.length === quizList.length);
  }

  const handleSubjectChange = (event) => {
    event.preventDefault();
    setSelectedSubjectData(event.target.value);
    const topics = topicData.filter((topic) => topic.subject_id === event.target.value)
    if (topics.length > 0)
      setSelectedTopicData(topics[0].topic_id);
    else setSelectedTopicData(undefined);
  }

  const handleUpdateClassInfo = async () => {
    const body = {
      name: className,
      description: classDescription,
      quizType: classQuestionType,
      subject_id: selectedSubjectData,
      topic_id: selectedTopicData,
      question_count: classQuestionCount,
    };
    console.log(body);
    setUpdateClassLoading(true);
    await QGApi.updateClassroom({ class_id: classId }, body);
    setUpdateClassLoading(false);
  };
  const handleImportQuestions = async (e) => {
    e.preventDefault();

    // setExportLoading(loadingState.loading);

    // console.log(`teacher_id=${userInfo.uid}, subject_id=${selectedSubjectData}, topic_id=${selectedTopicData}, importLevel=${importLevel}`);

    // await QBApi.getQuestions({
    //   teacher_id: userInfo.uid,
    //   subject_id: selectedSubjectData,
    //   topic_id: selectedTopicData,
    // })
    //   .then(async (res) => {
    //     res.data = res.data.filter((quiz, index) => {
    //       return Number(quiz.level) === Number(importLevel)
    //     });
    //     setImportedCount(res.data.length);
    //     for (let i = 0; i < res.data.length; i++) {
    //       const quiz = res.data[i];
    //       const body = new FormData();
    //       if ("type" in quiz)
    //         body.append("type", quiz["type"]);
    //       if ("question" in quiz)
    //         body.append("question", quiz["question"]);
    //       if ("point" in quiz)
    //         body.append("point", quiz["point"]);
    //       if ("answer" in quiz)
    //         body.append("answer", quiz["answer"]);
    //       if ("normalHint" in quiz)
    //         body.append("normalHint", quiz["normalHint"]);
    //       if ("level" in quiz)
    //         body.append("level", quiz["level"]);
    //       if ("subQuestions" in quiz)
    //         body.append("subQuestions", quiz["subQuestions"]);
    //       if ("subMatches" in quiz)
    //         body.append("subMatches", quiz["subMatches"]);
    //       if ("keyPhrases" in quiz)
    //         body.append("keyPhrases", quiz["keyPhrases"]);
    //       if ("imageFile" in quiz)
    //         body.append("imageFile", quiz["imageFile"]);

    //       await QGApi.addQuestion({ class_id: classId }, body);
    //     }

    //     QGApi.getAllQuestionsByClassroomId({
    //       class_id: classId,
    //       level_id: curLevel,
    //     })
    //       .then((res) => {
    //         console.log("quiz list === >>>", res);
    //         setCategoryType(-1);
    //         setQuizList(res.data);
    //         setGetQuestionsLoading(false);
    //       })
    //       .catch((_) => {
    //         setGetQuestionsLoading(false);
    //       });
    //   })
    //   .catch((_) => {
    //   });

    // setExportLoading(loadingState.after);
  }

  const handleExportQuestion = async (e) => {
    e.preventDefault();

    setExportLoading(loadingState.loading);
    setImportedCount(selectedQuizs.length);
    for (let i = 0; i < selectedQuizs.length; i++) {
      const quizId = selectedQuizs[i];
      let filteredIndex = undefined;
      quizList
        .filter((quiz, index) => {
          if (quiz.id === quizId) {
            filteredIndex = index;
            return true;
          }
        })
      console.log(`quiz id ${quizId} and filtered index ${filteredIndex}`);
      if (filteredIndex !== undefined) {
        const quiz = quizList[filteredIndex];

        const body = new FormData();
        if ("type" in quiz)
          body.append("type", quiz["type"]);
        if ("question" in quiz)
          body.append("question", quiz["question"]);
        if ("point" in quiz) {
          if (typeof quiz['point'] === 'object') {
            quiz['point'].forEach(point => body.append('point', point));
          } else {
            body.append("point", quiz["point"]);
          }
        }
        if ("answer" in quiz)
          body.append("answer", quiz["answer"]);
        if ("normalHint" in quiz)
          body.append("normalHint", quiz["normalHint"]);
        if ("level" in quiz)
          body.append("level", quiz["level"]);
        if ("subQuestions" in quiz) {
          if (typeof quiz["subQuestions"] === 'object') {
            quiz["subQuestions"].forEach((_, subQuizId) => {
              body.append("subQuestions", quiz["subQuestions"][subQuizId]);
            });
          } else {
            body.append('subQuestions', quiz["subQuestions"]);
          }
        }
        if ('subQuestion' in quiz) {
          body.append('subQuestion', quiz['subQuestion']);
        }
        if ('questionImages' in quiz) {
          quiz['questionImages'].forEach(image => {
            body.append('questionImageUrls', image);
          });
          // body.append('questionImageUrls', item["questionImages"]);
        }
        if ('answerImages' in quiz) {
          quiz['answerImages'].forEach(image => {
            body.append('answerImagesUrls', image);
          });
          // body.append('answerImagesUrls', item["answerImages"]);
        }
        if ("subMatches" in quiz) {
          if (typeof quiz["subMatches"] === 'object') {
            quiz['subMatches'].forEach(match => body.append('subMatches', match));
          } else {
            body.append("subMatches", quiz["subMatches"]);
          }
        }
        if ("keyPhrases" in quiz) {
          if (typeof quiz['keyPhrases'] === 'object') {
            quiz['keyPhrases'].forEach(ph => body.append('keyPhrases', ph));
          } else {
            body.append("keyPhrases", quiz["keyPhrases"]);
          }
        }
        if ("imageFile" in quiz)
          body.append("imageFile", quiz["imageFile"]);

        // console.log(`exporting question ${filteredIndexes[0]} to QB ===== >>>> `, quiz);

        await QBApi.addQuestion({
          teacher_id: userInfo.uid,
          subject_id: selectedSubjectData,
          topic_id: selectedTopicData
        }, body).then(res => {
          console.log("QBApi.addQuestion res =====>>>", res.data);
        })
      }
    }

    setExportLoading(loadingState.after);
  }

  const selectAll = () => {
    let tmpSelectedQuizs = selectedQuizs;
    if (tmpSelectedQuizs.length === quizList.length)
      tmpSelectedQuizs = [];
    else {
      quizList.forEach(quiz => {
        if (!tmpSelectedQuizs.includes(quiz.id))
          tmpSelectedQuizs.push(quiz.id)
      });
      tmpSelectedQuizs = tmpSelectedQuizs;
    }

    setSelectedQuizs(tmpSelectedQuizs);
    setAreAllSelected(tmpSelectedQuizs.length === quizList.length);
  }

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
                    {translate("classroom-information")}
                  </div>
                  <Link className="icon" to="/class/quiz/SA">
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
                      rows="15"
                      placeholder=""
                      value={classDescription}
                      onChange={(e) => setClassDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      {translate("quiz-type")}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select form-select-lg bg-white bg-opacity-5"
                      id="questionType"
                      value={classQuestionType}
                      onChange={(e) => setClassQuestionType(e.target.value)}
                    >
                      <option value="0"> {translate("assessment")}</option>
                      <option value="1">
                        {" "}
                        {translate("check-for-understanding")}
                      </option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      {translate("question-count")}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className={clsx({
                        "form-control form-control-md bg-white bg-opacity-5": true,
                        "is-invalid": className === "",
                      })}
                      placeholder=""
                      value={classQuestionCount}
                      onChange={(e) => setClassQuestionCount(e.target.value)}
                    />
                  </div>
                </div>
              </PerfectScrollbar>

              <div className="pos-sidebar-footer">
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
                        <span className="small">
                          {" "}
                          {translate("save-information")}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
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
                <div className="logo-text"> {translate("quiz")}</div>
              </Link>
            </div>
            <div className="nav-container">
              <PerfectScrollbar className="h-100">
                <ul className="nav nav-tabs">
                  {quiz_category.map((category, index) => (
                    <li className="nav-item" key={`quizCategory${index}`}>
                      <div
                        className={
                          "nav-link" +
                          (category.type === categoryType ? " active" : "")
                        }
                        onClick={(event) => showType(event, category.type)}
                        style={{ cursor: "pointer" }}
                      >
                        <Card>
                          <CardBody>
                            <i className={category.icon}></i>
                            <div style={{ whiteSpace: "pre-wrap" }}>
                              {category.text}
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </li>
                  ))}
                </ul>
              </PerfectScrollbar>
            </div>
          </div>

          <div className="pos-content">
            <div style={{ display: "flex" }}>
              <ul className="nav nav-tabs nav-tabs-v2 px-4">
                {[1, 2, 3].map((level) => (
                  <li className="nav-item me-3" key={`level${level}`}>
                    <div
                      className={clsx({
                        "nav-link px-2": true,
                        active: level === 1,
                      })}
                      data-bs-toggle="tab"
                      style={{ cursor: "pointer" }}
                      onClick={() => setCurLevel(level)}
                    >
                      {translate("level")}
                      {level}
                    </div>
                  </li>
                ))}
              </ul>
              {/* <button
                className="btn btn-outline-theme rounded-0 w-150px"
                data-bs-toggle="modal"
                data-bs-target="#modalImportClass"
              >
                <i className="far fa-lg fa-fw me-2 fa-arrow-circle-down"></i>
                <br />
                <span className="small">Import from</span>
              </button> */}
              <button
                className="btn btn-outline-theme rounded-0 w-150px"
                data-bs-toggle="modal"
                data-bs-target="#modalExportClass"
              >
                <i className="far fa-lg fa-fw me-2 fa-arrow-circle-up"></i>
                <br />
                <span className="small"> {translate("export-to")}</span>
              </button>
              <span className="m-auto mx-2"> {translate("select-all")}</span>{" "}
              <input
                className=" mx-0 m-auto form-check-input "
                type="checkbox"
                onChange={() => selectAll()}
                checked={areAllSelected}
              />
              <button
                className="btn btn-outline-danger rounded-sm h-50 m-auto mx-2"
                onClick={() => removeQuizData(1)}
              >
                <i className="fas fa-md fa-fw fa-trash-alt"></i>
              </button>
            </div>


            <PerfectScrollbar className="pos-content-container h-auto p-4" style={{ height: "auto" }}>
              {getQuestionsLoading && (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <BarsScale />
                </div>
              )}
              {!getQuestionsLoading &&
                quizList.map((quiz, index) => {
                  switch (parseFloat(quiz.type)) {
                    case 0:
                      return (
                        <TrueFalseQuiz
                          key={`QG_TF_Quiz-${index}`}
                          index={index}
                          classId={classId}
                          level={curLevel}
                          data={quiz}
                          updateData={updateQuizData}
                          removeData={removeQuizData}
                          exportData={exportOneQuiz}
                          handleSelect={handleSelect}
                          selected={selectedQuizs.includes(quiz.id)}
                          selectedQuizs={selectedQuizs}
                        />
                      );
                    case 1:
                      return (
                        <MultiChoiceQuiz
                          key={`QG_MC_Quiz-${index}`}
                          index={index}
                          classId={classId}
                          level={curLevel}
                          data={quiz}
                          updateData={updateQuizData}
                          removeData={removeQuizData}
                          exportData={exportOneQuiz}
                          handleSelect={handleSelect}
                          selected={selectedQuizs.includes(quiz.id)}
                          selectedQuizs={selectedQuizs}
                        />
                      );
                    case 6:
                      return (
                        <MultiChoiceExtraQuiz
                          key={`QG_MC_Quiz-${index}`}
                          index={index}
                          classId={classId}
                          level={curLevel}
                          data={quiz}
                          updateData={updateQuizData}
                          removeData={removeQuizData}
                          exportData={exportOneQuiz}
                          handleSelect={handleSelect}
                          selected={selectedQuizs.includes(quiz.id)}
                          selectedQuizs={selectedQuizs}
                        />
                      );
                    case 2:
                      return (
                        <FillingGapQuiz
                          key={`QG_FG_Quiz-${index}`}
                          index={index}
                          classId={classId}
                          level={curLevel}
                          data={quiz}
                          updateData={updateQuizData}
                          removeData={removeQuizData}
                          exportData={exportOneQuiz}
                          handleSelect={handleSelect}
                          selected={selectedQuizs.includes(quiz.id)}
                          selectedQuizs={selectedQuizs}
                        />
                      );
                    case 3:
                      return (
                        <LongAnswerQuiz
                          key={`QG_LA_Quiz-${index}`}
                          index={index}
                          classId={classId}
                          level={curLevel}
                          data={quiz}
                          updateData={updateQuizData}
                          removeData={removeQuizData}
                          exportData={exportOneQuiz}
                          handleSelect={handleSelect}
                          selected={selectedQuizs.includes(quiz.id)}
                          selectedQuizs={selectedQuizs}
                        />
                      );
                    case 4:
                      return (
                        <DragAndMatchQuiz
                          key={`QG_DM_Quiz-${index}`}
                          index={index}
                          classId={classId}
                          level={curLevel}
                          data={quiz}
                          updateData={updateQuizData}
                          removeData={removeQuizData}
                          exportData={exportOneQuiz}
                          handleSelect={handleSelect}
                          selected={selectedQuizs.includes(quiz.id)}
                          selectedQuizs={selectedQuizs}
                        />
                      );
                    case 5:
                      return (
                        <DragAndOrderQuiz
                          key={`QG_DO_Quiz-${index}`}
                          index={index}
                          classId={classId}
                          level={curLevel}
                          data={quiz}
                          updateData={updateQuizData}
                          removeData={removeQuizData}
                          exportData={exportOneQuiz}
                          handleSelect={handleSelect}
                          selected={selectedQuizs.includes(quiz.id)}
                          selectedQuizs={selectedQuizs}
                        />
                      );
                    default:
                      break;
                  }
                })}
            </PerfectScrollbar>
          </div>
        </CardBody>
      </Card>

      <div className="modal fade" id="modalExportClass">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {" "}
                {translate("export-the-questions")}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <form onSubmit={handleExportQuestion}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    {translate("question-subject")}
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-select-lg bg-white bg-opacity-5"
                    id="questionSubject"
                    onChange={handleSubjectChange}
                  >
                    {subjectData && subjectData.length > 0 ? (
                      subjectData.map((subject, index) => (
                        <option key={index} value={subject.id}>
                          {subject.name}
                        </option>
                      ))
                    ) : (
                      <option value="0" disabled>
                        {translate("no-subject")}
                      </option>
                    )}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    {translate("question-topic")}
                    Question Topic <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select form-select-lg bg-white bg-opacity-5"
                    id="questionTopic"
                    onChange={(e) => setSelectedTopicData(e.target.value)}
                  >
                    {topicData && topicData.length > 0 ? (
                      topicData
                        .filter(
                          (topic) => topic.subject_id === selectedSubjectData
                        )
                        .map((top, index) => (
                          <option key={index} value={top.topic_id}>
                            {top.topic_name}
                          </option>
                        ))
                    ) : (
                      <option value="0" disabled>
                        {translate("no-subject")}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                {exportLoading === loadingState.before && (
                  <button type="submit" className="btn btn-outline-theme">
                    {translate("export")}
                  </button>
                )}
                {exportLoading === loadingState.loading && <BarsScale />}
                {exportLoading === loadingState.after && (
                  <div className="d-flex">
                    <input className="form-control form-control-md bg-white bg-opacity-5 mx-3" disabled value={`Exported ${importedCount} questions`} />
                    <button
                      type="button"
                      className="btn btn-outline-theme"
                      data-bs-dismiss="modal"
                    >
                      {translate("done")}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div >
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

export default QGEditClass;
