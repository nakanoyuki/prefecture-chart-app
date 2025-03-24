import { useState } from "react";

type Props = {
  prefCode: number;
  prefName: string;
  handlePrefectureChange: (prefCode: number, checked: boolean) => void;
};

export const PrefecturesCheckbox = ({
  prefName,
  prefCode,
  handlePrefectureChange,
}: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    handlePrefectureChange(prefCode, checked);
  };

  return (
    <label>
      <input
        type="checkbox"
        value={prefName}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {prefName}
    </label>
  );
};
