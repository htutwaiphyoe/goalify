import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  Colors,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  Colors
);

type ChartProps = {
  labels: string[];
  data: number[];
  title: string;
  label: string;
};

export function PieChart({ labels, data, title, label }: ChartProps) {
  return (
    <Pie
      className="!h-[400px] !w-full"
      data={{
        labels,
        datasets: [{ label, data, borderWidth: 1 }],
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            text: title,
            display: true,
            position: "top",
            color: "#010101",
            font: {
              size: 20,
            },
            padding: {
              bottom: 0,
            },
          },
        },
      }}
    />
  );
}

export function BarChart({ labels, data, title, label }: ChartProps) {
  return (
    <Bar
      className="!h-[400px] !w-full"
      data={{
        labels,
        datasets: [{ label, data, barThickness: 30 }],
      }}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            text: title,
            display: true,
            position: "top",
            color: "#010101",
            font: {
              size: 20,
            },
            padding: {
              bottom: 0,
            },
          },
        },
      }}
    />
  );
}
