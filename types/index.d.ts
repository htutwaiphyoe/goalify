type RootState = {
  password: APIState;
  allRooms: AllRoomsState;
  roomDetails: RoomDetailsState;
  newBookings: APIState;
  roomAvailability: RoomAvailabilityState;
  roomBookedDates: RoomBookedDatesState;
  myBookings: MyBookingsState;
  bookingDetails: BookingDetailsState;
  bookingStatus: BookingStatusState;
  bookingAdditionalInformation: BookingAdditionalInformationState;
  stripeCheckout: StripeCheckoutState;
  updateReview: UpdateReviewState;
  reviewAvailability: ReviewAvailabilityState;
  adminFacilities: AdminFacilitiesState;
  adminFacility: AdminFacilityState;
  adminUsers: AdminUsersState;
  adminUser: AdminUserState;
  adminReviews: AdminReviewsState;
  adminPromotions: AdminPromotionsState;
  adminPromotion: AdminPromotionState;
  adminReports: AdminReportsState;
};

interface ICredentials extends Record<"email", "password"> {
  email: string;
  password: string;
}

type MailOptions = {
  email: string;
  subject: string;
  body: string;
  text: string;
};

type MetaProps = {
  description: string;
  title: string;
};

type Popover = {
  label: ReactNode;
  list: { label: string; onClick: () => void }[];
};
