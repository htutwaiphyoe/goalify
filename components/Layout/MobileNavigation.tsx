import { MouseEvent, useId, useState } from "react";
import { Popover as MuiPopover, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { navLinks } from "@/data/constant";
import { useRouter } from "next/router";

export default function MobileNavigation() {
  const id = useId();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <div className="block sm:hidden">
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <MuiPopover
        id={id}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        classes={{ paper: "shadow-lg mt-2 border p-2 rounded-lg" }}
      >
        {navLinks.map((navLink) => (
          <MenuItem key={navLink.label} onClick={handleClose}>
            <Link
              href={navLink.path}
              className={
                router.pathname === navLink.path ? "text-primary" : "text-black"
              }
            >
              {navLink.label}
            </Link>
          </MenuItem>
        ))}
      </MuiPopover>
    </div>
  );
}
