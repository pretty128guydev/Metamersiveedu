import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

import { Card, CardBody, CardHeader } from "../../components/card/card";
import StudentsByAnswers from "./students/students-answers";
import BarsScale from "../../components/loading/BarsScale";

import { AnalyticsAPI } from "../../api-clients/AnalyticsAPI";
import { formatTimeFromMinutes } from "./utils";
import VillageApi from "../../api-clients/VillageApi";
import ReactApexChart from "react-apexcharts";
import SkillProgress from "./students/skill-progress";
import UsageActivity from "./students/usage-activity";
import PerformanceIndex from "./students/performanceindex";

const mockData = {
  student1: {
    student_name: "John Doe",
    total_questions: 50,
    total_spent_time: 30,
    last_play_time: "2024-11-13T12:34:56Z",
    data: [
      {
        game: "Word Dash",
        level: "Advanced",
        questions: {
          total: 10,
          score: 80,
        },
        spent_time: 10,
      },
      {
        game: "Speed Quiz",
        level: "Intermediate",
        questions: {
          total: 15,
          score: 70,
        },
        spent_time: 8,
      },
    ],
  },
  student2: {
    student_name: "Jane Smith",
    total_questions: 45,
    total_spent_time: 25,
    last_play_time: "2024-11-12T10:20:00Z",
    data: [
      {
        game: "Memory Match",
        level: "Beginner",
        questions: {
          total: 8,
          score: 90,
        },
        spent_time: 7,
      },
      {
        game: "Math Challenge",
        level: "Advanced",
        questions: {
          total: 12,
          score: 65,
        },
        spent_time: 10,
      },
    ],
  },
  student3: {
    student_name: "Mark Spencer",
    total_questions: 60,
    total_spent_time: 40,
    last_play_time: null, // No practice yet
    data: [
      {
        game: "Word Dash",
        level: "Intermediate",
        questions: {
          total: 15,
          score: 85,
        },
        spent_time: 15,
      },
      {
        game: "Speed Quiz",
        level: "Advanced",
        questions: {
          total: 20,
          score: 90,
        },
        spent_time: 12,
      },
    ],
  },
};

const mymockChartData = [
  {
    home: 30,
    school: 20,
    time: "2024-11-01T08:00:00Z", // Date for the x-axis
  },
  {
    home: 40,
    school: 25,
    time: "2024-11-02T08:00:00Z",
  },
  {
    home: 50,
    school: 35,
    time: "2024-11-03T08:00:00Z",
  },
  {
    home: 60,
    school: 40,
    time: "2024-11-04T08:00:00Z",
  },
  {
    home: 45,
    school: 50,
    time: "2024-11-05T08:00:00Z",
  },
  {
    home: 55,
    school: 30,
    time: "2024-11-06T08:00:00Z",
  },
  {
    home: 70,
    school: 45,
    time: "2024-11-07T08:00:00Z",
  },
];

const ApexLineChart = () => {
  const state = {
    series: [
      {
        name: "Person 1",
        data: [80, 65, 90, 70, 85, 60]  // Data for Person 1
      },
      {
        name: "Person 2",
        data: [70, 60, 75, 85, 65, 90]  // Data for Person 2
      },
      {
        name: "Person 3",
        data: [60, 55, 80, 60, 75, 80]  // Data for Person 3
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',  // Line chart type
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true
        },
        margin: {
          left: 50,   // Left margin for some space from the y-axis
          right: 0    // No right padding
        }
      },
      dataLabels: {
        enabled: false  // Disable data labels inside the blocks
      },
      stroke: {
        width: 2,  // Line thickness
        curve: 'straight'  // No soft curves
      },
      title: {
        text: 'Language Skills Progress',
        align: 'left'
      },
      markers: {
        size: 5,  // Default marker size
        hover: {
          size: 6  // Slightly bigger on hover
        },
        colors: ['#FF4560', '#00E396', '#FEB019'],  // Marker colors for different series
        strokeColor: '#fff',  // White stroke around the markers
        strokeWidth: 2
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],  // Grid line colors
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Speaking', 'Writing', 'Reading', 'Listening A', 'Listening B', 'Pronunciation'],  // X-axis labels
        axisBorder: {
          show: false  // Hide the axis border
        },
        axisTicks: {
          show: true  // Show axis ticks
        },
        labels: {
          show: true,  // Show x-axis labels
          style: {
            fontSize: '12px'  // Adjust font size of x-axis labels
          }
        },
        padding: {
          left: 50,  // Adds space between the y-axis and the first category (Speaking)
          right: 0   // No padding for the last category (Pronunciation)
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,  // Number of ticks on the y-axis
        title: {
          text: 'Percentage (%)'  // Y-axis title
        }
      }
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </div>
    </div>
  );
};

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


const Students = () => {
  const [loading, setLoading] = useState(false);
  const [totalTimeByGame, setTotalTimeByGame] = useState(null);
  const [totalTimeByLocation, setTotalTimeByLocation] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [classData, setClassData] = useState([]);

  const userInfo = useSelector((store) => store.auth.userInfo);

  useEffect(() => {
    setLoading(true);

    const fetchAllApis = async () => {
      const classData = await VillageApi.getClassroomsByTeacherId({
        teacher_id: userInfo.uid,
      });
      const classes = classData.data.ret.map((item) => item.id);
      setClassData(classes);

      const timeData = await AnalyticsAPI.getTotalSpentTimeByGame({
        classId: classes[0],
      });
      setTotalTimeByGame(timeData.data);
      // const locationData = await AnalyticsAPI.getTotalSpentTimeByLocation({
      //   classId: classes[0],
      // });
      // setTotalTimeByLocation(locationData.data);

      const studentsData = await AnalyticsAPI.getStudentsData({
        classId: classes[0],
      });
      setStudentsData(studentsData.data);
      // All API calls completed successfully
      setLoading(false);
    };

    fetchAllApis().catch(() => {
      // Handle errors gracefully if necessary
      setLoading(false);
    });
  }, []);

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
                  <ChartBar data={mymockChartData} />
                </Card>
              </div>
            </div>
            <div className="mt-4">
              <UsageActivity />
            </div>
            <div className="mt-4">
              <PerformanceIndex />
            </div>
            <div className="mt-4">
              <SkillProgress />
            </div>
            <div className="mt-4">
              <StudentsByAnswers data={mockData} />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Students;
