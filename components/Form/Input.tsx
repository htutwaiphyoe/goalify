import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useId, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type Props = TextFieldProps & {
  label?: string;
};

function Input({ label, type, ...props }: Props) {
  const uid = useId();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const eyeToggle = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setIsShowPassword((show) => !show)}
        onMouseDown={(e) => e.preventDefault()}
        edge="end"
      >
        {isShowPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label htmlFor={uid} className="text-sm">
          {label}
        </label>
      )}
      <TextField
        id={uid}
        onWheel={(e: any) => e.target.blur()}
        type={type === "password" && isShowPassword ? "text" : type}
        InputProps={type === "password" ? { endAdornment: eyeToggle } : {}}
        {...props}
      />
    </div>
  );
}

export default Input;
