import { FormControlLabel, Checkbox, CheckboxProps } from "@mui/material";

type CheckBoxProps = CheckboxProps & {
  label?: string;
};

export default function CheckBox({ label, ...props }: CheckBoxProps) {
  return <FormControlLabel control={<Checkbox {...props} />} label={label} />;
}
