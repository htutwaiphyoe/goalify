import { useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import Logo from "../Logo";
import Link from "next/link";
import Button from "../Form/Button";
import { useRouter } from "next/router";
import { navLinks, roles } from "@/data/constant";
import useRedirect from "@/hooks/useRedirect";
import Popover from "../PopOver";
import { Avatar } from "@mui/material";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { data: session, status } = useSession();
  const {
    pushToSignIn,
    pushToSignUp,
    pushToProfile,
    pushToMyBookings,
    pushToMyReviews,
    pushToAdminRooms,
    pushToAdminFacilities,
    pushToAdminBookings,
    pushToAdminUsers,
    pushToAdminReviews,
    pushToAdminPromotions,
    pushToAdminReports,
  } = useRedirect();

  return (
    <header className="w-full py-4 lg:px-14 fixed z-50 bg-white shadow-sm">
      <nav className="flex items-center justify-between space-x-4 px-2">
        <MobileNavigation />
        <Logo />
        <div className="flex items-center space-x-7">
          <ul className="items-center space-x-7 hidden sm:flex">
            {navLinks.map((navLink) => (
              <li key={navLink.label}>
                <Link
                  href={navLink.path}
                  className={
                    router.pathname === navLink.path
                      ? "text-primary"
                      : "text-black"
                  }
                >
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>
          {status === "authenticated" && (
            <Popover
              label={
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={session.user.avatar.url}
                    alt={session.user.name}
                    className="!w-30 !h-30 object-cover"
                  />
                  <p className="capitalize">{session.user.name.slice(0, 5)}</p>
                </div>
              }
              list={
                session.user.role === roles.admin
                  ? [
                      { label: "Users", onClick: pushToAdminUsers },
                      { label: "Rooms", onClick: pushToAdminRooms },
                      { label: "Facilities", onClick: pushToAdminFacilities },
                      { label: "Bookings", onClick: pushToAdminBookings },
                      { label: "Reviews", onClick: pushToAdminReviews },
                      { label: "Promotions", onClick: pushToAdminPromotions },
                      { label: "Reports", onClick: pushToAdminReports },
                      { label: "My Profile", onClick: pushToProfile },
                      { label: "My Bookings", onClick: pushToMyBookings },
                      { label: "My Reviews", onClick: pushToMyReviews },
                      {
                        label: "Logout",
                        onClick: () =>
                          signOut({ callbackUrl: "/signin", shownToast: true }),
                      },
                    ]
                  : [
                      { label: "My Profile", onClick: pushToProfile },
                      { label: "My Bookings", onClick: pushToMyBookings },
                      { label: "My Reviews", onClick: pushToMyReviews },
                      {
                        label: "Logout",
                        onClick: () =>
                          signOut({ callbackUrl: "/signin", shownToast: true }),
                      },
                    ]
              }
            />
          )}
          {status === "unauthenticated" && (
            <div className="flex space-x-4">
              <Button
                size="large"
                className="sm:!block !hidden"
                variant="outlined"
                label="Sign up"
                onClick={pushToSignUp}
              />
              <Button
                variant="contained"
                size="large"
                label="Sign in"
                onClick={pushToSignIn}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
