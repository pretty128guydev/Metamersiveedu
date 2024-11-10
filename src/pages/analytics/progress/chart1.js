import React from "react";
import Chart from "react-apexcharts";

const chart1 = ({ title }) => {
  var columnChartData = [
    { name: "Home", data: [0, 0, 0] },
    { name: "School", data: [0, 0, 0] },
  ];
  function getColumnChartOptions() {
    var themeFont = getComputedStyle(document.body)
      .getPropertyValue("--bs-body-font-family")
      .trim();
    var themeFontWeight = getComputedStyle(document.body)
      .getPropertyValue("--bs-body-font-weight")
      .trim();

    return {
      title: {
        text: title,
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: themeFont,
          color: "#ffffff",
        },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      // colors: [gray600, indigo, gray300],
      xaxis: {
        categories: ["Tag", "Word Dash", "The Village"],
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
          text: "Time Spent (mins)",
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
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " mins";
          },
        },
      },
    };
  }

  var columnChartOptions = getColumnChartOptions();

  return (
    <>
      {/* <h6>TIME CHART</h6> */}
      <Chart type="bar" options={columnChartOptions} series={columnChartData} />
      <h5 className="text-center">2024</h5>
    </>
  );
};

export default chart1;
