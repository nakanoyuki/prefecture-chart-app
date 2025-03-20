import { useEffect, useState } from "react";
import "./App.css";
import { PrefecturesCheckbox } from "./components/PrefecturesCheckbox";
import { fetchPrefectures } from "./lib/fetchPrefectures";
import { LineChart } from "./components/LineChart";

function App() {
  const [loading, setLoading] = useState(false);
  const [prefectures, setPrefectures] = useState<
    { prefCode: number; prefName: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const getPrefectures = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPrefectures();

      setPrefectures(data);
      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrefectures();
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
      <LineChart />
    </>
  );
}

export default App;
