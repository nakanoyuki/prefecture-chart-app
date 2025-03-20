import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

export type Population = {
  year: number;
  value: number;
};

export const fetchPopulation = async (): Promise<Population[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/population/composition/perYear?prefCode=1`,
      {
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    console.log(response);
    // レスポンスからデータを抽出して返す
    const populationData = response.data.result.data[0].data;
    console.log("人口データ:", populationData);

    return populationData;
  } catch (error) {
    console.error("人口データ取得エラー:", error);
    throw new Error("人口データの取得に失敗しました");
  }
};
// export const fetchPopulation = async (): Promise<PopulationData[]> => {
//   try {
//     const response = await axios.get<PopulationResponse>(
//       `${API_URL}/api/v1/population/composition/perYear`,
//       {
//         headers: {
//           "X-API-KEY": API_KEY,
//           "Content-Type": "application/json; charset=UTF-8",
//         },
//       }
//     );

//     // 結果のデータを取得
//     const data = response.data.result.data;

//     // 必要な情報を抽出して返す
//     // ここでは「年少人口」のデータを返します
//     const youngPopulationData = data.find((item) => item.label === "年少人口");

//     if (!youngPopulationData) {
//       throw new Error("年少人口のデータが見つかりません");
//     }
//     console.log(data);
//     return youngPopulationData.data; // 年少人口のデータを返す
//   } catch (error) {
//     console.error("人口データ取得エラー:", error);
//     throw new Error("人口データの取得に失敗しました");
//   }
// };
