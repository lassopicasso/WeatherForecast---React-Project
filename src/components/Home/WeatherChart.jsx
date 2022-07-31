import React from "react";
//https://react-chartjs-2.js.org/examples/multitype-chart/
import { Chart as ChartJS, LinearScale, LineController, BarController, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip } from "chart.js";
import { Chart } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(LinearScale, CategoryScale, BarElement, LineController, BarController, PointElement, LineElement, Legend, Tooltip);

function dataStuff(labels, temp, windSpeed, rain) {
  console.log(rain);
  rain = rain.map((hour) => {
    return hour * 3;
  });
  return {
    labels,
    datasets: [
      {
        type: "line",
        label: "Temp. (°C)",

        color: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: temp,
        // data: labels.map(() => [2, 20]),
      },
      // {
      //   type: "line",
      //   label: "Wind (m/s)",
      //   backgroundColor: "rgb(248, 250, 250)",
      //   color: "black",
      //   data: windSpeed,
      //   // data: labels.map(() => [0, 30]),
      //   borderColor: "white",
      //   borderWidth: 2,
      // },
      {
        type: "bar",
        label: "Rain (mm/h)",
        AxisID: "Rain",
        backgroundColor: "rgb(86, 217, 243)",
        color: "blue",
        data: rain,
        yAxisId: "right",
        // data: labels.map(() => [0, 30]),
        // borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };
}

export const options = {
  plugins: {
    legend: {
      labels: {
        color: "black",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
  },
};
export const scales = {
  scales: {
    y: {
      ticks: {
        color: "white",
        font: {
          size: 10,
        },
        stepSize: 1,

        beginAtZero: true,
      },
    },
    // x: [
    //   {
    //     id: "xAxis1",
    //     ticks: {
    //       callback: function (label) {
    //         let hour = label.split(";")[0];
    //         let rain = label.split(";")[1];
    //         return hour;
    //       },
    //       color: "blue",
    //       font: {
    //         size: 14,
    //       },
    //       stepSize: 1,
    //       beginAtZero: true,
    //     },
    //   },
    //   {
    //     id: "xAxis2",
    //     gridLines: {
    //       drawOnChartArea: false,
    //     },
    //     ticks: {
    //       callback: function (label) {
    //         let hour = label.split(";")[0];
    //         let rain = label.split(";")[1];
    //         return rain;
    //       },
    //     },
    //   },
    // ],
    x: {
      ticks: {
        color: "blue",
        font: {
          size: 14,
        },
        stepSize: 1,
        beginAtZero: true,
      },
    },
  },
};

function weatherChart({ weatherToday }) {
  let hours = [];
  let temp = [];
  let windSpeed = [];
  let rain = [];
  for (let i = 1; i <= 24; i++) {
    // let hour = moment.unix(weatherToday[i].dt).format("HHmm");
    // let raining = weatherToday[i].rain ? weatherToday[i].rain["1h"] : 0;
    // hours.push(hour + ";" + raining + "mm/h");
    hours.push(moment.unix(weatherToday[i].dt).format("HHmm"));
    temp.push(parseInt(weatherToday[i].temp - 273.15));
    windSpeed.push(weatherToday[i].wind_speed);
    rain.push(weatherToday[i].rain ? weatherToday[i].rain["1h"] : 0);
  }

  const data = dataStuff(hours, temp, windSpeed, rain);

  return (
    <div className="chart-wrapper">
      <Chart type="bar" data={data} options={options} scales={scales} />
    </div>
  );
}

export default weatherChart;
