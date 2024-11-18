import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardBody } from "../../../components/card/card";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";

const TopQuestionsLevel = () => {
  const { schoolId } = useSelector((state) => state.auth.userInfo);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("listening-A");
  const [level, setLevel] = useState(1);
  const [loading, setLoading] = useState(true);

  const handlePrev = () => {
    setCurrentIndex((ps) => {
      if (ps > 0) return ps - 1;
      else return 0;
    });
  };

  const handleNext = () => {
    setCurrentIndex((ps) => {
      const max = questions.length;
      if (ps < max) return ps + 1;
      else return max;
    });
  };

  const fetchData = async (paperType, paperLevel) => {
    try {
      setLoading(true);
      const res = await AnalyticsAPI.getTop20WrongQuestionsByLevel(
        schoolId,
        paperType,
        paperLevel
      );
      if (res.status === 200) {
        setQuestions(res.data);
        setCurrentIndex(0);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(category, level);
  }, [category, level]);

  return (
    <div className="mb-4">
      <Card className="bg-transparent border">
        <CardBody>
          <div className="fw-bold fs-16px mb-2">
            Top 20 wrong questions{" "}
            <span className="fw-normal fs-6">(By level of each paper)</span>
          </div>
          <div className="d-flex flex-wrap justify-content-between gap-2 mb-2">
            <ul className="nav nav-tabs nav-tabs-v2">
              <li
                className="nav-item me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setCategory("listening")}
              >
                <a
                  className="nav-link active px-2 text-black"
                  data-bs-toggle="tab"
                >
                  Listening
                </a>
              </li>
              <li
                className="nav-item me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setCategory("writing")}
              >
                <a className="nav-link px-2 text-black" data-bs-toggle="tab">
                  Writing
                </a>
              </li>
              <li
                className="nav-item me-3"
                style={{ cursor: "pointer" }}
                onClick={() => setCategory("reading")}
              >
                <a className="nav-link px-2 text-black" data-bs-toggle="tab">
                  Reading
                </a>
              </li>
              <li className="nav-item"
                style={{ cursor: "pointer" }} onClick={() => setCategory("speaking")}>
                <a className="nav-link px-2 text-black" data-bs-toggle="tab">
                  Speaking
                </a>
              </li>
            </ul>
            <ul className="nav nav-tabs nav-tabs-v2">
              <li className="nav-item me-3"
                style={{ cursor: "pointer" }} onClick={() => setLevel(1)}>
                <a
                  className="nav-link active px-2 text-black"
                  data-bs-toggle="tab"
                >
                  Level 1
                </a>
              </li>
              <li className="nav-item me-3"
                style={{ cursor: "pointer" }} onClick={() => setLevel(2)}>
                <a className="nav-link px-2 text-black" data-bs-toggle="tab">
                  Level 2
                </a>
              </li>
              <li className="nav-item me-3"
                style={{ cursor: "pointer" }} onClick={() => setLevel(3)}>
                <a className="nav-link px-2 text-black" data-bs-toggle="tab">
                  Level 3
                </a>
              </li>
              <li className="nav-item"
                style={{ cursor: "pointer" }} onClick={() => setLevel(4)}>
                <a className="nav-link px-2 text-black" data-bs-toggle="tab">
                  Level 4
                </a>
              </li>
            </ul>
          </div>
          <div className="p-3 border mb-2">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {questions.length ? (
                  <>
                    <div className="border-bottom">
                      <div className="fs-5">No. {currentIndex + 1}</div>
                    </div>
                    <div className="mt-1">
                      {Object.keys(questions[currentIndex].data).map(
                        (key, index) => {
                          if (key === "main_question") {
                            return (
                              <>
                                <div className="d-flex gap-1" key={index}>
                                  <p className="fw-bold text-capitalize">
                                    Question:
                                  </p>
                                  <div>
                                    <p>{questions[currentIndex].data[key]}</p>
                                    <ul className="">
                                      {questions[currentIndex].data[
                                        "sub_questions"
                                      ].map((item, idx) => (
                                        <li key={idx + "sub_questions"}>
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </>
                            );
                          } else if (key === "sub_questions") return <></>;
                          else
                            return (
                              <div key={index}>
                                <span className="fw-bold text-capitalize">
                                  {key.replace("_", " ")}:
                                </span>{" "}
                                {questions[currentIndex].data[key]}
                              </div>
                            );
                        }
                      )}
                    </div>
                  </>
                ) : (
                  "No data"
                )}
              </>
            )}
          </div>
          <div className="btn-group float-end">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handlePrev()}
              disabled={questions.length === 0 || currentIndex === 0}
            >
              Prev
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleNext()}
              disabled={
                questions.length === 0 || currentIndex === questions.length - 1
              }
            >
              Next
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TopQuestionsLevel;
