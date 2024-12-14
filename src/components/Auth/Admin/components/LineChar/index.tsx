import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useAppDispatch";
import { RemenueType } from "redux/admin/type";
import { getRemenueThunk } from "redux/admin/adminThunk";
import { isEmpty } from "utils";
Chart.register(...registerables);

const LineChar = () => {
  const [datas, setDatas] = useState<RemenueType["total"][]>([]);
  const [dateLine, setDateLine] = useState<RemenueType["date"][]>([]);
  const { remenueData } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isEmpty(remenueData)) return;
    setDatas(remenueData.map((item) => item.total));
    setDateLine(remenueData.map((item) => item.date));
  }, [remenueData]);
  useEffect(() => {
    dispatch(getRemenueThunk());
  }, [dispatch]);

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
};

export default LineChar;
