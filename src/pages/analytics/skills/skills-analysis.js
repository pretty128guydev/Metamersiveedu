import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

import { Card, CardHeader, CardBody } from "../../../components/card/card";
import BarsScale from "../../../components/loading/BarsScale";
import StudentsSkills from "../students/students-skills";

import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";
import VillageApi from "../../../api-clients/VillageApi";

const ChartApex = ({ data }) => {
  const themeFont = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-family")
    .trim();

  const pieChartOptions = {
    dataLabels: {
      dropShadow: { enabled: false, top: 1, left: 1, blur: 1, opacity: 1 },
    },
    stroke: { show: false },
    labels: ["Word Dash", "The Village", "Tag"],
    title: {
      text: "CLASS STATUS",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    legend: {
      fontFamily: themeFont,
      labels: { colors: "#ffffff" },
      style: { fontSize: "20px" },
    },
  };

  let pieChartData = [];
  if (data) {
    pieChartData = [+data.worddash, +data.village, +data.tag];
  }

  return (
    <div className="py-2">
      <Chart
        type="pie"
        options={pieChartOptions}
        series={pieChartData}
        width={320}
      />
    </div>
  );
};

const SkillsAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [totalTimeByGame, setTotalTimeByGame] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [classData, setClassData] = useState([]);

  const userInfo = useSelector((store) => store.auth.userInfo);

  useEffect(() => {
    setLoading(true);

    const fetchAllApis = async () => {
      const classData = await VillageApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const classes = classData.data.map((item) => item.id);
      setClassData(classes);

      const timeData = await AnalyticsAPI.getTotalSpentTimeByGame({
        classId: classes[0],
      });
      setTotalTimeByGame(timeData.data);

      const resData = await AnalyticsAPI.getSkillProgressByClass({
        class_id: classes[0],
      });
      setProgressData(resData.data);

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
      <div className="h5">SKILLS ANALYSIS</div>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center h-100">
          <BarsScale />
        </div>
      ) : (
        <>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <div className="">Skill Overview</div>
              </CardHeader>
              <CardBody>
                <div className="row">
                  <div className="col-4">
                    <ChartApex data={totalTimeByGame} />
                  </div>
                  <div className="col-8">
                    <div className="row" style={{ height: "100%" }}>
                      <div className="col">
                        <div
                          className="d-flex align-items-center justify-content-center flex-column gap-4"
                          style={{ height: "100%" }}
                        >
                          <div className="fs-5 font-bold">Completed Tasks</div>
                          <i className="fas fa-2xl fa-fw fa-pencil text-green-400"></i>
                          <div className="fs-2 font-bold text-green-400">
                            {progressData ? progressData.totalQuestions : 0}
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div
                          className="d-flex align-items-center justify-content-center flex-column gap-4"
                          style={{ height: "100%" }}
                        >
                          <div className="fs-5 font-bold">Time Spent</div>
                          <i className="far fa-2xl fa-fw fa-clock text-blue-600"></i>
                          <div className="fs-2 font-bold text-blue-600">
                            {progressData ? progressData.totalSpentTime : 0}{" "}
                            <span className="fs-4">min</span>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div
                          className="d-flex align-items-center justify-content-center flex-column gap-4"
                          style={{ height: "100%" }}
                        >
                          <div className="fs-5 font-bold">
                            Students Who Practiced
                          </div>
                          <i className="far fa-2xl fa-fw fa-user text-orange-400"></i>
                          <div className="fs-2 font-bold text-orange-400">
                            {progressData ? progressData.numStudents : 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="mt-4">
            <Card>
              <CardHeader>
                <div className="">Class Breakdown</div>
              </CardHeader>
              <CardBody>
                <StudentsSkills data={progressData} />
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillsAnalysis;
