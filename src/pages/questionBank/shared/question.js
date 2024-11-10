/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useParams, useLocation } from "react-router-dom";
import { Card, CardBody } from "../../../components/card/card.jsx";
import { AppSettings } from "../../../config/app-settings.js";
import QBApi from "../../../api-clients/QBApi";
import BarsScale from "../../../components/loading/BarsScale.jsx";
import { FillingGapQuiz } from "../../../components/QBQuiz/FG";
import { TrueFalseQuiz } from "../../../components/QBQuiz/TF";
import { MultiChoiceQuiz } from "../../../components/QBQuiz/MC";
import { LongAnswerQuiz } from "../../../components/QBQuiz/LA";

function QBSharedQuestion() {
  const context = useContext(AppSettings);
  const [quizList, setQuizList] = useState([]);
  const { subject_id, topic_id } = useParams();
  const [getQuestionsLoading, setGetQuestionsLoading] = useState(false);
  const location = useLocation();
  const { teacher_id } = location.state;

  useEffect(() => {
    setGetQuestionsLoading(true);

    QBApi.getQuestions({
      teacher_id: teacher_id,
      subject_id: subject_id,
      topic_id: topic_id,
    })
      .then((res) => {
        setQuizList(res.data);
        setGetQuestionsLoading(false);
      })
      .catch((_) => {
        setGetQuestionsLoading(false);
      });

    context.setAppContentFullHeight(true);
    context.setAppContentClass("p-1 ps-xl-4 pe-xl-4 pt-xl-3 pb-xl-3");

    return function cleanUp() {
      context.setAppContentFullHeight(false);
      context.setAppContentClass("");
    };
  }, []);

  return (
    <div className="h-100">
      <Card className={"pos "} id="pos">
        <CardBody className="pos-container">
          <div className="pos-content">
            <PerfectScrollbar className="pos-content-container h-100 p-4">
              {getQuestionsLoading && (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <BarsScale />
                </div>
              )}
              {!getQuestionsLoading &&
                quizList.map((quiz, index) => {
                  switch (quiz.type) {
                    case 0:
                      return (
                        <TrueFalseQuiz
                          key={`QB_TF_Quiz-${index}`}
                          index={index}
                          subject_id={subject_id}
                          topic_id={topic_id}
                          data={quiz}
                          disabled={true}
                        />
                      );
                    case 1:
                      return (
                        <MultiChoiceQuiz
                          key={`QB_MC_Quiz-${index}`}
                          index={index}
                          subject_id={subject_id}
                          topic_id={topic_id}
                          data={quiz}
                          disabled={true}
                        />
                      );
                    case 2:
                      return (
                        <FillingGapQuiz
                          key={`QB_FG_Quiz-${index}`}
                          index={index}
                          subject_id={subject_id}
                          topic_id={topic_id}
                          data={quiz}
                          disabled={true}
                        />
                      );
                    default:
                      return (
                        <LongAnswerQuiz
                          key={`QB_LA_Quiz-${index}`}
                          index={index}
                          subject_id={subject_id}
                          topic_id={topic_id}
                          data={quiz}
                          disabled={true}
                        />
                      );
                  }
                })}
            </PerfectScrollbar>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default QBSharedQuestion;
