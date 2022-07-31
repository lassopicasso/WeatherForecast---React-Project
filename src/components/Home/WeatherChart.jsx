import React from "react";
//https://react-chartjs-2.js.org/examples/multitype-chart/
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, LinearScale, LineController, BarController, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip } from "chart.js";
import { Chart } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(LinearScale, CategoryScale, BarElement, LineController, BarController, PointElement, LineElement, Legend, Tooltip, ChartDataLabels);

function dataStuff(labels, temp, rain) {
  rain = rain.map((hour) => {
    return hour === 0 ? "" : hour.toFixed(2);
  });
  return {
    labels,
    datasets: [
      {
        type: "line",
        label: "Temp. (°C)",
        yAxisID: "A",
        color: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: temp,
      },
      {
        type: "bar",
        label: "Rain (mm)",
        yAxisID: "B",

        backgroundColor: "rgb(86, 217, 243)",
        color: "blue",
        data: rain,
      },
    ],
  };
}

function dataOptions(temp, rain) {
  const rainBuffer = Math.max(...rain) + 5;
  const tempBuffer = Math.max(...temp) + 5;
  return {
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

      datalabels: {
        anchor: "end",
        align: "end",
        color: "blue",
        labels: {
          title: {
            font: {
              weight: "bold",
            },
          },
          value: {
            color: "green",
          },
        },
      },
    },
    scales: {
      A: {
        title: {
          text: "Temp. °C",
          color: "darkred",

          display: true,
          font: {
            weight: "bold",
            size: 16,
          },
        },
        position: "left",
        suggestedMax: tempBuffer,
        ticks: {
          beginAtZero: true,
          stepSize: 5,
        },
      },
      B: {
        position: "right",
        display: false,
        suggestedMax: rainBuffer,
        ticks: {
          beginAtZero: true,
        },
      },
      x: {
        title: {
          text: "24 Hours",
          display: true,
          color: "darkblue",
          font: {
            weight: "bold",
            size: 16,
          },
        },
      },
    },
  };
}

function weatherChart({ weatherToday }) {
  let hours = [];
  let temp = [];
  let rain = [];
  for (let i = 1; i <= 24; i++) {
    hours.push(moment.unix(weatherToday[i].dt).format("HHmm"));
    temp.push(parseInt(weatherToday[i].temp - 273.15));
    rain.push(weatherToday[i].rain ? weatherToday[i].rain["1h"] : 0);
  }
  hours = hours.map((hour, index) => {
    return index % 2 === 1 ? hour : "";
  });

  const data = dataStuff(hours, temp, rain);
  const options = dataOptions(temp, rain);
  return (
    <div className="chart-wrapper">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}

export default weatherChart;
