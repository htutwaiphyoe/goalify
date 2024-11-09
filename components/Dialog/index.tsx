import MuiDialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren &
  DialogProps & {
    open: boolean;
    onClose: () => void;
  };

function Dialog({ open, onClose, children, ...props }: Props) {
  return (
    <MuiDialog open={open} onClose={onClose} scroll="body" {...props}>
      <DialogContent dividers={false}>{children}</DialogContent>
    </MuiDialog>
  );
}

export default Dialog;
