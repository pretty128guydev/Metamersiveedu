/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppSettings } from "./../../config/app-settings.js";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
import "datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import QGApi from "../../api-clients/QuizGameApi.js";
import BarsScale from "../../components/loading/BarsScale.jsx";
import clsx from "clsx";
import { ProgressState } from "../../components/progress-state/ProgressState.jsx";
import { eventTupleToStore } from "@fullcalendar/react";
import { InputNumber, Modal, Button, notification } from 'antd';
import './style.scss';
import useLanguageToggle from "../../hooks/useLanguageToggle.js";

function NormalAnalytics() {
  const context = useContext(AppSettings);
  const { classId } = useParams();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [responses, setResponses] = useState();
  const [showResult, setShowResult] = useState(true);
  const [showName, setShowName] = useState(false);
  const [showCheck, setShowCheck] = useState(true);
  const [questionLevel, setQuestionLevel] = useState(0);
  const [curQuestion, setCurQuestion] = useState();
  const [curQuestionNum, setCurQuestionNum] = useState(0);
  const [markDialogShow, setMarkDialogShow] = useState(false);
  const [updateMarkLoading, setUpdateMarkLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({ studentId: 0, answerId: 0 });
  const [mark, setMark] = useState(0);
  const { translate } = useLanguageToggle();

  useEffect(() => {
    console.log('sele:', selectedStudent);
    setLoading(true);

    QGApi.getStudentResponses({ class_id: classId })
      .then((res) => {
        console.log('respon:', res.data);
        setQuestions(res.data.questions);
        setResponses(res.data.response);
        setCurQuestion(res.data.questions[0]);
        setCurQuestionNum(0);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

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

  useEffect(() => {
    if (questions !== undefined) setCurQuestion(questions[curQuestionNum]);
  }, [curQuestionNum]);

  const answerToString = (answer, ans_id) => {
    if (answer === null) {
      return '';
    }

    switch (questions[ans_id].type) {
      case 0:
        return answer === true ? "true" : "false";
      case 1:
      case 2:
        return answer;
      default:
        return answer.substring(0, 30) + (answer.length > 30 ? "..." : "");
    }
  };

  const getAnswerPercent = (checkVal) => {
    let correctN = 0;
    responses.forEach((resp) => {
      correctN += resp.answer[curQuestionNum].answer === checkVal ? 1 : 0;
    });
    return Math.round((correctN / responses.length) * 100);
  };

  const handleMark = (e, student_id, ans_id) => {
    if (e.target.className !== 'not_perfect_answer') {
      return;
    } else {
      setSelectedStudent({
        studentId: student_id,
        answerId: ans_id
      });

      setMark(responses[selectedStudent.studentId].answer[selectedStudent.answerId].correctPercent);
      setMarkDialogShow(true);
    }
  };

  const handleSaveMark = () => {
    setUpdateMarkLoading(true);
    QGApi.markAnswer({
      studentId: responses[selectedStudent.studentId].id,
      answerId: responses[selectedStudent.studentId].answer[selectedStudent.answerId].id,
      classId,
      mark,
    }).then(data => {
      console.log('data:', data);
      const newResp = [...responses];
      newResp[selectedStudent.studentId].answer[selectedStudent.answerId].correctPercent = mark;

      setResponses(newResp);
      notification.success({
        message: 'Success',
        description: data.data.status,
      });
    }).catch(err => notification.error({
      message: 'Error',
      description: err.response.data.message,
    })).finally(() => setUpdateMarkLoading(false));
  };

  return (
    <>
      {loading ? (
        <div className="h-100 justify-content-center d-flex align-items-center">
          <BarsScale />
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <Link className="icon" to="/analytics/normalQuiz">
              <i className="fas fa-lg fa-fw me-2 fa-sign-out-alt"></i>{" "}
              {translate("return")}
            </Link>
          </div>

          <div className="mb-3">
            <div className="analysis-toolbar">
              <div className="analysis-control-box">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`showNameSwitch`}
                    checked={showName}
                    onChange={(e) => setShowName(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`showNameSwitch`}
                  >
                    {translate("show-names")}
                  </label>
                </div>

                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`showResultSwitch`}
                    checked={showResult}
                    onChange={(e) => setShowResult(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`showResultSwitch`}
                  >
                    {translate("show-result")}
                  </label>
                </div>

                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`checkAnswerSwitch`}
                    checked={showCheck}
                    onChange={(e) => setShowCheck(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`checkAnswerSwitch`}
                  >
                    {translate("check-answer")}
                  </label>
                </div>

                <div className="d-flex">
                  <select
                    className="form-select form-select-xs bg-white bg-opacity-5"
                    id="questionLevel"
                    value={questionLevel}
                    onChange={(e) => setQuestionLevel(Number(e.target.value))}
                  >
                    <option value={0}>{translate("all")}</option>
                    <option value={1}>{translate("level-1")}</option>
                    <option value={2}>{translate("level-2")}</option>
                    <option value={3}>{translate("level-3")}</option>
                  </select>
                </div>
              </div>

              <div>
                <span
                  className="badge me-2"
                  style={{ background: "#3af3bc3d" }}
                >
                  {translate("correct")}
                </span>
                <span
                  className="badge me-2"
                  style={{ background: "#f136363d" }}
                >
                  {translate("wrong")}
                </span>
                <span className="badge" style={{ background: "#f3e73756" }}>
                  {translate("not-perfect")}
                </span>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-xs w-100 fw-bold text-nowrap mb-3">
              <thead>
                <tr>
                  <th>{translate("no")}.</th>
                  <th>{translate("name")}</th>
                  <th>{translate("total-correct")}</th>
                  {questions?.map((question, q_id) => {
                    if (
                      question.level === questionLevel ||
                      questionLevel === 0
                    ) {
                      return (
                        <th
                          className="anlyticsTableHeadCell"
                          key={`question${q_id}`}
                          onClick={() => setCurQuestionNum(q_id)}
                          style={{ cursor: "pointer" }}
                        >
                          {q_id + 1}
                        </th>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody className="text-primary">
                {responses?.map((resp, st_id) => {
                  return (
                    <tr key={`response${st_id}`}>
                      <td>{st_id + 1}</td>
                      <td>
                        {showName ? resp.name : '******'}
                      </td>
                      <td>
                        {`${resp.answer.filter((ans, ans_id) => (ans.correctPercent === 100 && (questions[ans_id].level === questionLevel || parseInt(questions[ans_id].level, 10) === parseInt(questionLevel, 10) ||
                          questionLevel === 0))).length}`}
                      </td>
                      {resp.answer.map((ans, ans_id) => {
                        if (
                          questions[ans_id].level === questionLevel || parseInt(questions[ans_id].level, 10) === parseInt(questionLevel, 10) ||
                          questionLevel === 0
                        ) {
                          return (
                            <td
                              key={`answer${ans_id}`}
                              className={clsx({
                                wrong_answer:
                                  ans.correctPercent === 0 && showCheck,
                                correct_answer:
                                  ans.correctPercent === 100 && showCheck,
                                not_perfect_answer:
                                  ans.correctPercent > 0 &&
                                  ans.correctPercent < 100 && showCheck,
                              })}
                              onClick={(e) => handleMark(e, st_id, ans_id)}
                            >
                              {showResult && `${answerToString(ans.answer, ans_id)}(${ans.correctPercent}%)`}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <hr className="my-4" />

          {curQuestion && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-1">
                  <div
                    onClick={() => {
                      if (curQuestionNum > 0) {
                        setCurQuestionNum(curQuestionNum - 1);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-lg fa-fw fa-caret-left"></i>
                  </div>
                  <div>{curQuestionNum + 1}</div>
                  <div
                    onClick={() => {
                      if (curQuestionNum < questions.length - 1) {
                        setCurQuestionNum(curQuestionNum + 1);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="fas fa-lg fa-fw fa-caret-right"></i>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <span
                      className={clsx({
                        badge: true,
                        "bg-primary": curQuestion.level === 1,
                        "bg-secondary": curQuestion.level === 2,
                        "bg-dark": curQuestion.level === 3,
                      })}
                    >
                      {`Level ${curQuestion.level}`}
                    </span>
                  </div>
                  <div>id: {curQuestion.id}</div>
                </div>
              </div>

              <div>
                <div className="mb-3">{curQuestion.question}</div>

                {curQuestion.type === 0 && (
                  <div
                    className="d-flex flex-column gap-1"
                    style={{ maxWidth: "500px" }}
                  >
                    <ProgressState
                      correct={curQuestion.answer === true}
                      percent={getAnswerPercent(true)}
                    >
                      {translate("true")}
                    </ProgressState>
                    <ProgressState
                      correct={curQuestion.answer === false}
                      percent={getAnswerPercent(false)}
                    >
                      {translate("false")}
                    </ProgressState>
                  </div>
                )}
                {curQuestion.type === 1 && (
                  <div
                    className="d-flex flex-column gap-1"
                    style={{ maxWidth: "500px" }}
                  >
                    {curQuestion.subQuestions.map((subQuestion, index) => (
                      <ProgressState
                        correct={
                          String.fromCharCode(65 + index) === curQuestion.answer
                        }
                        key={`subQuestion${index}`}
                        percent={getAnswerPercent(
                          String.fromCharCode(65 + index)
                        )}
                      >
                        {String.fromCharCode(65 + index)}. {subQuestion}
                      </ProgressState>
                    ))}
                  </div>
                )}
                {curQuestion.type === 2 && (
                  <div>
                    {curQuestion.answer.map((ans, ans_id) => (
                      <span key={ans_id}>{ans}&nbsp;</span>
                    ))}
                  </div>
                )}
                {curQuestion.type === 3 && (
                  <div>{questions[curQuestionNum].answer}</div>
                )}
              </div>

              <hr className="my-4" />

              <div>
                <table
                  className="table table-hover table-bordered"
                  style={{ width: "auto" }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "rgba(29, 40, 53, 0.95)" }}>
                        {translate("name")}
                      </th>
                      <th>{translate("response")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((resp, index) => (
                      <tr key={index}>
                        <th
                          style={{ backgroundColor: "rgba(29, 40, 53, 0.95)" }}
                        >
                          {resp.name}
                        </th>
                        <th>
                          {curQuestion.type === 0
                            ? resp.answer[curQuestionNum].answer === true
                              ? translate("true")
                              : translate("false")
                            : resp.answer[curQuestionNum].answer}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
      <Modal
        className="mark-modal"
        open={markDialogShow}
        footer={[
          <div key="footer">
            <Button key="cancel" onClick={() => setMarkDialogShow(false)}>
              {translate("cancel")}
            </Button>
            <Button
              key="save"
              loading={updateMarkLoading}
              onClick={handleSaveMark}
            >
              {translate("save")}
            </Button>
          </div>,
        ]}
      >
        {questions && responses && (
          <div>
            <h3>{translate("question")}:</h3>
            <p>{questions[selectedStudent.answerId].question}</p>
            <h4>{translate("students-answer")}</h4>
            <p>
              {answerToString(
                responses[selectedStudent.studentId].answer[
                  selectedStudent.answerId
                ].answer,
                selectedStudent.answerId
              )}
            </p>
            <h4>{translate("correct-answer")}</h4>
            <p>{questions[selectedStudent.answerId].answer}</p>
            <h5>{translate("mark")}</h5>
            <InputNumber
              min={0}
              max={100}
              value={mark}
              onChange={(e) => setMark(e)}
            />
          </div>
        )
        }
      </Modal >
    </>
  );
}

export default NormalAnalytics;
