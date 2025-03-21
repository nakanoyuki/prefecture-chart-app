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
import { Population } from "../type/type";

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
  population: Population[][];
  selectedPrefNames: string[];
};

export const LineChart = ({ population, selectedPrefNames }: Props) => {
  // const labels = population?.map((item) => item.year) || [];
  const labels = [1960, 1970, 1980, 1990, 2000, 2010, 2020, 2030];

  const datasets = population.map((prefData, index) => ({
    label: selectedPrefNames[index],
    data: prefData.map((item) => item.value),
    borderColor: `hsl(${(index * 40) % 360}, 70%, 50%)`, // 色を動的に変更
    backgroundColor: `hsl(${(index * 40) % 360}, 70%, 70%)`,
  }));

  const data = { labels, datasets };

  return (
    <div style={lineChartStyle}>
      <Line options={options} data={data} width={600} height={300} />
    </div>
  );
};
