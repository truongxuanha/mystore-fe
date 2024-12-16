import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChar = ({ data, dateLine }: { dateLine: string[]; data: number[] }) => {
  return (
    <Line
      data={{
        labels: dateLine,
        datasets: [
          {
            label: "Doanh thu",
            data: data,
            borderColor: "green",
            tension: 0.2,
            fill: true,
            pointStyle: "rect",
            pointBorderColor: ["#ff6384"],
            pointBackgroundColor: "#fff",
            backgroundColor: "rgba(255, 165, 0, 0.5)",
            showLine: true,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
              autoSkip: true,
            },
          },
        },
      }}
      style={{ maxWidth: "100%" }}
    />
  );
};

export default LineChar;
