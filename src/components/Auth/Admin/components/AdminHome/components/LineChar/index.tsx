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
import { useEffect, useState } from "react";
import { getRevenue } from "../../../../../../../api/revenue";

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

interface DataType {
  date: string;
  total: number;
}

function LineChar() {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [dateLine, setDateLine] = useState<DataType[]>([]);

  useEffect(function () {
    async function fetchRevenue() {
      const res = await getRevenue();
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
            backgroundColor: "rgba(255, 165, 0, 0.5)",
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
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
        },
        scales: {
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
