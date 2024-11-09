import { ChangeEvent, useId } from "react";

type Props = {
  label: string;
  name: string;
  value: string;
  rows: number;
  placeholder?: string;
  helperText?: string | boolean;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

function Textarea({ label, helperText, error, ...props }: Props) {
  const uid = useId();
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={uid} className="text-sm">
        {label}
      </label>
      <textarea
        id={uid}
        className={`resize-none focus:outline-primary rounded-md outline-black border border-black-light text-base px-3 py-2 w-full ${
          error ? "border-danger" : ""
        }`}
        {...props}
      />
      {helperText && <p className="text-xs text-danger">{helperText}</p>}
    </div>
  );
}

export default Textarea;
