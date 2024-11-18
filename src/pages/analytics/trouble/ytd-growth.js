import React from 'react';
import Chart from 'react-apexcharts';

const YTD_Growth = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 430
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '12px',
        colors: ['#fff']
      }
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['#fff']
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
    }
  };

  const series = [
    {
      data: [44, 55, 41, 64, 22, 43, 21]
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32]
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32]
    },
    {
      data: [53, 32, 33, 52, 13, 44, 32]
    }
  ];

  return (
    <div>
      <Chart 
        options={options} 
        series={series} 
        type="bar" 
        height={430} 
      />
    </div>
  );
};

export default YTD_Growth;
