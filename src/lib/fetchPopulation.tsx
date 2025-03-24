import axios from "axios";
import { Population } from "../type/type";

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export const fetchPopulation = async (
  prefCode: number
): Promise<Population[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    const currentYear = new Date().getFullYear();
    const populationData = response.data.result.data[0].data.filter(
      (item: Population) => item.year <= currentYear
    );
    console.log(populationData);
    return populationData;
  } catch (error) {
    console.error("人口データ取得エラー:", error);
    throw new Error("人口データの取得に失敗しました");
  }
};
