import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/prefectures`, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("API取得エラー:", error);
    throw new Error("都道府県データの取得に失敗しました");
  }
};
