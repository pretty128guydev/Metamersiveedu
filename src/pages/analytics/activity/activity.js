import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

import { Card, CardBody, CardHeader } from "../../../components/card/card";
import BarsScale from "../../../components/loading/BarsScale";

import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import { formatTimeFromMinutes } from "../utils";
import VillageApi from "../../../api-clients/VillageApi";
import SkillProgress from "../students/skill-progress";

const ChartApex = ({ data }) => {
  const themeFont = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-family")
    .trim();

  // pie chart
  const pieChartOptions = {
    dataLabels: {
      dropShadow: { enabled: false, top: 1, left: 1, blur: 1, opacity: 1 },
    },
    stroke: { show: false },
    labels: ["Word Dash", "The Village", "Tag"],
    title: {
      text: "PRACTICE BY GAME",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    legend: { fontFamily: themeFont, labels: { colors: "#ffffff" } },
  };

  let pieChartData = [];
  if (data) {
    pieChartData = [+data.worddash, +data.village, +data.tag];
  }

  return (
    <div className="py-2">
      <Chart type="pie" options={pieChartOptions} series={pieChartData} />
    </div>
  );
};

const ChartBar = ({ data }) => {
  let homeData = [];
  let schoolData = [];
  let timeData = [];

  if (data) {
    data.forEach((item) => {
      homeData.push(item.home);
      schoolData.push(item.school);
      timeData.push(item.time);
    });
  }
  const series = [
    {
      name: "Home",
      data: homeData,
    },
    {
      name: "School",
      data: schoolData,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 450,
      stacked: true,
      toolbar: {
        show: false,
      },
      // zoom: {
      //   enabled: true,
      // },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          hideOverflowingLabels: true,
          total: {
            enabled: true,
            style: {
              fontSize: "10px",
              fontWeight: 600,
              color: "white",
            },
          },
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: timeData,
      labels: {
        style: {
          colors: "#fff",
        },
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM",
          day: "dd",
          hour: "HH:mm",
        },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#fff" },
      },
      title: {
        text: "Time spent (mins)",
        style: {
          color: "#FFF",
        },
      },
    },
    title: {
      text: "PRACTICE BY DAY",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#fff",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#fff",
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        format: "yyyy MM dd",
      },
    },
  };
  return (
    <div className="py-2">
      <Chart type="bar" options={options} series={series} />
    </div>
  );
};


