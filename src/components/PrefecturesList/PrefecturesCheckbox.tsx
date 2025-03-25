import { usePrefecture } from "../../context/PrefectureContext";

type Props = {
  prefCode: number;
  prefName: string;
};

export const PrefecturesCheckbox = ({
  prefName,
  prefCode,
}:
Props) => {
  const { selectedPrefCodes, togglePrefecture } = usePrefecture();

  return (
    <label>
      <input
        type="checkbox"
        value={prefName}
        checked={selectedPrefCodes.includes(prefCode)}
        onChange={() => togglePrefecture(prefCode)}
      />
      {prefName}
    </label>
  );
};
