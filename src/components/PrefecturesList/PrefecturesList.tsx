import { useEffect, useState } from "react";

import { Loading } from "../Loading";
import { fetchPrefectures } from "../../lib/fetchPrefectures";
import { PrefecturesCheckbox } from "./PrefecturesCheckbox";
import { Prefecture } from "../../type/type";

const PrefecturesCheckboxStyle: React.CSSProperties = {
  textAlign: "left",
  width: "600px",
  margin: "auto",
};

export const PrefecturesList = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState(false);
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

  if (loading) return <Loading />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div style={PrefecturesCheckboxStyle}>
        {prefectures.map((prefecture) => (
          <PrefecturesCheckbox key={prefecture.prefCode} {...prefecture} />
        ))}
      </div>
    </>
  );
};
