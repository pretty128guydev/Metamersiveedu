import React, { useEffect, useState } from "react";
import { Card, CardBody } from "../../../components/card/card";
import Chart1 from "./chart1";
import Chart2 from "./chart2";
import YTD_Growth from "../trouble/ytd-growth";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";
import Progress_Report from "../trouble/progree-report";
import { useSelector } from "react-redux";

const Progress = () => {
  const [loading, setLoading] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [selectedStudentName, setSelectedStudentName] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
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

    const fetchAllApis = async () => {
      const classData = await VillageApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const classes = classData.data.ret.map((item) => item.id);

      const classeswithname = classData.data.ret.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setClassData(classes);
      setClassesData(classeswithname)
      setTeacherData(classData.data.ret)
      // All API calls completed successfully
      setLoading(false);
    };

    fetchAllApis().catch(() => {
      // Handle errors gracefully if necessary
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="h5">PROGRESS & GROWTH</div>
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
      <YTD_Growth selectedClass={selectedClass} />
      <Progress_Report selectedClass={selectedClass} />
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
