import { useState } from "react";

type Props = {
  prefName: string;
};

export const PrefecturesCheckbox = ({ prefName }: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {prefName}
      </label>
    </div>
  );
};
