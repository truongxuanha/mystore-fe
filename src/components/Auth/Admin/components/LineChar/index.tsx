import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dayjs from "dayjs";
import { ContainerLinechart } from "./styled";
Chart.register(...registerables);

const LineChar = ({ data, dateLine }: { dateLine: string[]; data: number[] }) => {
  const title = `Doanh thu tháng ${dayjs().format("MM-YYYY")}`;
  return (
    <ContainerLinechart>
      <Line
        data={{
          labels: dateLine,
          datasets: [
            {
              label: title,
              data: data,
              borderColor: "green",
              tension: 0.2,
              fill: true,
              pointStyle: "rect",
              pointBorderColor: ["#ff6384"],
              pointBackgroundColor: "#fff",
              backgroundColor: "rgba(255, 165, 0, 0.5)",
              showLine: true,
              borderWidth: 1,
              pointBorderWidth: 0.5,
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
    </ContainerLinechart>
  );
};

export default LineChar;
