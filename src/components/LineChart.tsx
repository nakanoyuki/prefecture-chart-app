import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" },
  },
  scales: {
    x: { title: { display: true, text: "年度" } },
    y: { title: { display: true, text: "人口数" } },
  },
};

const lineChartStyle: React.CSSProperties = {
  marginLeft: "auto",
  marginRight: "auto",
  margin: "20px auto 0",
  width: "600px",
};

type Props = {
  population: {
    year: number;
    value: number;
  }[];
};

export const LineChart = ({ population }: Props) => {
  const labels = population.map((item) => item.year);

  const data = {
    labels,
    datasets: [
      {
        label: "北海道",
        data: population.map((data) => data.value),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div style={lineChartStyle}>
      <Line options={options} data={data} width={600} height={300} />
    </div>
  );
};
