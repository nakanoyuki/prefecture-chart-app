import { fetchPrefectures } from "./fetchPrefectures";
import { Prefecture } from "../type/type";

export const getPrefectures = async (
  setPrefectures: (data: Prefecture[]) => void
) => {
  const data = await fetchPrefectures();
  setPrefectures(data);
};
