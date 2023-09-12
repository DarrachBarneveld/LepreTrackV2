import { FunctionComponent, useState } from "react";
import ReactApexChart from "react-apexcharts";

import "./charts.css";

export function graphColor(num: number) {
  if (num < 25) {
    return ["#FF0000"];
  } else if (num < 35) {
    return ["#ff8c00"];
  } else if (num < 70) {
    return ["#FFBF00"];
  }
  return ["#008000"];
}

export const CategoryChart: FunctionComponent<{ score: number }> = ({
  score,
}) => {
  const [series, setSeries] = useState([score]);

  const [options, setOptions] = useState({
    colors: graphColor(series[0]),
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
