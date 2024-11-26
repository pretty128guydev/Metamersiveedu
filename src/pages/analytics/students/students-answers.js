import React from "react";

import { getIntervalDescription } from "../utils";

const StudentsByAnswers = ({ data, selectedStudent }) => {
  const objKeys = Object.keys(data);

  // If selectedStudent exists, filter the data
  const filteredKeys = selectedStudent
    ? objKeys.filter((key) => data[key].student_name === selectedStudent)
    : objKeys;

  return (
    <div>
      <div className="h5">Students</div>
      <div className="d-flex flex-column mt-2 gap-2 text-white">
        {filteredKeys.map((key, index) => {
          const item = data[key];
          console.log(item)
          return (
            <div className="bg-gray-600 rounded" key={key}>
              {/* Header */}
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
              {/* Activities */}
              <div>
                {item.data.map((subItem, idx) => (
                  <div
                    className={`${idx % 2 === 0 ? "" : "bg-gray-700"} py-1 ps-5 pe-3 d-flex align-items-center justify-content-between gap-5`}
                    key={`${item.student_name}-${idx}`}
                  >
                    <div className="d-flex align-items-center gap-3 flex-grow-1">
                      <div className="fs-5 text-nowrap">{subItem.game}</div>
                      <div className="text-truncate">{subItem.category || ""}</div>
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
                      {subItem.questions.total > 0 ? (
                        <div className="d-flex gap-1 align-items-center w-100 px-2">
                          {/* Start Label */}
                          <div className="me-2">0%</div>

                          <div className="w-100 position-relative">
                            {/* Progress Bar */}
                            <div
                              className="progress"
                              role="progressbar"
                              aria-label="Success example"
                              aria-valuenow={(subItem.questions.correct / subItem.questions.total) * 100}
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ height: "8px" }}
                            >
                              <div
                                className="progress-bar bg-green-600"
                                style={{
                                  width: `${Math.min((subItem.questions.correct / subItem.questions.total) * 100, 100)}%`, // Calculate correct/total * 100, cap at 100%
                                }}
                              ></div>
                            </div>

                            {/* Position Indicator */}
                            <div
                              className="position-absolute"
                              style={{
                                transform: `translate(-50%, -50%)`, // Center the indicator
                                top: "50%", // Vertically center it
                                left: `${Math.min((subItem.questions.correct / subItem.questions.total) * 100, 100)}%`, // Position indicator based on correct/total * 100, cap at 100%
                                borderTop: "10px solid transparent",
                                borderBottom: "10px solid transparent",
                                borderLeft: "10px solid #18a329",
                              }}
                            ></div>
                          </div>

                          {/* End Label */}
                          <div className="text-white">
                            {Math.round((subItem.questions.correct / subItem.questions.total) * 100)}%
                          </div>
                        </div>
                      ) : (
                        <div>No Data Available</div> // Handle case where total is 0
                      )}

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
