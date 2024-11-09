import { routes } from "@/data/constant";
import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter();

  const pushToRooms = () => router.push(routes.rooms);

  const pushToRoomDetails = (id: string) =>
    router.push(routes.roomDetails.replace(":id", id));

  const pushToSignIn = () => router.push(routes.signIn);

  const pushToSignUp = () => router.push(routes.signUp);

  const pushToProfile = () => router.push(routes.profile);

  const pushToMyBookings = () => router.push(routes.bookings);

  const pushToBookingDetails = (id: string) =>
    router.push(routes.bookingDetails.replace(":id", id));

  const pushToMyReviews = () => router.push(routes.reviews);

  const pushToAdminRooms = () => router.push(routes.adminRooms);

  const pushToNewRoom = () => router.push(routes.newRoom);

  const pushToEditRoom = (id: string) =>
    router.push(routes.editRoom.replace(":id", id));

  const pushToAdminFacilities = () => router.push(routes.adminFacilities);

  const pushToNewFacility = () => router.push(routes.newFacility);

  const pushToEditFacility = (id: string) =>
    router.push(routes.editFacility.replace(":id", id));

  const pushToAdminBookings = () => router.push(routes.adminBookings);

  const pushToAdminBookingDetails = (id: string) =>
    router.push(routes.adminBookingDetails.replace(":id", id));

  const pushToAdminUsers = () => router.push(routes.adminUsers);

  const pushToNewUser = () => router.push(routes.newUser);

  const pushToEditUser = (id: string) =>
    router.push(routes.editUser.replace(":id", id));

  const pushToAdminReviews = () => router.push(routes.adminReviews);

  const pushToAdminPromotions = () => router.push(routes.adminPromotions);

  const pushToNewPromotion = () => router.push(routes.newPromotion);

  const pushToEditPromotion = (id: string) =>
    router.push(routes.editPromotion.replace(":id", id));

  const pushToAdminReports = () => router.push(routes.reports);

  const replaceWithSignIn = () => router.replace(routes.signIn);

  const replaceWithHome = () => router.replace(routes.home);

  const back = () => router.back();

  return {
    pushToRooms,
    pushToSignIn,
    pushToSignUp,
    pushToProfile,
    replaceWithSignIn,
    replaceWithHome,
    pushToRoomDetails,
    pushToMyBookings,
    pushToBookingDetails,
    pushToMyReviews,
    pushToAdminRooms,
    pushToNewRoom,
    pushToEditRoom,
    pushToAdminFacilities,
    pushToNewFacility,
    pushToEditFacility,
    pushToAdminBookings,
    pushToAdminBookingDetails,
    pushToAdminUsers,
    pushToNewUser,
    pushToEditUser,
    pushToAdminReviews,
    pushToAdminReports,
    pushToAdminPromotions,
    pushToNewPromotion,
    pushToEditPromotion,
    back,
  };
};

export default useRedirect;
