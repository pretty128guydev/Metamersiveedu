import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "../card/card.jsx";
import clsx from "clsx";
import { TagsInput } from "react-tag-input-component";
import QBApi from "../../api-clients/QBApi.js";
import BarsScale from "../loading/BarsScale.jsx";
import { textAreaShow } from "../../utils/utils";

import { useSelector } from "react-redux";
import useLanguageToggle from "../../hooks/useLanguageToggle.js";

function FillingGapQuiz(props) {
  const { index, classId, level, data, handleSelect, updateData, removeData, selected, isEditable, teacher_id } = props;
  const [quiz, setQuiz] = useState(props.data);
  const [isEditing, setEditing] = useState(
    data.isEditing ? data.isEditing : false
  );
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [isSelected, setIsSelected] = useState(props.selected);
  const [answer, setAnswer] = useState(Array.isArray(data.answer) ? data.answer : data.answer.split(","));
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

    const inputQuestion = document.getElementById(`question${index}`);
    const inputPoint = document.getElementById(`point${index}`);
    const inputNormalHint = document.getElementById(`normalHint${index}`);
    inputQuestion.value = props.data.question;
    inputPoint.value = props.data.point;
    inputNormalHint.value = props.data.normalHint;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

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

    // const body = {
    //   type: 2,
    //   question: event.target[`question${index}`].value,
    //   point: Number(event.target[`point${index}`].value),
    //   answer: answer,
    //   normalHint: event.target[`normalHint${index}`].value,
    //   level: level,
    // };

    const body = new FormData();
    body.append('type', 2);
    body.append('question', event.target[`question${index}`].value);
    body.append('point', Number(event.target[`point${index}`].value));
    body.append('answer', answer);
    body.append('normalHint', event.target[`normalHint${index}`].value);
    body.append('level', level);
    if (imageFile !== undefined)
      body.append('imageFile', imageFile);

    setLoading(true);
    await addOrUpdateQuestion(body).then((res) => {
      updateData(index, res.data);
    }).catch(err => alert(err.message)).finally(() => {
      setLoading(false);
      setEditing(false);
    });
  };

  const handleEdit = () => {
    setIsUpdating(true);
    setEditing(true);

    const inputQuestion = document.getElementById(`question${index}`);
    const inputPoint = document.getElementById(`point${index}`);
    const inputNormalHint = document.getElementById(`normalHint${index}`);

    inputQuestion.value = data.question;
    inputPoint.value = data.point;
    inputNormalHint.value = data.normalHint;

    inputQuestion.focus();
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const tagsChanged = (tags) => {
    setAnswer(tags);
  }

  const checkSelect = (index) => {
    if (handleSelect)
      handleSelect(index, !isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <Card className={"mb-3" + (selected ? " selected" : "")}>
      <form className="was-validated" onSubmit={handleSave}>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <span className="m-2 fa-lg">{index + 1}. {translate("filling-gap")}</span>
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
              <textarea
                className="form-control bg-white bg-opacity-5 is-invalid"
                placeholder="Type the question here."
                id={`question${index}`}
                required
              />
            </div>
            {
              images &&
              <div className="mb-3">
                <div
                  className="col-xl-3 col-lg-4 col-md-6 pb-3"
                >
                  <Card
                    className={
                      "pos-checkout-table in-use"}
                  >
                    <img className="preview" src={images} alt="Quiz.." />
                  </Card>
                </div>
              </div>
            }
            <div className="d-flex w-100 mb-3">
              <div className="input-group flex-nowrap me-2">
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
              <TagsInput
                value={answer}
                name="answers"
                placeHolder="Enter answers"
                onChange={(tags) => setAnswer(tags)}
              />
            </div>

            <textarea
              className="form-control form-control-md bg-white bg-opacity-5 mb-2"
              rows="3"
              placeholder="Hint"
              id={`normalHint${index}`}
              required={false}
            />
          </div>

          <div
            className={clsx({
              "d-block": true,
              "d-none": isEditing,
            })}
          >
            <div className="d-flex justify-content-between w-100 mb-3">
              <span style={{ whiteSpace: "pre-line" }}>{quiz.question}</span>
              <span>
                {quiz.point} {translate("point")}
              </span>
            </div>

            <div
              className="mb-3"
              dangerouslySetInnerHTML={{
                __html: textAreaShow(answer.join(",")),
              }}
            />

            {quiz.imageFile !== "" && quiz.imageFile !== undefined && (
              <div className="mt-3 mb-3">
                <div
                  className="col-xl-3 col-lg-4 col-md-6 pb-3"
                >
                  <Card
                    className={
                      "pos-checkout-table in-use"}
                  >
                    {
                      quiz.imageFile !== "" &&
                      <img className="preview" src={`${quiz.imageFile}`} alt="Quiz.." />
                    }
                  </Card>
                </div>
              </div>
            )}
            {quiz.normalHint !== "" && (
              <Card>
                <CardBody className="bg-white bg-opacity-5">
                  {translate("hint")} : {quiz.normalHint}
                </CardBody>
              </Card>
            )}
          </div>
        </CardBody>
      </form>
    </Card>
  );
}

export { FillingGapQuiz };
