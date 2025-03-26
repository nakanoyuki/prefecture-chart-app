import { useEffect, useState } from "react";

import { Loading } from "../Loading";
import { PrefecturesCheckbox } from "./PrefecturesCheckbox";
import { Prefecture } from "../../type/type";
import { getPrefectures } from "../../lib/getPrefectures";

const PrefecturesCheckboxStyle: React.CSSProperties = {
  textAlign: "left",
  width: "600px",
  margin: "auto",
};

export const PrefecturesList = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    getPrefectures(setPrefectures);
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
