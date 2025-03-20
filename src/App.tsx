import { useEffect, useState } from "react";
import "./App.css";
import { PrefecturesCheckbox } from "./components/PrefecturesCheckbox";
import { fetchPrefectures } from "./lib/fetchPrefectures";
import { LineChart } from "./components/LineChart";
import { fetchPopulation, Population } from "./lib/fetchPopulation";

function App() {
  const [loading, setLoading] = useState(false);
  const [prefectures, setPrefectures] = useState<
    { prefCode: number; prefName: string }[]
  >([]);
  const [population, setPopulation] = useState<Population[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPrefectures = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPrefectures();

        setPrefectures(data);
      } finally {
        setLoading(false);
      }
    };

    getPrefectures();
  }, []);

  useEffect(() => {
    const getPopulation = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPopulation();

        setPopulation(data);
      } finally {
        setLoading(false);
      }
    };

    getPopulation();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div>
        {prefectures.map((prefecture) => (
          <PrefecturesCheckbox
            key={prefecture.prefCode}
            prefName={prefecture.prefName}
          />
        ))}
      </div>

      <LineChart population={population} />
    </>
  );
}

export default App;
