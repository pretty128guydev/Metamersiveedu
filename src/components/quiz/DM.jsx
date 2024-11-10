import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "../card/card.jsx";
import clsx from "clsx";
import QGApi from "../../api-clients/QuizGameApi";
import BarsScale from "../../components/loading/BarsScale.jsx";

import "./DM.scss";
import useLanguageToggle from "../../hooks/useLanguageToggle.js";

function DragAndMatchQuiz(props) {
  const { index, classId, level, data, handleSelect, updateData, removeData, exportData, selected } = props;
  data.subQuestions = Array.isArray(data.subQuestions) ? data.subQuestions : data.subQuestions.split(",");
  data.subMatches = Array.isArray(data.subMatches) ? data.subMatches : data.subMatches.split(",");
  const [quiz, setQuiz] = useState(data);
  const [pointList, setPointList] = useState([]);
  const [subQuizList, setSubQuizList] = useState(data.subQuestions);
  const [subMatchList, setSubMatchList] = useState(data.subMatches);
  const [isSelected, setIsSelected] = useState(props.selected);
  const [isEditing, setEditing] = useState(
    data.isEditing ? data.isEditing : false
  );
  const { translate } = useLanguageToggle();

  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState();
  const [imageFile, setImageFile] = useState(data.imageFile);
  const [questionImages, setQuestionImages] = useState(["", ""]);
  const [answerImages, setAnswerImages] = useState(["", ""]);
  const [version, setVersion] = useState(1);
  const [questionImageList, setQuestionImageList] = useState([]);
  const [answerImageList, setAnswerImageList] = useState([]);
  function onImageChange(e) {
    setImages(URL.createObjectURL(e.target.files[0]));
    setImageFile(e.target.files[0]);
  }

  function onQuestionImageChange(e, index) {
    let t_images = questionImages;
    if (t_images)
      t_images[index] = e.target.files[0];
    console.log("=====>", t_images)
    setQuestionImages(t_images);
    setVersion(version + 1);
  }

  function onAnswerImageChange(e, index) {
    let t_images = answerImages;
    if (t_images)
      t_images[index] = e.target.files[0];
    console.log("=====>", t_images)
    setAnswerImages(t_images);
    setVersion(version + 1);
  }

  useEffect(() => {
    setIsSelected(props.selectedQuizs.includes(data.id));
  }, [JSON.stringify(props.selectedQuizs)]);

  useEffect(() => {
    setQuiz(props.data);
    setSubQuizList(props.data.subQuestions);
    setSubMatchList(props.data.subMatches);
    // const inputQuestion = document.getElementById(`question${index}`);
    const inputNormalHint = document.getElementById(`normalHint${index}`);

    props.data.subQuestions.forEach((subQuiz, subQuizId) => {
      const inputQuiz = document.getElementById(
        `DM_Quiz${index}SubQuiz${subQuizId}`
      );
      if (inputQuiz) inputQuiz.value = subQuiz;
    });

    props.data.subMatches.forEach((subMatch, subMatchId) => {
      const inputMatch = document.getElementById(
        `DM_Quiz${index}SubMatch${subMatchId}`
      );
      if (inputMatch) inputMatch.value = subMatch;
    });

    if (props.data.questionImages && props.data.questionImages.length > 0) {
      setQuestionImageList(props.data.questionImages.map(image => (`${image}`)));
    }
    if (props.data.answerImages && props.data.answerImages.length > 0) {
      setAnswerImageList(props.data.answerImages.map(image => (`${image}`)));
    }


    // inputQuestion.value = props.data.question;
    inputNormalHint.value = props.data.normalHint;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  useEffect(() => {
    subQuizList.forEach((subQuiz, subQuizId) => {
      const inputQuiz = document.getElementById(
        `DM_Quiz${index}SubQuiz${subQuizId}`
      );
      if (inputQuiz) inputQuiz.value = subQuiz;
      const inputPoint = document.getElementById(`point${index}SubMatch${subQuizId}`);
      inputPoint.value = props.data.point[subQuizId];
    });
  }, [index, subQuizList]);

  useEffect(() => {
    subQuizList.forEach((subQuiz, subQuizId) => {
      const inputQuiz = document.getElementById(
        `DM_Quiz${index}SubQuiz${subQuizId}`
      );
      if (inputQuiz) inputQuiz.value = subQuiz;
      const inputPoint = document.getElementById(`point${index}SubMatch${subQuizId}`);
      inputPoint.value = pointList[subQuizId];
    });
  }, [subQuizList]);

  useEffect(() => {
    subMatchList.forEach((subMatch, subMatchId) => {
      const inputMatch = document.getElementById(
        `DM_Quiz${index}SubMatch${subMatchId}`
      );
      if (inputMatch) inputMatch.value = subMatch;
    });
  }, [index, subMatchList]);

  const addOrUpdateQuestion = (body) => {
    if (!isUpdating) {
      return QGApi.addQuestion({ class_id: classId }, body);
    } else {
      return QGApi.updateQuestion(
        { class_id: classId, quiz_id: quiz.id },
        body
      );
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const subQuestions = subQuizList.map((_, subQuizId) => {
      return event.target[`DM_Quiz${index}SubQuiz${subQuizId}`].value;
    });
    const subMatches = subMatchList.map((_, subQuizId) => {
      return event.target[`DM_Quiz${index}SubMatch${subQuizId}`].value;
    });

    const body = new FormData();
    body.append('type', 4);
    // body.append('question', event.target[`question${index}`].value);
    subQuestions.forEach(question => {
      body.append('subQuestions', question);
    });
    subMatches.forEach(match => {
      body.append('subMatches', match);
    });
    questionImages.forEach(image => {
      body.append('questionImages', image);
    });
    answerImages.forEach(image => {
      body.append('answerImages', image);
    });
    subQuizList.forEach((_, subQuizId) => {
      body.append('point', Number(event.target[`point${index}SubMatch${subQuizId}`].value));
    });
    body.append('normalHint', event.target[`normalHint${index}`].value);
    body.append('level', level);
    if (imageFile !== undefined)
      body.append('imageFile', imageFile);

    setLoading(true);

    await addOrUpdateQuestion(body).then((res) => {
      updateData(index, res.data);
      if (res.data.questionImages)
        setQuestionImageList(res.data.questionImages.map(image => (`${image}`)));
      if (res.data.answerImages)
        setAnswerImageList(res.data.answerImages.map(image => (`${image}`)));
    }).catch(err => {
      alert(err.message);
    }).finally(() => {
      setLoading(false);
      setEditing(false);
    });
  };

  const handleEdit = () => {
    setIsUpdating(true);
    setEditing(true);

    // const inputQuestion = document.getElementById(`question${index}`);
    const inputPoint = document.getElementById(`point${index}`);
    const inputNormalHint = document.getElementById(`normalHint${index}`);

    data.subQuestions.forEach((subQuiz, subQuizId) => {
      document.getElementById(`DM_Quiz${index}SubQuiz${subQuizId}`).value =
        subQuiz;
    });
    data.subMatches.forEach((subMatch, subMatchId) => {
      document.getElementById(`DM_Quiz${index}SubMatch${subMatchId}`).value =
        subMatch;
    });
    // inputQuestion.value = data.question;
    inputPoint.value = data.point;
    inputNormalHint.value = data.normalHint;

    // inputQuestion.focus();
  };

  const handleShare = async () => {
    exportData(index);
  }

  const handleDelete = async () => {
    setLoading(true);
    if (quiz.id) {
      await QGApi.deleteQuestion({ class_id: classId, quiz_id: quiz.id }).then(
        (_) => {
          removeData(index);
        }
      );
    } else {
      removeData(index);
    }

    setLoading(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleAddSubQuiz = () => {
    let t_subQuesions = subQuizList.map((_, id) => {
      const inputSubQuiz = document.getElementById(
        `DM_Quiz${index}SubQuiz${id}`
      );
      return inputSubQuiz.value;
    });
    t_subQuesions.push("");
    let t_subMatches = subMatchList.map((_, id) => {
      const inputSubMatch = document.getElementById(
        `DM_Quiz${index}SubMatch${id}`
      );
      return inputSubMatch.value;
    });
    t_subMatches.push("");
    let t_subPoints = subQuizList.map((_, id) => {
      return document.getElementById(`point${index}SubMatch${id}`).value;
    });
    t_subPoints.push("");
    setSubQuizList(t_subQuesions);
    setSubMatchList(t_subMatches);
    setPointList(t_subPoints);
  };

  const handleDeleteSubQuiz = (subQuizId) => {
    let t_subQuesions = subQuizList.map((_, id) => {
      const inputSubQuiz = document.getElementById(
        `DM_Quiz${index}SubQuiz${id}`
      );
      return inputSubQuiz.value;
    });
    t_subQuesions.splice(subQuizId, 1);
    let t_subMatches = subMatchList.map((_, id) => {
      const inputSubMatch = document.getElementById(
        `DM_Quiz${index}SubMatch${id}`
      );
      return inputSubMatch.value;
    });
    t_subMatches.splice(subQuizId, 1);
    setSubQuizList(t_subQuesions);
    setSubMatchList(t_subMatches);
  };

  const checkSelect = (index) => {
    handleSelect(index, !isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <Card className={"mb-3" + (isSelected ? " selected" : "")}>
      <form className="was-validated" onSubmit={handleSave}>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <span className="me-2 fa-lg">{index + 1}. {translate("drag-and-match")}</span>
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
                ) : (
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
        </CardHeader>
        <CardBody>
          <div
            className={clsx({
              "d-block": true,
              "d-none": !isEditing,
            })}
          >
            <div className="d-flex w-100 mb-3">
              {/* <input
                type="text"
                className="form-control bg-white bg-opacity-5 me-2 is-invalid"
                placeholder="Type the title of the drag and match question"
                id={`question${index}`}
                required
              /> */}
            </div>
            <div className="mb-3">
              {subQuizList.map((_, subQuizId) => {
                return (
                  <div key={"subQuiz" + subQuizId}>
                    {subQuizId ? <hr></hr> : <></>}

                    <div
                      className="d-flex align-items-center mb-2"
                    >
                      <div className="form-check me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`DM_Radio_${index}_Sub_${subQuizId}`}
                        >
                          {"Q" + (subQuizId + 1)}
                        </label>
                      </div>

                      <div className="input-group flex-nowrap me-2">
                        <input
                          type="text"
                          className="form-control bg-white bg-opacity-5 is-invalid"
                          placeholder={`Type the question of match${subQuizId + 1} here.`}
                          id={`DM_Quiz${index}SubMatch${subQuizId}`}
                          required
                        />
                        <div
                          className="btn btn-outline-secondary"
                          onClick={() => handleDeleteSubQuiz(subQuizId)}
                        >
                          <i className="fas fa-md fa-fw fa-trash-alt"></i>
                        </div>
                      </div>
                      <div
                        className="input-group flex-nowrap"
                        style={{ width: "200px" }}
                      >
                        <input
                          type="number"
                          className="form-control is-invalid"
                          id={`point${index}SubMatch${subQuizId}`}
                          required
                        />
                        <span className="input-group-text">PT</span>
                      </div>
                    </div>

                    <div className="mb-3 d-flex">
                      <div className="form-check me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`DM_Radio_${index}_Sub_${subQuizId}`}
                          style={{ color: "rgba(0,0,0,0)" }}
                        >
                          {"Q" + (subQuizId + 1)}
                        </label>
                      </div>

                      <div>
                        <input type="file" className="form-control is-invalid" multiple accept="image/*" onChange={(e) => onQuestionImageChange(e, subQuizId)} />

                        {
                          questionImages[subQuizId] !== "" && questionImages[subQuizId] !== undefined &&
                          <div className="mt-3">
                            <div
                              className="col-xl-3 col-lg-4 col-md-6 pb-3"
                            >
                              <Card
                                className={
                                  "pos-checkout-table in-use"}
                              >
                                <img className="preview" src={URL.createObjectURL(questionImages[subQuizId])} alt="Quiz.." style={{ width: "150px" }} />
                              </Card>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <div
                      className="d-flex align-items-center mb-2"
                    >
                      <div className="form-check me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`DM_Radio_${index}_Sub_${subQuizId}`}
                        >
                          {"A" + (subQuizId + 1)}
                        </label>
                      </div>

                      <div className="input-group flex-nowrap">
                        <input
                          type="text"
                          className="form-control bg-white bg-opacity-5 is-invalid"
                          placeholder={`Type the answer of match${subQuizId + 1} here.`}
                          id={`DM_Quiz${index}SubQuiz${subQuizId}`}
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

                    <div className="mb-3 d-flex">
                      <div className="form-check me-2">
                        <label
                          className="form-check-label"
                          htmlFor={`DM_Radio_${index}_Sub_${subQuizId}`}
                          style={{ color: "rgba(0,0,0,0)" }}
                        >
                          {"A" + (subQuizId + 1)}
                        </label>
                      </div>

                      <div>
                        <input type="file" className="form-control is-invalid" multiple accept="image/*" onChange={(e) => onAnswerImageChange(e, subQuizId)} />

                        {
                          answerImages[subQuizId] !== "" && answerImages[subQuizId] !== undefined &&
                          <div className="mt-3">
                            <div
                              className="col-xl-3 col-lg-4 col-md-6 pb-3"
                            >
                              <Card
                                className={
                                  "pos-checkout-table in-use"}
                              >
                                <img className="preview" src={URL.createObjectURL(answerImages[subQuizId])} alt="Quiz.." style={{ width: "150px" }}></img>
                              </Card>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                );
              })}
            </div>

            {subQuizList.length < 4 &&
              <button
                className="btn btn-outline-theme btn-sm mb-3"
                type="button"
                onClick={() => handleAddSubQuiz()}
              >
                {translate("add-qna-pair")}
              </button>
            }
            <textarea
              className="form-control form-control-md bg-white bg-opacity-5 mb-2"
              rows="3"
              placeholder="Hint"
              id={`normalHint${index}`}
              required={false}
            />

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
                    <img className="preview" src={images} alt="Quiz.."></img>
                  </Card>
                </div>
              </div>
            }
          </div>

          <div
            className={clsx({
              "d-block": true,
              "d-none": isEditing,
            })}
          >
            <div className="mb-3">
              {quiz.subMatches.map((subQuiz, subQuizId) => {
                return (
                  <div key={"subQuizShow" + subQuizId}>
                    <div
                      className={clsx({
                        "d-flex align-items-center mb-1": true,
                      })}

                    >
                      <span className="me-2">{subQuizId + 1}</span>
                      <span className="d-flex align-items-center">
                        <span>
                          {quiz.point[subQuizId]} {translate("point")}
                        </span>
                      </span>
                    </div>
                    <div>{subQuiz}</div>
                    {
                      questionImageList.length > 0 && questionImageList[subQuizId] &&
                      <img
                        className="preview"
                        id={`questionImage${subQuizId}`}
                        alt={`questionimage${subQuizId}`}
                        style={{ width: '150px' }}
                        src={questionImageList[subQuizId]}
                      />
                    }
                  </div>
                );
              })}
            </div>

            <div className="mb-3">
              {quiz.subQuestions.map((subMatch, subQuizId) => {
                return (
                  <div key={"subMatchShow" + subQuizId}>
                    <div
                      className={clsx({
                        "d-flex align-items-center mb-1": true,
                      })}
                    >
                      <span className="me-3">
                        {String.fromCharCode(65 + subQuizId)}
                      </span>

                      <span>{subMatch}</span>
                    </div>
                    {answerImageList.length > 0 && answerImageList[subQuizId] &&
                      <img
                        className="preview"
                        id={`answerImage${subQuizId}`}
                        alt={`answerImage${subQuizId}`}
                        style={{ width: '150px' }}
                        src={answerImageList[subQuizId]}
                      />
                    }
                  </div>
                );
              })}
            </div>

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
                      <img
                        className="preview"
                        src={`${quiz.imageFile}`}
                        alt="Quiz.."
                      />
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

export { DragAndMatchQuiz };
