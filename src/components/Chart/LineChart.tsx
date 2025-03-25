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
import { Population } from "../../type/type";

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
  marginTop: "20px",
};

type Props = {
  population: Population[][];
  selectedPrefNames: string[];
};

export const LineChart = ({ population, selectedPrefNames }: Props) => {
  const labels =
    population.length > 0
      ? population[0].map((item) => item.year)
      : Array.from({ length: 10 }, (_, i) => 1960 + i * 10);

  const defaultValues = labels.map((_, i) => i * 2000000);

  const datasets = selectedPrefNames.map((name, index) => {
    const prefData = population[index] || [];
    return {
      label: name,
      data:
        prefData.length > 0
          ? prefData.map((item) => item.value)
          : defaultValues,
      borderColor: `hsl(${(index * 40) % 360}, 70%, 50%)`,
      backgroundColor: `hsl(${(index * 40) % 360}, 70%, 70%)`,
    };
  });
  const data = { labels, datasets };

  return (
    <div style={lineChartStyle}>
      <Line options={options} data={data} width={600} height={300} />
    </div>
  );
};