const Activity = () => {
  const [loading, setLoading] = useState(false);
  const [totalTimeByGame, setTotalTimeByGame] = useState(null);
  const [totalTimeByLocation, setTotalTimeByLocation] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  const userInfo = useSelector((store) => store.auth.userInfo);

  const extractStudentNames = (data) => {
    const students = [];

    // Loop through each student ID in the data
    for (const studentId in data) {
      const student = data[studentId];

      // Push the student_id and student_name into the array
      if (student && student.student_name) {
        students.push({
          student_id: studentId,
          name: student.student_name,
        });
      }
    }

    return students;
  };

  const handleSelectClass = async (e) => {
    const classId = e.target.value;

    if (classId == "Select Class") {
      setSelectedClass('');
    } else {
      setSelectedClass(classId);
    }

    const studentsData = await AnalyticsAPI.getStudentsData({ classId });
    // Extract the data in the desired format
    const studentsList = await extractStudentNames(studentsData.data);

    // Set the student data in the state
    await setStudentData(studentsList);
  };

  const handleSelectStudent = async (e) => {
    const selectedId = e.target.value;
    if (e.target.value == "Select Student") {
      setSelectedStudent('')
    } else {
      setSelectedStudent(e.target.value);
    }

    const selectedStudentData = studentData.find(
      (student) => student.student_id === selectedId
    );
    setSelectedStudentName(selectedStudentData?.name)
  };

  useEffect(() => {
    setLoading(true);

    const fetchAllApisForAllClasses = async () => {
      try {
        const classData = await VillageApi.getClassroomsByTeacherId({
          teacher_id: userInfo.uid,
        });

        const classes = classData.data.ret.map((item) => item.id);
        const classesWithNames = classData.data.ret.map((item) => ({
          id: item.id,
          name: item.name,
        }));

        setClassData(classes);
        setClassesData(classesWithNames);
        setTeacherData(classData.data.ret);

        if (!selectedClass) {
          // Fetch data for all classes concurrently
          const [timeByGameData, timeByLocationData, studentsDataArray] = await Promise.all([
            Promise.all(
              classes.map((classId) =>
                AnalyticsAPI.getTotalSpentTimeByGame({ classId })
              )
            ),
            Promise.all(
              classes.map((classId) =>
                AnalyticsAPI.getTotalSpentTimeByLocation({ classId })
              )
            ),
            Promise.all(
              classes.map((classId) =>
                AnalyticsAPI.getStudentsData({ classId })
              )
            ),
          ]);
          // Aggregate data for total time by game
          const aggregatedTimeByGame = timeByGameData.reduce((acc, curr) => {
            const data = curr.data;
            for (let game in data) {
              acc[game] = (acc[game] || 0) + data[game];
            }
            return acc;
          }, {});
          setTotalTimeByGame(aggregatedTimeByGame);

          // Aggregate data for total time by location
          const aggregatedTimeByLocation = [];
          timeByLocationData.forEach((data) => {
            aggregatedTimeByLocation.push(...data.data);
          });
          setTotalTimeByLocation(aggregatedTimeByLocation);

          // Combine all students' data
          const aggregatedStudentsData = studentsDataArray.reduce(
            (acc, curr) => ({ ...acc, ...curr.data }),
            {}
          );
          setStudentsData(aggregatedStudentsData);
        } else {
          // Fetch data for the selected class only

          if (selectedStudent) {
            const [timeByGameData, timeByLocationData, studentsData] = await Promise.all([
              AnalyticsAPI.getTotalSpentTimeByGameStudent({ classId: selectedClass, studentId: selectedStudent }),
              AnalyticsAPI.getTotalSpentTimeByLocationStudent({ classId: selectedClass, studentId: selectedStudent }),
              AnalyticsAPI.getStudentsDataStudent({ classId: selectedClass, studentId: selectedStudent }),
            ]);
            setTotalTimeByGame(timeByGameData.data);
            setTotalTimeByLocation(timeByLocationData.data);
            setStudentsData(studentsData.data);
          } else {
            const [timeByGameData, timeByLocationData, studentsData] = await Promise.all([
              AnalyticsAPI.getTotalSpentTimeByGame({ classId: selectedClass }),
              AnalyticsAPI.getTotalSpentTimeByLocation({ classId: selectedClass }),
              AnalyticsAPI.getStudentsData({ classId: selectedClass }),
            ]);
            setTotalTimeByGame(timeByGameData.data);
            setTotalTimeByLocation(timeByLocationData.data);
            setStudentsData(studentsData.data);
          }

          // Set data for the selected class
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data for all classes:", error);
        setLoading(false);
      }
    };

    fetchAllApisForAllClasses();
  }, [selectedClass, selectedStudent]);



  const totalQuestions = useMemo(() => {
    return Object.entries(studentsData).reduce(
      (sum, [_, innerObj]) => sum + innerObj.total_questions,
      0
    );
  }, [studentsData]);


  return (
    <div>
      <>
        <div className="h5">Performance Overview</div>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center vh-100">
            <BarsScale />
          </div>
        ) : (
          <>
            <div className="mt-4">
              <div className="mt-2 row mb-2">
                <div className="col">
                  <div className="input-group">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect02"
                    >
                      Class
                    </label>
                    <select
                      className="form-select"
                      id="inputGroupSelect02"
                      value={selectedClass}
                      onChange={handleSelectClass}
                    >
                      <option defaultValue={""}>Select Class</option>
                      {classesData.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="input-group">
                    <label
                      className="input-group-text"
                      htmlFor="inputGroupSelect03"
                    >
                      Student
                    </label>
                    <select
                      className="form-select"
                      id="inputGroupSelect03"
                      value={selectedStudent}
                      onChange={handleSelectStudent}
                    >
                      <option defaultValue={""}>Select Student</option>
                      {studentData?.map((item, index) => (
                        <option value={item?.student_id} key={index}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <Card>
                {/* <CardHeader>
                  <h3 className="mb-0 fw-lighter">
                    In the last 30 days, students have...
                  </h3>
                </CardHeader> */}
                <CardBody>
                  <div className="row gap-4">
                    <div className="col d-flex align-items-center justify-content-center">
                      <div className="d-flex gap-4 py-2">
                        <div className="w-40px h-40px d-flex align-items-center justify-content-center bg-green-600 text-white rounded-2">
                          <i className="fas fa-2xl fa-fw fa-pencil"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div>Completed Questions</div>
                          <h3 className="mb-0">{totalQuestions}</h3>
                          {/* <div>QUESTIONS</div> */}
                          {/* <div>88 Correct Answers</div>
                          <div>22 Incorrect Answers</div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                      <div className="d-flex gap-4 py-2">
                        <div className="w-40px h-40px d-flex align-items-center justify-content-center bg-blue-600 text-white rounded-2">
                          <i className="far fa-2xl fa-fw fa-clock"></i>
                        </div>
                        <div>
                          <div>Time Spent</div>
                          <h3 className="mb-0">
                            {totalTimeByGame
                              ? formatTimeFromMinutes(
                                Object.values(totalTimeByGame).reduce(
                                  (sum, currVal) => sum + +currVal,
                                  0
                                )
                              )
                              : 0}
                          </h3>
                          {/* <div>PRACTICING</div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-center">
                      <div className="d-flex gap-4 py-2">
                        <div className="w-40px h-40px d-flex align-items-center justify-content-center bg-orange-600 text-white rounded-2">
                          <i className="fas fa-2xl fa-fw fa-lightbulb"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div>Active Students</div>
                          <h3 className="mb-0">0</h3>
                          {/* <div>SKILLS</div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="row mt-2 p-2">
                <Card className="col-5">
                  <ChartApex data={totalTimeByGame} />
                </Card>
                <Card className="col-7">
                  <ChartBar data={totalTimeByLocation} />
                </Card>
              </div>
            </div>
            <div className="mt-4">
              <SkillProgress selectedClass={selectedClass} selectedStudent={selectedStudentName} />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Activity;
