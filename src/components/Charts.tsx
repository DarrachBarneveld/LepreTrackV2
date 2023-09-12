import { FunctionComponent, useState } from "react";
import ReactApexChart from "react-apexcharts";

import "./charts.css";

export function graphColor(num: number) {
  if (num < 25) {
    return ["#FF0000"];
  } else if (num < 50) {
    return ["#ff8c00"];
  } else if (num < 75) {
    return ["#2566bc"];
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

export const TotalScoreBar: FunctionComponent<{
  score: number;
  user: string;
}> = ({ score, user }) => {
  const [series, setSeries] = useState([
    {
      name: "Actual",
      data: [
        {
          x: user,
          y: score,
          goals: [
            {
              name: "Earth's Guardian",
              value: 200,
              strokeHeight: 2,
              strokeColor: "#FFD700",
            },
            {
              name: "Green Fingers",
              value: 150,
              strokeHeight: 2,
              strokeColor: "#4b7bff",
            },
            {
              name: "Balance Footprint",
              value: 100,
              strokeHeight: 2,
              strokeColor: "#775DD0",
            },
            {
              name: "Terra's Tormentor",
              value: 50,
              strokeHeight: 2,
              strokeColor: "#FF0000",
            },
          ],
        },
      ],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 10,
      },
    },
    colors: ["#16b85f"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: [
        user,
        "Tormentor",
        "Footprint",
        "Fingers",
        "Guardian",
      ],
      markers: {
        fillColors: ["#16b85f", "#FF0000", "#775DD0", "#4b7bff", "#FFD700"],
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
      type="bar"
    />
  );
};
