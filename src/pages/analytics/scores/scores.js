import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

import { Card, CardBody, CardHeader } from "../../../components/card/card";
// import { studentsData, classData } from "../dummy-data";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";
import { formatDate } from "../utils";
import WordApi from "../../../api-clients/WordApi";
import TagApi from "../../../api-clients/TagApi";

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
  const [chartData, setChartData] = useState(initialData);
  const [villageData, setVillageData] = useState(null);


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

  const handleSelectClass = async (e) => {
    const classId = e.target.value;

    if (classId == "Select All") {
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

  const changeChartData = (data) => {
    const customColors = {
      Village: {
        Reading: "#008ffb", // Blue
        Writing: "#00e396", // Green
        "Listening A": "#ff4560", // Red (Change this to desired color)
        "Listening B": "#775dd0", // Red (Change this to desired color)
        Speaking: "#feb019", // Yellow (Change this to desired color)
        Pronunciation: "yellow"
      },
      Tag: {
        Images: "#9B59B6",
        Signs: "#34495E",
        Vocabulary: "#1ABC9C",
        Comprehension: "#E67E22",
      },
      WordDash: {
        Ranking: "#D35400",
        "W/L Ratio": "#16A085",
        Spelling: "#8E44AD",
        "Mystery Words": "#27AE60",
      },
    };

    const selectedColors = customColors[selectedGame] || {};

    const labels = {
      Village: ["Reading", "Writing", "Listening A", "Listening B", "Speaking", "Pronunciation"],
      Tag: ["Images", "Signs", "Vocabulary", "Comprehension"],
      WordDash: ["Ranking", "W/L Ratio", "Spelling", "Mystery Words"],
    };

    switch (selectedGame) {
      case "Village":
        setChartData({
          ...initialData,
          series: data
            ? [data.reading, data.writing, data?.["listening A"], data?.["listening B"], data.speaking, data.pronunciation]
            : [],
          options: {
            ...initialData.options,
            labels: labels[selectedGame],
            colors: labels[selectedGame].map(label => selectedColors[label] || "#CCCCCC"), // Assign colors
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
            labels: labels[selectedGame],
            colors: labels[selectedGame].map(label => selectedColors[label] || "#CCCCCC"), // Assign colors
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
            labels: labels[selectedGame],
            colors: labels[selectedGame].map(label => selectedColors[label] || "#CCCCCC"), // Assign colors
          },
        });
        break;
      default:
        setChartData(initialData);
        break;
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

  const handleSelectGame = (e) => {
    setSelectedGame(e.target.value);
    setSelectedClass("");
  };

  useEffect(() => {

    const getRandomElement = (array) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };
    // State to hold chart data
  }, [selectedGame, selectedStudent, selectedClass])

  useEffect(() => {
    setLoading(true);

    const fetchClass = async () => {
      const classData = await VillageApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const WordDashData = await WordApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const TagData = await TagApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      if (selectedGame == "Village" && userInfo.type === "Student") {
        const StudentData = await AnalyticsAPI.getSkillScoresByOneStudent({ student_id: userInfo.uid })
        const StudentChartData = await AnalyticsAPI.getScoresByOneStudent({ game: selectedGame, student_id: userInfo.uid })
        await setVillageData(StudentData.data)
        await changeChartData(StudentChartData.data)
      }
      // Merging data from all three sources
      const allClasses = [
        ...classData.data.ret, // village classes
        ...WordDashData.data.ret, // WordDash classes
        ...TagData.data.ret, // Tag classes
      ];

      // Remove duplicates by class ID
      const uniqueClasses = Array.from(
        new Map(allClasses.map((item) => [item.id, item])).values()
      );

      // Optional: you can now merge data for each class (wordDashInfo, tagInfo, etc.)
      const mergedClassData = uniqueClasses.map((classItem) => {
        // Find WordDashData for this class
        const wordDashInfo = WordDashData.data.ret.find(
          (wordDashItem) => wordDashItem.id === classItem.id
        );

        // Find TagData for this class
        const tagInfo = TagData.data.ret.find(
          (tagItem) => tagItem.id === classItem.id
        );

        return {
          ...classItem,
          wordDashInfo: wordDashInfo || null,
          tagInfo: tagInfo || null,
        };
      });

      setClassData(uniqueClasses); // Set class IDs
      setTeacherData(mergedClassData); // Set all merged class data

      setLoading(false);
    };

    fetchClass().catch(() => {
      setLoading(false);
    });
  }, [selectedGame]);

  return (
    <div>
      <div className="h5">STUDENT SCORE CHART</div>
      <div className="">
        <div className="flex gap-4">
          <div className="input-group mt-4">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Game
            </label>
            <select
              className="form-select"
              id="inputGroupSelect01"
              value={selectedGame}
              onChange={handleSelectGame}
            >
              <option defaultValue={""}>Select All</option>
              <option value="Village">Village</option>
              <option value="Tag">Tag</option>
              <option value="WordDash">Word Dash</option>
            </select>
          </div>
          {userInfo.type != "Student" &&
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
                    <option defaultValue={""}>Select All</option>
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
                    <option defaultValue={""}>Select All</option>
                    {studentData?.map((item, index) => (
                      <option value={item?.student_id} key={index}>
                        {item?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          }
        </div>
        <div className="mt-4">
          {userInfo.type != "Student" ? selectedGame && selectedClass && selectedStudent : selectedGame == "Village" ? (
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
                            PERFORMANCE
                          </div>
                          <div
                            className="text-center"
                            style={{ width: "150px" }}
                          >
                            COMPLETED QUESTIONS
                          </div>
                          <div
                            className="text-center"
                            style={{ width: "150px" }}
                          >
                            TIME SPENT
                          </div>
                          <div
                            className="text-center"
                            style={{ width: "150px" }}
                          >
                            LAST PRACTICED
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
                                        {Math.round(childItem.totalcorrect / childItem.totalQuestions * 100) || ""} {childItem.totalcorrect / childItem.totalQuestions * 100 > 0 && "%"}
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
              <CardBody>{userInfo.type != "Student" ? "Select Game, Class and Student" : "No Data" }</CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scores;
