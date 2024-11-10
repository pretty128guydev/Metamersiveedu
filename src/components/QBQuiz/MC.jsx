import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "../card/card.jsx";
import clsx from "clsx";
import QBApi from "../../api-clients/QBApi.js";
import BarsScale from "../../components/loading/BarsScale.jsx";

import { useSelector } from "react-redux";

import "./MC.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle.js";

function MultiChoiceQuiz(props) {
  const { index, classId, level, data, handleSelect, updateData, removeData, selected, isEditable, teacher_id } = props;
  data.subQuestions = Array.isArray(data.subQuestions) ? data.subQuestions : data.subQuestions.split(",");
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [quiz, setQuiz] = useState(data);
  const [subQuizList, setSubQuizList] = useState(data.subQuestions);
  const [isEditing, setEditing] = useState(
    data.isEditing ? data.isEditing : false
  );
  const [isSelected, setIsSelected] = useState(props.selected);
  const [answer, setAnswer] = useState(data.answer);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState();
  const [imageFile, setImageFile] = useState();
  const { translate } = useLanguageToggle();

  function onImageChange(e) {
    setImages(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  }

  useEffect(() => {
    if (props.selectedQuizs)
      setIsSelected(props.selectedQuizs.includes(data.id));
  }, [JSON.stringify(props.selectedQuizs)]);

  useEffect(() => {
    setQuiz(props.data);
    setSubQuizList(props.data.subQuestions);

    const inputQuestion = document.getElementById(`question${index}`);
    const inputPoint = document.getElementById(`point${index}`);
    const inputNormalHint = document.getElementById(`normalHint${index}`);

    props.data.subQuestions.forEach((subQuiz, subQuizId) => {
      const inputQuiz = document.getElementById(
        `MC_Quiz${index}SubQuiz${subQuizId}`
      );
      if (inputQuiz) inputQuiz.value = subQuiz;
    });

    inputQuestion.value = props.data.question;
    inputPoint.value = props.data.point;
    inputNormalHint.value = props.data.normalHint;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  useEffect(() => {
    subQuizList.forEach((subQuiz, subQuizId) => {
      const inputQuiz = document.getElementById(
        `MC_Quiz${index}SubQuiz${subQuizId}`
      );
      if (inputQuiz) inputQuiz.value = subQuiz;
    });
  }, [index, subQuizList]);

  const addOrUpdateQuestion = (body) => {
    if (!isUpdating) {
      return QBApi.addQuestion(
        {
          teacher_id: props.teacher_id,
          subject_id: props.subject_id,
          topic_id: props.topic_id
        }, body);
    } else {
      return QBApi.updateQuestion(
        {
          teacher_id: props.teacher_id,
          subject_id: props.subject_id,
          topic_id: props.topic_id,
          question_id: props.data.id
        },
        body
      );
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const subQuestions = subQuizList.map((_, subQuizId) => {
      return event.target[`MC_Quiz${index}SubQuiz${subQuizId}`].value;
    });

    // const body = {
    //   type: 1,
    //   question: event.target[`question${index}`].value,
    //   subQuestions: subQuestions,
    //   point: Number(event.target[`point${index}`].value),
    //   answer: answer,
    //   normalHint: event.target[`normalHint${index}`].value,
    //   level: level,
    // };

    const body = new FormData();
    body.append('type', 1);
    body.append('question', event.target[`question${index}`].value);
    body.append('subQuestions', subQuestions);
    body.append('point', Number(event.target[`point${index}`].value));
    body.append('answer', answer);
    body.append('normalHint', event.target[`normalHint${index}`].value);
    body.append('level', level);
    if (imageFile !== undefined)
      body.append('imageFile', imageFile);

    setLoading(true);

    await addOrUpdateQuestion(body).then((res) => {
      updateData(index, res.data);
    });

    setLoading(false);
    setEditing(false);
  };

  const handleEdit = () => {
    setIsUpdating(true);
    setEditing(true);

    const inputQuestion = document.getElementById(`question${index}`);
    const inputPoint = document.getElementById(`point${index}`);
    const inputNormalHint = document.getElementById(`normalHint${index}`);

    data.subQuestions.forEach((subQuiz, subQuizId) => {
      document.getElementById(`MC_Quiz${index}SubQuiz${subQuizId}`).value =
        subQuiz;
    });

    inputQuestion.value = data.question;
    inputPoint.value = data.point;
    inputNormalHint.value = data.normalHint;

    inputQuestion.focus();
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleAddSubQuiz = () => {
    let t_subQuesions = subQuizList.map((_, id) => {
      const inputSubQuiz = document.getElementById(
        `MC_Quiz${index}SubQuiz${id}`
      );
      return inputSubQuiz.value;
    });
    t_subQuesions.push("");
    setSubQuizList(t_subQuesions);
  };

  const handleDeleteSubQuiz = (subQuizId) => {
    let t_subQuesions = subQuizList.map((_, id) => {
      const inputSubQuiz = document.getElementById(
        `MC_Quiz${index}SubQuiz${id}`
      );
      return inputSubQuiz.value;
    });
    t_subQuesions.splice(subQuizId, 1);
    setSubQuizList(t_subQuesions);
  };

  const handleUpdateAnswer = (subQuizId) => {
    console.log(String.fromCharCode(65 + subQuizId));
    setAnswer(String.fromCharCode(65 + subQuizId));
  };

  const checkSelect = (index) => {
    handleSelect(index, !isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <Card className={"mb-3 multiple-choice" + (selected ? " selected" : "")}>
      <form className="was-validated" onSubmit={handleSave}>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <span className="m-2 fa-lg">{index + 1}. {translate("multiple-choice")}</span>
          {
            isEditable !== false &&
            <div>
              {loading ? (
                <BarsScale />
              ) : (
                <div className="btn-group btn-group-sm d-flex">
                  <input className=" mx-2 m-auto form-check-input " checked={isSelected} type="checkbox" onChange={() => checkSelect(data.id)} />
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-outline-theme rounded-sm"
                        type="submit"
                      >
                        <i className="fas fa-md fa-fw fa-save"></i>
                      </button>
                      {quiz.id !== undefined && (
                        <button
                          className="btn btn-outline-default rounded-sm"
                          onClick={() => handleCancel()}
                        >
                          <i className="fas fa-md fa-fw fa-window-close"></i>
                        </button>
                      )}
                    </>
                  ) : (teacher_id === userInfo.uid &&
                    <div
                      className="btn btn-outline-theme rounded-sm"
                      onClick={() => handleEdit()}
                    >
                      <i className="fas fa-md fa-fw fa-edit"></i>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        </CardHeader>
        <CardBody>
          <div
            className={clsx({
              "d-block": true,
              "d-none": !isEditing,
            })}
          >
            <div className="d-flex w-100 mb-3">
              <input
                type="text"
                className="form-control bg-white bg-opacity-5 me-2 is-invalid"
                placeholder="Type the question here."
                id={`question${index}`}
                required
              />
              <div className="input-group flex-nowrap me-2" style={{ width: "185px" }}>
                <input type="file" className="form-control is-invalid" multiple accept="image/*" onChange={onImageChange} />
              </div>
              <div
                className="input-group flex-nowrap"
                style={{ width: "150px" }}
              >
                <input
                  type="number"
                  className="form-control is-invalid"
                  id={`point${index}`}
                  required
                />
                <span className="input-group-text">PT</span>
              </div>
            </div>

            <div className="mb-3">
              {subQuizList.map((_, subQuizId) => {
                return (
                  <div
                    className="d-flex align-items-center mb-2"
                    key={"subQuiz" + subQuizId}
                  >
                    <div className="form-check me-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`MC_Radio_${index}`}
                        id={`MC_Radio_${index}_Sub_${subQuizId}`}
                        defaultChecked={
                          String.fromCharCode(65 + subQuizId) === quiz.answer
                        }
                        onChange={(_) => handleUpdateAnswer(subQuizId)}
                      />

                      <label
                        className="form-check-label"
                        htmlFor={`MC_Radio_${index}_Sub_${subQuizId}`}
                      >
                        {String.fromCharCode(65 + subQuizId)}
                      </label>
                    </div>

                    <div className="input-group flex-nowrap">
                      <input
                        type="text"
                        className="form-control bg-white bg-opacity-5 is-invalid"
                        placeholder="Type the answer here."
                        id={`MC_Quiz${index}SubQuiz${subQuizId}`}
                        required
                      />
                      <div
                        className="btn btn-outline-secondary"
                        onClick={() => handleDeleteSubQuiz(subQuizId)}
                      >
                        <i className="fas fa-md fa-fw fa-trash-alt"></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="btn btn-outline-theme btn-sm mb-3"
              type="button"
              onClick={() => handleAddSubQuiz()}
            >
              {translate("add-answer")}
            </button>

            <textarea
              className="form-control form-control-md bg-white bg-opacity-5 mb-2"
              rows="3"
              placeholder="Hint"
              id={`normalHint${index}`}
              required={false}
            />

            {images &&
              <div className="mb-3">
                <div
                  className="col-xl-3 col-lg-4 col-md-6 pb-3"
                >
                  <Card
                    className={
                      "pos-checkout-table in-use"}
                  >
                    <img className="preview" src={images} alt="Quiz Image"></img>
                  </Card>
                </div>
              </div>}
          </div>

          <div
            className={clsx({
              "d-block": true,
              "d-none": isEditing,
            })}
          >
            <div className="d-flex justify-content-between w-100 mb-3">
              <span>{quiz.question}</span>
              <span>
                {quiz.point} {translate("point")}
              </span>
            </div>

            <div className="mb-3">
              {quiz.subQuestions.map((subQuiz, subQuizId) => {
                return (
                  <div
                    className={clsx({
                      "d-flex quiz-item mb-1": true,
                      "text-theme":
                        String.fromCharCode(65 + subQuizId) === quiz.answer,
                    })}
                    key={"subQuizShow" + subQuizId}
                  >
                    <span className="me-2">
                      {String.fromCharCode(65 + subQuizId)}
                    </span>

                    <span>{subQuiz}</span>
                  </div>
                );
              })}
            </div>

            {quiz.normalHint !== "" && (
              <Card>
                <CardBody className="bg-white bg-opacity-5">
                  {translate("hint")} : {quiz.normalHint}
                </CardBody>
              </Card>
            )}
            {quiz.imageFile !== "" && quiz.imageFile !== undefined && (
              <div className="mb-3 mt-3">
                <div
                  className="col-xl-3 col-lg-4 col-md-6 pb-3"
                >
                  <Card
                    className={
                      "pos-checkout-table in-use"}
                  >
                    {
                      quiz.imageFile !== "" &&
                      <img className="preview" src={"https://metamersive-edu-backend.herokuapp.com/uploads/" + quiz.imageFile} alt="Quiz Image"></img>
                    }
                  </Card>
                </div>
              </div>
            )}
          </div>
        </CardBody>
      </form>
    </Card>
  );
}

export { MultiChoiceQuiz };
