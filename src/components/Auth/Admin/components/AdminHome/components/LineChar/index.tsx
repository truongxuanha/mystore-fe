import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { getRevenueApi } from "redux/home/api";
Chart.register(...registerables);
type DataType = {
  date: string;
  total: number;
};

function LineChar() {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [dateLine, setDateLine] = useState<DataType[]>([]);

  useEffect(function () {
    async function fetchRevenue() {
      const res = await getRevenueApi();
      const data = res.data;
      setDatas(data.map((item: DataType) => item.total));
      setDateLine(data.map((item: DataType) => item.date));
    }
    fetchRevenue();
  }, []);

  return (
    <Line
      data={{
        labels: dateLine,
        datasets: [
          {
            label: "Doanh thu",
            data: datas,
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
}

export default LineChar;
