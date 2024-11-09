import CheckBox from "@/components/Form/CheckBox";
import { ChangeEvent } from "react";

type PreferencesProps = {
  preferences: TPreferences;
  onChange: (name: string, value: TPreferences) => void;
};

function Preferences({ preferences, onChange }: PreferencesProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange("preferences", {
      ...preferences,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div>
      <h3 className="text-base mb-1 font-bold">Preferences</h3>
      <p className="text-sm text-gray-700 mb-1">
        We collect customer preferences for better customer services and
        conveniences.
      </p>
      <div>
        <CheckBox
          label="Vegan"
          checked={preferences.isVegan}
          name="isVegan"
          onChange={handleChange}
        />
        <CheckBox
          label="Smoker"
          checked={preferences.isSmoker}
          name="isSmoker"
          onChange={handleChange}
        />
        <CheckBox
          label="WheelChair"
          checked={preferences.usedWheelChair}
          name="usedWheelChair"
          onChange={handleChange}
        />
        <CheckBox
          label="Minimalist"
          checked={preferences.isMinimalist}
          name="isMinimalist"
          onChange={handleChange}
        />
        <CheckBox
          label="Foodie"
          checked={preferences.isFoodie}
          name="isFoodie"
          onChange={handleChange}
        />
        <CheckBox
          label="Fitness Enthusiast"
          checked={preferences.isFitnessEnthusiast}
          name="isFitnessEnthusiast"
          onChange={handleChange}
        />
        <CheckBox
          label="Workaholic"
          checked={preferences.isWorkaholic}
          name="isWorkaholic"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Preferences;
