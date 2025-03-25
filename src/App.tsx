// import { useEffect, useState } from "react";
import "./App.css";
// import { fetchPrefectures } from "./lib/fetchPrefectures";
// import { fetchPopulation } from "./lib/fetchPopulation";
// import { Population, Prefecture } from "./type/type";
import { PrefecturesList } from "./components/PrefecturesList/PrefecturesList";
import { PopulationChart } from "./components/Chart/PopulationChart";
import { PrefectureProvider } from "./context/PrefectureContext";

const PrefecturesCheckboxStyle: React.CSSProperties = {
  textAlign: "left",
  width: "600px",
  margin: "auto",
};

function App() {
  return (
    <PrefectureProvider>
      <div style={PrefecturesCheckboxStyle}>
        <PrefecturesList />
        <PopulationChart />
      </div>
    </PrefectureProvider>
  );
}

export default App;
