import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { Prefecture } from "../type/type";
import { fetchPrefectures } from "../lib/fetchPrefectures";

type PrefectureContextType = {
  selectedPrefCodes: number[];
  selectedPrefNames: string[];
  togglePrefecture: (prefCode: number) => void;
};

const PrefectureContext = createContext<PrefectureContextType | undefined>(
  undefined
);

export const usePrefecture = () => {
  const context = useContext(PrefectureContext);
  if (!context) {
    throw new Error("usePrefecture must be used within a PrefectureProvider");
  }
  return context;
};

export const PrefectureProvider = ({ children }: { children: ReactNode }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<number[]>([]);

  useEffect(() => {
    const getPrefectures = async () => {
      const data = await fetchPrefectures();
      setPrefectures(data);
    };

    getPrefectures();
  }, []);

  const togglePrefecture = (prefCode: number) => {
    setSelectedPrefCodes((prev) =>
      prev.includes(prefCode)
        ? prev.filter((code) => code !== prefCode)
        : [...prev, prefCode]
    );
  };
  const selectedPrefNames = useMemo(
    () =>
      selectedPrefCodes.map(
        (code) =>
          prefectures.find((pref) => pref.prefCode === code)?.prefName || ""
      ),
    [selectedPrefCodes, prefectures]
  );
  return (
    <PrefectureContext.Provider
      value={{ selectedPrefCodes, selectedPrefNames, togglePrefecture }}
    >
      {children}
    </PrefectureContext.Provider>
  );
};
