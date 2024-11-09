import Dialog from "@/components/Dialog";
import Button from "@/components/Form/Button";
import { ReactNode } from "react";

type DeleteDialogProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
  label: ReactNode;
  description: ReactNode;
  actionLabel?: string;
};

function DeleteDialog({
  open,
  label,
  description,
  onClose,
  onDelete,
  loading,
  actionLabel = "Delete",
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <h3 className="text-xl sm:text-3xl font-bold mb-3">{label}</h3>
      <p className="text-sm sm:text-lg mb-1">{description}</p>
      <p className="text-sm sm:text-base text-danger font-bold mb-5">
        This action cannot be cancelled.
      </p>
      <div className="flex justify-end items-center space-x-3">
        <Button
          label="Close"
          size="large"
          onClick={onClose}
          variant="outlined"
          color="error"
        />
        <Button
          label={actionLabel}
          size="large"
          onClick={onDelete}
          variant="contained"
          color="error"
          disabled={loading}
        />
      </div>
    </Dialog>
  );
}

export default DeleteDialog;
