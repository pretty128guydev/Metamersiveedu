import React from "react";

import { getIntervalDescription } from "../utils";

const StudentsByAnswers = ({ data }) => {
  const objKeys = Object.keys(data);
  return (
    <div>
      <div className="h5">Students</div>
      <div className="d-flex flex-column mt-2 gap-2 text-white">
        {objKeys.map((key, index) => {
          const item = data[key];
          return (
            <div className="bg-gray-600 rounded" key={key}>
              <div className="p-2 border-bottom border-theme d-flex align-items-center gap-5 pe-3">
                <div className="d-flex align-items-center flex-grow-1">
                  <div className="flex-shrink-0">
                    <div className="w-40px h-40px d-flex align-items-center justify-content-center bg-theme text-white rounded-circle">
                      <i className="fas fa-xl fa-fw fa-user"></i>
                    </div>
                  </div>
                  <div className="text-theme fw-bold ms-3 fs-5">
                    {item.student_name}
                  </div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{ flexBasis: "120px" }}
                >
                  <i className="fas fa-sm fa-fw fa-pencil text-green-400"></i>
                  <div>{item.total_questions} questions</div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{ flexBasis: "120px" }}
                >
                  <i className="far fa-sm fa-fw fa-clock text-info-400"></i>
                  <div>{item.total_spent_time} min</div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{ flexBasis: "180px" }}
                >
                  <i className="far fa-sm fa-fw fa-calendar-check text-purple-400"></i>
                  <div>
                    {item.last_play_time
                      ? `Practiced ${getIntervalDescription(
                          item.last_play_time
                        )}`
                      : "No practice"}
                  </div>
                </div>
              </div>
              <div>
                {item.data.map((subItem, idx) => (
                  <div
                    className={`${
                      idx % 2 === 0 ? "" : "bg-gray-700"
                    } py-1 ps-5 pe-3 d-flex align-items-center justify-content-between gap-5`}
                    key={`${item.student_name}-${idx}`}
                  >
                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                      {/* <i className="fas fa-sm fa-fw fa-gamepad"></i>
                  <div className="text-white fs-5">Word Dash</div>
                  <div className="text-gray-200 fs-6">
                    ({item.words} Mystery Words, {item.time} minutes)
                  </div> */}
                      <div className="fs-5 text-nowrap">{subItem.game}</div>
                      <div className="text-truncate">{subItem.level || ""}</div>
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center gap-2"
                      style={{ flexBasis: "120px" }}
                    >
                      {subItem.questions.total}
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center gap-2"
                      style={{ flexBasis: "120px" }}
                    >
                      {parseInt(subItem.spent_time)} min
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center gap-2"
                      style={{ flexBasis: "180px" }}
                    >
                      {subItem.questions.score ? (
                        <div className="d-flex gap-1 align-items-center w-100 px-2">
                          <div className="me-2">0</div>
                          <div className="w-100 position-relative">
                            <div
                              className="progress"
                              role="progressbar"
                              aria-label="Success example"
                              aria-valuenow={subItem.questions.score}
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ height: "8px" }}
                            >
                              <div
                                className="progress-bar bg-green-600"
                                style={{
                                  width: `calc(${
                                    subItem.questions.score + "%"
                                  } - 10px)`,
                                }}
                              >
                                {/* {subItem.score} */}
                              </div>
                            </div>
                            <div
                              className="position-absolute"
                              style={{
                                transform: `translate(0, -50%)`,
                                top: "50%",
                                left: `calc(${
                                  subItem.questions.score + "%"
                                } - 10px)`,
                                borderTop: "10px solid transparent",
                                borderBottom: "10px solid transparent",
                                borderLeft: "10px solid #18a329",
                              }}
                            ></div>
                          </div>
                          <div className="text-white">
                            {subItem.questions.score}
                          </div>
                        </div>
                      ) : (
                        // <div className="text-green-400">{subItem.score}</div>
                        <></>
                      )}
                      {/* <div className="text-theme">See Action Plan &gt;&gt;</div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentsByAnswers;
