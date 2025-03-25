import { useEffect, useState } from "react";

import { Loading } from "../Loading";
import { Population } from "../../type/type";
import { LineChart } from "./LineChart";
import { fetchPopulation } from "../../lib/fetchPopulation";
import { usePrefecture } from "../../context/PrefectureContext";

export const PopulationChart = () => {
  const { selectedPrefCodes, selectedPrefNames } = usePrefecture();
  const [population, setPopulation] = useState<Population[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPrefCodes.length === 0) {
      setPopulation([]);
      return;
    }

    const getPopulation = async () => {
      setLoading(true);
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

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  // const selectedPrefNames = selectedPrefCodes.map(
  //   (code)=>PrefectureProvider.find((pref)=>)
  console.log(selectedPrefCodes);
  // console.log(selectedPrefCodes.map((code)=>prefecture.find((pref)=>pref.prefCode === code)?.prefName);
  return (
    <>
      <LineChart
        population={population}
        selectedPrefNames={selectedPrefNames}
      />
    </>
  );
};
