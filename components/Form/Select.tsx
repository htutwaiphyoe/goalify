import { useId } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  SelectProps,
} from "@mui/material";

type TSelectProps = SelectProps & {
  label?: string;
  list: { label: string; value: string }[];
};

export default function Select({ label, list, ...props }: TSelectProps) {
  const uid = useId();
  return (
    <FormControl fullWidth>
      {label && (
        <label htmlFor={uid} className="text-sm mb-2">
          {label}
        </label>
      )}
      <MuiSelect id={uid} {...props} classes={{ root: "!rounded-md" }}>
        {list.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
