import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardBody } from "../../../components/card/card";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";

const TopQuestions = () => {
  const { schoolId } = useSelector((state) => state.auth.userInfo);

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AnalyticsAPI.getTop10WrongQuestions(schoolId);
        if (res.status === 200) {
          setQuestions(res.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mb-4">
      <Card className="bg-transparent border">
        <CardBody>
          <div className="fw-bold fs-16px mb-2">Top 10 wrong questions</div>
          <div className="p-3 border mb-2">
            {loading ? (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {questions.length ? (
                  <>
                    <div className="d-flex justify-content-between gap-4 border-bottom">
                      <div className="fs-5">No. {currentIndex + 1}</div>
                      <div className="fs-5 text-capitalize">
                        {questions[currentIndex].category} / level{" "}
                        {questions[currentIndex].level}
                      </div>
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

export default TopQuestions;
