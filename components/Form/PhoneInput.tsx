import { useId, useState } from "react";
import ReactPhoneInput, { PhoneInputProps } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type Props = PhoneInputProps & {
  label?: string;
  helperText?: string | false | undefined;
  error?: boolean;
};

const PhoneInput = ({ label, helperText, error, onBlur, ...props }: Props) => {
  const uid = useId();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label htmlFor={uid} className="text-sm">
          {label}
        </label>
      )}
      <ReactPhoneInput
        country="mm"
        inputProps={{ id: uid }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e, data) => {
          setIsFocused(false);
          onBlur && onBlur(e, data);
        }}
        buttonStyle={{
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "6px 0 0 6px",
          border: error
            ? "2px solid #FE5F55"
            : isFocused
            ? "2px solid #6e57e0"
            : "1px solid rgba(0, 0, 0, 0.23)",
        }}
        inputStyle={{
          width: "100%",
          padding: "27px 24px 26px 90px",
          borderRadius: "6px",
          fontSize: "16px",
          fontFamily: "inherit",
          color: "#010101",
          border: error
            ? "2px solid #FE5F55"
            : isFocused
            ? "2px solid #6e57e0"
            : "1px solid rgba(0, 0, 0, 0.23)",
        }}
        {...props}
      />
      {helperText && (
        <p className={`text-xs ${error ? "text-danger" : "text-black"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
