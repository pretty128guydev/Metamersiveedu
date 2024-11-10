import React from "react";
import Chart from "react-apexcharts";

const chart2 = ({ type }) => {
  var themeFont = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-family")
    .trim();
  var themeFontWeight = getComputedStyle(document.body)
    .getPropertyValue("--bs-body-font-weight")
    .trim();
  var gray600 = getComputedStyle(document.body)
    .getPropertyValue("--bs-gray-600")
    .trim();
  var pink = getComputedStyle(document.body)
    .getPropertyValue("--bs-pink")
    .trim();

  const titles = {
    time: "Time Spent (mins)",
    score: "Scores",
  };
  const chartDataByTime = [
    // { name: "KIN-01", data: [44, 55, 57, 11] },
    // { name: "MCE-02", data: [76, 85, 101, 233] },
    // { name: "MME-01", data: [88, 87, 90, 123] },
  ];
  const chartDataByScores = [
    // { name: "KIN-01", data: [10, 21, 38, 30] },
    // { name: "MCE-02", data: [16, 25, 57, 41] },
    // { name: "MME-01", data: [31, 48, 81, 88] },
  ];
  const chartData = {
    time: chartDataByTime,
    score: chartDataByScores,
  };
  const chartOptions = {
    // title: {
    //   text: titles[type],
    //   align: "center",
    //   style: {
    //     fontSize: "14px",
    //     fontWeight: "bold",
    //     fontFamily: themeFont,
    //     color: "#ffffff",
    //   },
    // },
    dataLabels: { enabled: false },
    stroke: { curve: "straight", width: 1 },
    // colors: [pink, gray600],
    xaxis: {
      type: "category",
      categories: ["Reading", "Listening", "Speaking", "Writing"],
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
      title: {
        text: titles[type],
        style: {
          color: "#FFF",
        },
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
    fill: { opacity: 1 },
    legend: {
      fontFamily: themeFont,
      labels: { colors: "#ffffff" },
      position: "top",
      horizontalAlign: "center",
    },
    // tooltip: { x: { format: 'dd/MM/yy HH:mm' } }
  };
  return (
    <>
      {/* <h6>TIME CHART</h6> */}
      <Chart type="area" options={chartOptions} series={chartData[type]} />
      <h5 className="text-center">2024</h5>
    </>
  );
};

export default chart2;
