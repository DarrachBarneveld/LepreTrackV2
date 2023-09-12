import { useState } from "react";
import ReactApexChart from "react-apexcharts";

import "./charts.css";

export const CategoryChart = () => {
  const [series, setSeries] = useState([10]);

  const [options, setOptions] = useState({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          show: true,
          background: "#fff",
          strokeWidth: "100%",
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 1,
            opacity: 0.5,
          },
        },
        startAngle: -140,
        endAngle: 140,
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 10,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    stroke: {
      dashArray: 1,
    },
  });

  return (
    <ReactApexChart
      options={options}
      series={series}
      height={"100%"}
      type="radialBar"
      className="dashboard-chart"
    />
  );
};
