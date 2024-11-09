import { combineReducers } from "redux";
import * as userReducers from "./userReducers";
import * as roomReducers from "./roomReducers";
import * as bookingReducers from "./bookingReducer";
import * as reviewReducers from "./reviewReducer";
import * as adminReducers from "./adminReducers";

const rootReducer = combineReducers<RootState>({
  password: userReducers.passwordReducer,
  allRooms: roomReducers.allRoomsReducer,
  roomDetails: roomReducers.roomDetailsReducer,
  newBookings: bookingReducers.createBookingReducer,
  roomAvailability: bookingReducers.roomAvailabilityReducer,
  roomBookedDates: bookingReducers.roomBookingDatesReducer,
  myBookings: bookingReducers.myBookingsReducer,
  bookingDetails: bookingReducers.bookingDetailsReducer,
  bookingStatus: bookingReducers.bookingStatusReducer,
  bookingAdditionalInformation:
    bookingReducers.bookingAdditionalInformationReducer,
  stripeCheckout: bookingReducers.stripeCheckoutReducer,
  updateReview: reviewReducers.updateReviewReducer,
  reviewAvailability: reviewReducers.reviewAvailabilityReducer,
  adminFacilities: adminReducers.adminFacilitiesReducer,
  adminFacility: adminReducers.adminFacilityReducer,
  adminUsers: adminReducers.adminUsersReducer,
  adminUser: adminReducers.adminUserReducer,
  adminReviews: adminReducers.adminReviewsReducer,
  adminPromotions: adminReducers.adminPromotionsReducer,
  adminPromotion: adminReducers.adminPromotionReducer,
  adminReports: adminReducers.adminReportsReducer,
});

export default rootReducer;
