import { useEffect, useState } from "react";
import "./App.css";
import { PrefecturesCheckbox } from "./components/PrefecturesCheckbox";
import { fetchPrefectures } from "./lib/fetchPrefectures";
import { LineChart } from "./components/LineChart";
import { fetchPopulation } from "./lib/fetchPopulation";
import { Population } from "./type/type";

const PrefecturesCheckboxStyle: React.CSSProperties = {
  textAlign: "left",
  width: "600px",
  margin: "auto",
};

function App() {
  const [loading, setLoading] = useState(false);
  const [prefectures, setPrefectures] = useState<
    { prefCode: number; prefName: string }[]
  >([]);
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);
  const [population, setPopulation] = useState<Population[][]>([]);
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

  const handlePrefectureChange = (prefCode: number, checked: boolean) => {
    setSelectedPrefCodes((prev) =>
      checked ? [...prev, prefCode] : prev.filter((code) => code !== prefCode)
    );
  };

  useEffect(() => {
    if (selectedPrefCodes.length === 0) {
      setPopulation([]);
      return;
    }

    const getPopulation = async () => {
      setError(null);
      try {
        const data = await Promise.all(
          selectedPrefCodes.map((code) => fetchPopulation(code))
        );
        setPopulation(data);
      } finally {
        setLoading(false);
      }
    };

    getPopulation();
  }, [selectedPrefCodes]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const selectedPrefNames = selectedPrefCodes.map(
    (code) => prefectures.find((pref) => pref.prefCode === code)?.prefName || ""
  );

  return (
    <>
      <div style={PrefecturesCheckboxStyle}>
        {prefectures.map((prefecture) => (
          <PrefecturesCheckbox
            key={prefecture.prefCode}
            prefName={prefecture.prefName}
            prefCode={prefecture.prefCode}
            handlePrefectureChange={handlePrefectureChange}
          />
        ))}

        <LineChart
          population={population}
          selectedPrefNames={selectedPrefNames}
        />
      </div>
    </>
  );
}

export default App;
