import { Avatar, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import { twMerge } from "tailwind-merge";
import { cva, VariantProps } from "class-variance-authority";

type DropZoneProps = VariantProps<typeof classes> & {
  onUpload: (file: File | null) => void;
  onRemove: () => void;
  value: any;
  helperText: any;
  error: any;
  label?: string;
  className?: string;
};

const classes = cva(
  "flex justify-center items-center flex-col p-5 border border-gray-400 border-dashed space-y-1",
  {
    variants: {
      variant: {
        avatar: "w-28 h-28 rounded-full",
        hero: "w-full h-48 rounded-lg",
      },
    },
  }
);

function DropZone({
  value,
  helperText,
  error,
  onUpload,
  onRemove,
  label = "Avatar*",
  className,
  variant = "avatar",
}: DropZoneProps) {
  const onDrop = (acceptedFiles: any, fileRejections: any) => {
    fileRejections.forEach((fileRejection: any) => {
      fileRejection.errors.forEach((err: any) => {
        if (err.code === "file-invalid-type") {
          return toast.error("You have uploaded an invalid file type");
        }
        if (err.code === "file-too-large") {
          return toast.error("File size is too big. Max file size: 800kb");
        }
      });
      return onUpload(null);
    });
    onUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    minSize: 0,
    maxSize: 800000,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
  });

  return (
    <div>
      <label className="text-sm block mb-2">{label}</label>
      {value ? (
        <div className="flex space-x-1 items-center h">
          <Avatar
            alt={value.name}
            className={
              variant === "avatar"
                ? "!w-28 !h-28 !object-cover"
                : "!w-10/12 !h-48 !rounded-lg !object-cover"
            }
            src={typeof value === "string" ? value : URL.createObjectURL(value)}
          />
          <IconButton onClick={onRemove}>
            <DeleteIcon className="text-black" />
          </IconButton>
        </div>
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={twMerge(classes({ variant }), className)}>
            <p className="text-xs text-center">Click to select file</p>
            <p className="text-2xs text-gray-500 text-center">
              (File type: .png, .jpg, .jepg)
            </p>
          </div>
        </div>
      )}
      <p className={`text-xs ${error ? "text-danger" : "text-black"}`}>
        {helperText}
      </p>
    </div>
  );
}

export default DropZone;
