import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

export type Props = VariantProps<typeof classes> & {
  status: string;
  className?: string;
};

const classes = cva(
  "text-center text-xs py-1 capitalize px-2 rounded-md font-bold",
  {
    variants: {
      color: {
        info: ["bg-info", "text-white"],
        danger: ["bg-danger", "text-white"],
        success: ["bg-success", "text-black"],
        warning: ["bg-orange-300", "text-black"],
      },
    },
  }
);

function Status({ className = "", status, color }: Props) {
  const props = {
    className: classes({ color, className }),
  };

  return <span {...props}>{status}</span>;
}

export default Status;
