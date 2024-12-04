import React, { useEffect, useState } from "react";
import { Card, CardBody } from "../../../components/card/card";
import Chart1 from "./chart1";
import Chart2 from "./chart2";
import YTD_Growth from "../trouble/ytd-growth";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";
import Progress_Report from "../trouble/progree-report";
import { useSelector } from "react-redux";
import TroubleZone from "../trouble/trouble-zone";
import TagApi from "../../../api-clients/TagApi";
import WordApi from "../../../api-clients/WordApi";
import BarsScale from "../../../components/loading/BarsScale";
import TopStudentPerformance from "../trouble/topstudentperformance";
import TopScoringStudents from "../trouble/topscoringstudents";
import NegativeProgress from "../trouble/negative-progress";

const Progress = () => {
  const [loading, setLoading] = useState(false);
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
    console.log(classId);

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

  const handleSelectStudent = async (e) => {
    const selectedId = e.target.value;
    if (e.target.value == "Select All") {
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

    const fetchAllApis = async () => {
      const classData = await VillageApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const WordDashData = await WordApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const TagData = await TagApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });

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

      // Setting the state
      setClassesData(uniqueClasses.map((item) => ({ id: item.id, name: item.name }))); // Set class names with IDs

      // All API calls completed successfully
      setLoading(false);
    };

    fetchAllApis().catch(() => {
      // Handle errors gracefully if necessary
      setLoading(false);
    });
  }, []);

  const categoryData = [
    'reading', 'pronunciation', 'writing', 'listeningA', 'listeningB', 'speaking'
  ]

  const handleSelectCategory = (e) => {
    if (e.target.value == "Select All") {
      setSelectedCategory('')
    } else {
      setSelectedCategory(e.target.value);
    }
  }

  return (
    <div>
      <div className="h5">PROGRESS & GROWTH</div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <BarsScale />
        </div>
      ) : (
        <>
          <div className="mt-2 row mb-2">

            {userInfo.type != "Student" &&
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
                    {classesData.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            }
            {userInfo.type != "Student" &&
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
            }
            <div className="col">
              <div className="input-group">
                <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect03"
                >
                  Category
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect03"
                  value={selectedCategory}
                  onChange={handleSelectCategory}
                >
                  <option defaultValue={""}>Select All</option>
                  {categoryData.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <YTD_Growth studentPage={userInfo.type == "Student" && userInfo.uid} selectedClass={selectedClass} selectedCategory={selectedCategory} selectedStudent={selectedStudentName} teacher_id={userInfo.uid} />
          {userInfo.type != "Student" &&
            <NegativeProgress teacher_id={userInfo.uid} />
          }
          <Progress_Report studentPage={userInfo.type == "Student" && userInfo.uid} selectedClass={selectedClass} selectedCategory={selectedCategory} selectedStudent={selectedStudentName} teacher_id={userInfo.uid} />
          <TopStudentPerformance studentPage={userInfo.type == "Student" && userInfo.uid} selectedClass={selectedClass} selectedCategory={selectedCategory} selectedStudent={selectedStudentName} teacher_id={userInfo.uid} />
          {userInfo.type != "Student" &&
            <TopScoringStudents selectedClass={selectedClass} selectedCategory={selectedCategory} selectedStudent={selectedStudentName} teacher_id={userInfo.uid} />
          }
          {userInfo.type != "Student" &&
            <TroubleZone />
          }
        </>
      )}
      {/* <div className="row gap-2 mt-4">
        <Card className="col">
          <CardBody>
            <Chart1 title="Class 1" />
          </CardBody>
        </Card>
        <Card className="col">
          <CardBody>
            <Chart1 title="Class 2" />
          </CardBody>
        </Card>
      </div>
      <div className="row gap-2 mt-4">
        <Card className="col">
          <CardBody>
            <Chart2 type="time" />
          </CardBody>
        </Card>
        <Card className="col">
          <CardBody>
            <Chart2 type="score" />
          </CardBody>
        </Card>
      </div> */}
    </div>
  );
};

export default Progress;
