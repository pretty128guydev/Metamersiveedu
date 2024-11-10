import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

import { Card, CardBody } from "../../../components/card/card";
import { AnalyticsAPI } from "../../../api-clients/AnalyticsAPI";

function ChartOverall(data) {
  var themeFont = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-family")
    .trim();
  var themeFontWeight = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-weight")
    .trim();

  // bar chart
  var barChartOptions = {
    plotOptions: {
      bar: { horizontal: false, dataLabels: { position: "top" } },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#ffffff"] },
    },
    stroke: { show: false },
    xaxis: {
      categories: [
        "Listening A",
        "Listening B",
        "Writing",
        "Reading",
        "Speaking",
      ],
      axisBorder: {
        show: true,
        color: "rgba(255, 255, 255, .25)",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "rgba(255, 255, 255, .25)",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "12px",
          fontFamily: themeFont,
          fontWeight: themeFontWeight,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "12px",
          fontFamily: themeFont,
          fontWeight: themeFontWeight,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    legend: { fontFamily: themeFont, labels: { colors: "#ffffff" } },
  };

  var barChartData = [data];

  return (
    <div>
      <Chart type="bar" options={barChartOptions} series={barChartData} />
    </div>
  );
}

function ChartWeakestToStrongest({ data }) {
  var themeFont = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-family")
    .trim();
  var themeFontWeight = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-weight")
    .trim();

  // bar chart
  var barChartOptions = {
    plotOptions: {
      bar: { horizontal: false, dataLabels: { position: "top" } },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#ffffff"] },
    },
    stroke: { show: false },
    xaxis: {
      categories: [
        "Listening A",
        "Listening B",
        "Writing",
        "Reading",
        "Speaking",
      ],
      axisBorder: {
        show: true,
        color: "rgba(255, 255, 255, .25)",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "rgba(255, 255, 255, .25)",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "12px",
          fontFamily: themeFont,
          fontWeight: themeFontWeight,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "12px",
          fontFamily: themeFont,
          fontWeight: themeFontWeight,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    legend: { fontFamily: themeFont, labels: { colors: "#ffffff" } },
  };

  var barChartData = [
    { name: "Level 1", data: data[0] },
    { name: "Level 2", data: data[1] },
    { name: "Level 3", data: data[2] },
    { name: "Level 4", data: data[3] },
  ];

  return (
    <div>
      <Chart type="bar" options={barChartOptions} series={barChartData} />
    </div>
  );
}

function ChartByPaper(data) {
  var themeFont = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-family")
    .trim();
  var themeFontWeight = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-weight")
    .trim();

  // bar chart
  var barChartOptions = {
    plotOptions: {
      bar: { horizontal: false, dataLabels: { position: "top" } },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#ffffff"] },
    },
    stroke: { show: false },
    xaxis: {
      categories: ["Level 1", "Level 2", "Level 3", "Level 4"],
      axisBorder: {
        show: true,
        color: "rgba(255, 255, 255, .25)",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: -1,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "rgba(255, 255, 255, .25)",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "12px",
          fontFamily: themeFont,
          fontWeight: themeFontWeight,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "12px",
          fontFamily: themeFont,
          fontWeight: themeFontWeight,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    legend: { fontFamily: themeFont, labels: { colors: "#ffffff" } },
  };

  var barChartData = [data];

  return (
    <div>
      <Chart type="bar" options={barChartOptions} series={barChartData} />
    </div>
  );
}

const LevelsByPaper = () => {
  const { schoolId } = useSelector((state) => state.auth.userInfo);
  const [loading, setLoading] = useState(true);
  const [numByPaper, setNumByPaper] = useState([0, 0, 0, 0, 0]);
  const [numOfListeningA, setNumOfListeningA] = useState([0, 0, 0, 0]);
  const [numOfListeningB, setNumOfListeningB] = useState([0, 0, 0, 0]);
  const [numOfWriting, setNumOfWriting] = useState([0, 0, 0, 0]);
  const [numOfReading, setNumOfReading] = useState([0, 0, 0, 0]);
  const [numOfSpeaking, setNumOfSpeaking] = useState([0, 0, 0, 0]);
  const [dataByLevels, setDataByLevels] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await AnalyticsAPI.getWrongQuestionsByCategory(schoolId);
      if (res.status === 200) {
        const newData = [0, 0, 0, 0, 0];
        if (res.data["listening-A"]) newData[0] = res.data["listening-A"];
        if (res.data["listening-B"]) newData[1] = res.data["listening-B"];
        if (res.data["writing"]) newData[2] = res.data["writing"];
        if (res.data["reading"]) newData[3] = res.data["reading"];
        if (res.data["speaking"]) newData[4] = res.data["speaking"];
        setNumByPaper(newData);
        setLoading(false);
      }
      const res2 = await AnalyticsAPI.getWrongQuestionsByLevel(schoolId);
      if (res2.status === 200) {
        let newDataLA = [0, 0, 0, 0];
        let newDataLB = [0, 0, 0, 0];
        let newDataW = [0, 0, 0, 0];
        let newDataR = [0, 0, 0, 0];
        let newDataS = [0, 0, 0, 0];
        if (res2.data["listening-A"]) {
          if (res2.data["listening-A"][1])
            newDataLA[0] = res2.data["listening-A"][1];
          if (res2.data["listening-A"][2])
            newDataLA[1] = res2.data["listening-A"][2];
          if (res2.data["listening-A"][3])
            newDataLA[2] = res2.data["listening-A"][3];
          if (res2.data["listening-A"][4])
            newDataLA[3] = res2.data["listening-A"][4];
          setNumOfListeningA(newDataLA);
        }
        if (res2.data["listening-B"]) {
          if (res2.data["listening-B"][1])
            newDataLB[0] = res2.data["listening-B"][1];
          if (res2.data["listening-B"][2])
            newDataLB[1] = res2.data["listening-B"][2];
          if (res2.data["listening-B"][3])
            newDataLB[2] = res2.data["listening-B"][3];
          if (res2.data["listening-B"][4])
            newDataLB[3] = res2.data["listening-B"][4];
          setNumOfListeningB(newDataLB);
        }
        if (res2.data["writing"]) {
          if (res2.data["writing"][1]) newDataW[0] = res2.data["writing"][1];
          if (res2.data["writing"][2]) newDataW[1] = res2.data["writing"][2];
          if (res2.data["writing"][3]) newDataW[2] = res2.data["writing"][3];
          if (res2.data["writing"][4]) newDataW[3] = res2.data["writing"][4];
          setNumOfWriting(newDataW);
        }
        if (res2.data["reading"]) {
          if (res2.data["reading"][1]) newDataR[0] = res2.data["reading"][1];
          if (res2.data["reading"][2]) newDataR[1] = res2.data["reading"][2];
          if (res2.data["reading"][3]) newDataR[2] = res2.data["reading"][3];
          if (res2.data["reading"][4]) newDataR[3] = res2.data["reading"][4];
          setNumOfReading(newDataR);
        }
        if (res2.data["speaking"]) {
          if (res2.data["speaking"][1]) newDataS[0] = res2.data["speaking"][1];
          if (res2.data["speaking"][2]) newDataS[1] = res2.data["speaking"][2];
          if (res2.data["speaking"][3]) newDataS[2] = res2.data["speaking"][3];
          if (res2.data["speaking"][4]) newDataS[3] = res2.data["speaking"][4];
          setNumOfSpeaking(newDataS);
        }
        setDataByLevels([
          [newDataLA[0], newDataLB[0], newDataW[0], newDataR[0], newDataS[0]],
          [newDataLA[1], newDataLB[1], newDataW[1], newDataR[1], newDataS[1]],
          [newDataLA[2], newDataLB[2], newDataW[2], newDataR[2], newDataS[2]],
          [newDataLA[3], newDataLB[3], newDataW[3], newDataR[3], newDataS[3]],
        ]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="col-md-6 mb-4">
        <Card>
          <CardBody>
            <div className="fw-bold fs-16px mb-2">Number Of Mistakes </div>
            <ChartOverall data={numByPaper} />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 mb-4">
        <Card>
          <CardBody>
            <div className="fw-bold fs-16px mb-2">Mistakes by Paper</div>
            <ChartWeakestToStrongest data={dataByLevels} />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 col-xxl-3 mb-4">
        <Card>
          <CardBody>
            <div className="fw-bold fs-16px mb-2">Listening A</div>
            <ChartByPaper data={numOfListeningA} />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 col-xxl-3 mb-4">
        <Card>
          <CardBody>
            <div className="fw-bold fs-16px mb-2">Listening B</div>
            <ChartByPaper data={numOfListeningB} />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 col-xxl-3 mb-4">
        <Card>
          <CardBody>
            <div className="fw-bold fs-16px mb-2">Writing</div>
            <ChartByPaper data={numOfWriting} />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 col-xxl-3 mb-4">
        <Card>
          <CardBody>
            <div className="fw-bold fs-16px mb-2">Reading</div>
            <ChartByPaper data={numOfReading} />
          </CardBody>
        </Card>
      </div>
      <div className="col-md-6 col-xxl-3 mb-4">
        <Card>
          <CardBody>
            <div className="fw-bold fs-16px mb-2">Speaking</div>
            <ChartByPaper data={numOfSpeaking} />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default LevelsByPaper;
