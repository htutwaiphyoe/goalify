import { MouseEvent, ReactNode, useId, useState } from "react";
import { Popover as MuiPopover, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "../Form/Button";

export default function Popover({ label, list }: Popover) {
  const id = useId();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        label={label}
        endIcon={<KeyboardArrowDownIcon />}
      />
      <MuiPopover
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        classes={{ paper: "shadow-lg mt-2 border p-2 rounded-lg" }}
      >
        {list.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </MuiPopover>
    </div>
  );
}
