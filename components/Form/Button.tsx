import { ReactNode } from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

export type Props = ButtonProps & {
  label: ReactNode;
};

function Button({ label, ...props }: Props) {
  return <MuiButton {...props}>{label}</MuiButton>;
}

export default Button;
