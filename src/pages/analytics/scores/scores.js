import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

import { Card, CardBody, CardHeader } from "../../../components/card/card";
// import { studentsData, classData } from "../dummy-data";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";
import { formatDate } from "../utils";

const initialData = {
  options: {
    dataLabels: {
      dropShadow: { enabled: false, top: 1, left: 1, blur: 1, opacity: 1 },
    },
    stroke: { show: false },
    labels: ["Reading", "Writing", "Listening", "Speaking"],
    title: {
      text: "Student Scores",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    legend: { labels: { colors: "#ffffff" } },
  },
  series: [],
};
const Scores = () => {
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [selectedGame, setSelectedGame] = useState("Village");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

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

  const getRandomElement = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const changeChartData = (data) => {
    switch (selectedGame) {
      case "Village":
        setChartData({
          ...initialData,
          series: data
            ? [data.reading, data.writing, data.listening, data.speaking]
            : [],
          options: {
            ...initialData.options,
            labels: ["Reading", "Writing", "Listening", "Speaking"],
          },
        });
        break;
      case "Tag":
        setChartData({
          ...initialData,
          series: data
            ? [data.images, data.signs, data.vocabulary, data.comprehension]
            : [],
          options: {
            ...initialData.options,
            labels: ["Images", "Signs", "Vocabulary", "Comprehension"],
          },
        });
        break;
      case "WordDash":
        setChartData({
          ...initialData,
          series: data
            ? [data.ranking, data.ratio, data.spelling, data["mystery-words"]]
            : [],
          options: {
            ...initialData.options,
            labels: ["Ranking", "W/L Ratio", "Spelling", "Mystery Words"],
          },
        });
        break;
      // case 'all':
      //   setChartData(initialData);
      //   break;
      default:
        setChartData(initialData);
        break;
    }
  };

  const handleSelectGame = (e) => {
    setSelectedGame(e.target.value);
    setSelectedClass("");
  };

  const handleSelectClass = async (e) => {
    const classId = e.target.value;
    console.log(classId);

    if (classId == "Select Class") {
      setSelectedClass('');
    } else {
      setSelectedClass(classId);
    }

    const studentsData = await AnalyticsAPI.getStudentsData({ classId });

    // Extract the data in the desired format
    const studentsList = await extractStudentNames(studentsData.data);

    console.log(studentsList);  // This should give you the array of students

    // Set the student data in the state
    await setStudentData(studentsList);
  };

  const handleSelectStudent = async (e) => {
    setSelectedStudent(e.target.value);
    const getData = await getScoreData(
      "Village",
      selectedClass,
      e.target.value
    );
    changeChartData(getData);
    if (selectedGame === "Village") {
      const villageData = await getVillageScoreData(
        selectedClass,
        e.target.value
      );
      setVillageData(villageData);
    }
  };

  // State to hold chart data
  const [chartData, setChartData] = useState(initialData);
  const [villageData, setVillageData] = useState(null);

  const getScoreData = async (game, class_id, student_id) => {
    if (game === "" || class_id === "" || student_id === "") return;
    try {
      setLoading(true);

      const data = await AnalyticsAPI.getScoresByStudent({
        game,
        class_id,
        student_id,
      });
      return data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getVillageScoreData = async (class_id, student_id) => {
    if (class_id === "" || student_id === "") return;
    try {
      setLoading(true);

      const data = await AnalyticsAPI.getSkillScoresByStudent({
        class_id,
        student_id,
      });
      return data.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchClass = async () => {
      const classData = await VillageApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const classes = classData.data.ret.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setClassData(classes);
      setTeacherData(classData.data.ret)

      setLoading(false);
    };

    fetchClass().catch(() => {
      setLoading(false);
    });
  }, []);

  console.log(studentData)

  return (
    <div>
      <div className="h5">STUDENT SCORE CHART</div>
      <div className="">
        <div className="flex gap-4">
          {/* <div className="input-group mt-4">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Game
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              value={selectedGame}
              onChange={handleSelectGame}
            >
              <option defaultValue={""}>Choose...</option>
              <option value="Village">The Village</option>
              <option value="Tag">Tag</option>
              <option value="WordDash">Word Dash</option>
            </select>
          </div> */}
          <div className="mt-2 row">
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
                  {classData.map((item, index) => (
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
        </div>
        <div className="mt-4">
          {selectedGame && selectedClass && selectedStudent ? (
            <>
              <Card>
                <CardHeader className="text-theme fs-3">
                  {
                    studentData.find(
                      (student) => student.student_id === selectedStudent
                    )?.name
                  }{" "}
                  <span className="fs-4 text-white">
                    ({classData.find((item) => item.id === selectedClass)?.name}
                    )
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="d-flex align-items-center justify-content-center">
                    <Chart
                      type="donut"
                      options={chartData.options}
                      series={chartData.series}
                      width={540}
                    />
                  </div>
                </CardBody>
              </Card>
              {selectedGame === "Village" && villageData && (
                <div className="row mt-4">
                  <h4>Scores</h4>
                  <Card className="m-2 text-white">
                    <CardBody>
                      <div
                        className="d-flex align-items-center justify-content-between bg-secondary text-uppercase"
                        style={{ height: "50px" }}
                      >
                        <div className="ps-2">skill</div>
                        <div className="d-flex align-items-center">
                          <div
                            className="text-center border border-secondary border-top-0 border-bottom-0"
                            style={{ width: "150px" }}
                          >
                            smartscore
                          </div>
                          <div
                            className="text-center"
                            style={{ width: "150px" }}
                          >
                            questions answered
                          </div>
                          <div
                            className="text-center"
                            style={{ width: "150px" }}
                          >
                            time spent
                          </div>
                          <div
                            className="text-center"
                            style={{ width: "150px" }}
                          >
                            last practiced
                          </div>
                        </div>
                      </div>
                      <div
                        className="overflow-y-scroll"
                      // style={{ maxHeight: "800px" }}
                      >
                        {Object.keys(villageData).map((key, index) => {
                          const item = villageData[key];
                          return (
                            <>
                              <div
                                className="accordion-header bg-theme text-uppercase align-middle ps-3 pt-2 mb-1"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${key}-${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse-${key}-${index}`}
                                style={{ height: "36px" }}
                                key={index}
                              >
                                {key}
                              </div>
                              <div
                                id={`collapse-${key}-${index}`}
                                className="accordion-collapse collapse show"
                              >
                                {item.map((childItem, idx) => (
                                  <div
                                    className="d-flex align-items-center justify-content-between"
                                    style={{ height: "36px" }}
                                    key={`${key}-${childItem.name}`}
                                  >
                                    <div className="ps-4">{childItem.name}</div>
                                    <div className="d-flex align-items-center align-self-stretch">
                                      <div
                                        className="text-center border border-secondary border-top-0 d-flex align-items-center justify-content-center align-self-stretch"
                                        style={{ width: "150px" }}
                                      >
                                        {childItem.totalScore || ""}
                                      </div>
                                      <div
                                        className="text-center border-secondary border-bottom d-flex align-items-center justify-content-center align-self-stretch"
                                        style={{ width: "150px" }}
                                      >
                                        {childItem.totalQuestions || ""}
                                      </div>
                                      <div
                                        className="text-center border-secondary border-bottom d-flex align-items-center justify-content-center align-self-stretch"
                                        style={{ width: "150px" }}
                                      >
                                        {childItem.totalSpentTime || ""}
                                      </div>
                                      <div
                                        className="text-center border-secondary border-bottom d-flex align-items-center justify-content-center align-self-stretch"
                                        style={{ width: "150px" }}
                                      >
                                        {childItem.last_practiced
                                          ? formatDate(childItem.last_practiced)
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}
            </>
          ) : (
            <Card>
              <CardBody>Select Game, Class and Student</CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scores;
