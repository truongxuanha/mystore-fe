import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components required for the Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChar() {
  return (
    <Line
      data={{
        labels: ["11/07", "12/07", "13/07", "14/07", "15/07", "16/07", "17/07"],
        datasets: [
          {
            label: "Doanh thu",
            data: [10, 20, 30, 42, 51, 82, 31],
            backgroundColor: "#ff6801",
            borderColor: "green",
            tension: 0.4,
            fill: true,
            pointStyle: "rect",
            pointBorderColor: "blue",
            pointBackgroundColor: "#fff",
            showLine: true,
          },
        ],
      }}
      options={{
        plugins: {
          title: {
            display: false,
          },
        },
      }}
    />
  );
}

export default LineChar;
