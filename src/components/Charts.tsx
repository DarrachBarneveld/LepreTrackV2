import { FunctionComponent, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

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

  useEffect(() => {
    setSeries([score]);
  }, [score]);

  const [options] = useState({
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
            formatter: function (val: number) {
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
  const [series] = useState([
    {
      name: "Actual",
      data: [
        {
          x: user,
          y: score,
          goals: [
            {
              name: "Earth's Guardian",
              value: 300,
              strokeHeight: 2,
              strokeColor: "#FFD700",
            },
            {
              name: "Green Fingers",
              value: 200,
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
              value: 0,
              strokeHeight: 2,
              strokeColor: "#FF0000",
            },
          ],
        },
      ],
    },
  ]);

  const [options] = useState({
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 5,
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

export const FormChart: FunctionComponent<{
  score: number;
  color: string[];
}> = ({ score, color }) => {
  const [series, setSeries] = useState([score]);

  useEffect(() => {
    setSeries([score]);
  }, [score]);

  const [options] = useState({
    colors: [color[0]],
    chart: {
      sparkline: {
        enabled: false,
      },
    },

    plotOptions: {
      radialBar: {
        startAngle: -179,
        endAngle: 181,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          show: true,
          name: {
            // offsetY: -10,
            show: false,
            // color: "#888",
            // fontSize: "17px",
          },
          value: {
            formatter: function (val: number): string {
              return val + "%";
            },
            color: "#111",
            fontSize: "36px",
            show: false,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [color[1]],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    // stroke: {
    //   lineCap: "round",
    // },
  });

  return (
    <ReactApexChart
      options={options}
      series={series}
      height={200}
      type="radialBar"
      className="dashboard-chart"
    />
  );
};
