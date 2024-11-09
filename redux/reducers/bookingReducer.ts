const CreateBookingState: APIState = {
  error: null,
  loading: false,
  message: "",
};

export const createBookingReducer = (
  state = CreateBookingState,
  action: APIAction
) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, message: action.payload, loading: false };
    case "FAIL":
      return { ...state, error: action.payload, loading: false };
    case "RESET":
      return { ...state, error: null, loading: false, message: "" };
    default:
      return state;
  }
};

const roomAvailabilityState: RoomAvailabilityState = {
  error: null,
  loading: false,
  isAvailable: false,
};

export const roomAvailabilityReducer = (
  state = roomAvailabilityState,
  action: RoomAvailabilityAction
) => {
  switch (action.type) {
    case "ROOM_AVAILABILITY_REQUEST":
      return { ...state, loading: true };
    case "ROOM_AVAILABILITY_SUCCESS":
      return { ...state, isAvailable: action.payload, loading: false };
    case "ROOM_AVAILABILITY_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ROOM_AVAILABILITY_RESET":
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};

const roomBookingDatesState: RoomBookedDatesState = {
  error: null,
  loading: false,
  bookedDates: [],
};

export const roomBookingDatesReducer = (
  state = roomBookingDatesState,
  action: RoomBookedDatesAction
) => {
  switch (action.type) {
    case "ROOM_BOOKED_DATES_REQUEST":
      return { ...state, loading: true };
    case "ROOM_BOOKED_DATES_SUCCESS":
      return { ...state, bookedDates: action.payload, loading: false };
    case "ROOM_BOOKED_DATES_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ROOM_BOOKED_DATES_RESET":
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};

const myBookingsState: MyBookingsState = {
  error: null,
  loading: false,
  bookings: [],
};

export const myBookingsReducer = (
  state = myBookingsState,
  action: MyBookingsAction
) => {
  switch (action.type) {
    case "MY_BOOKINGS_REQUEST":
      return { ...state, loading: true };
    case "MY_BOOKINGS_SUCCESS":
      return { ...state, bookings: action.payload, loading: false };
    case "MY_BOOKINGS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "MY_BOOKINGS_RESET":
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};

const bookingDetailsState: BookingDetailsState = {
  error: null,
  loading: false,
  booking: null,
};

export const bookingDetailsReducer = (
  state = bookingDetailsState,
  action: BookingDetailsAction
) => {
  switch (action.type) {
    case "BOOKING_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "BOOKING_DETAILS_SUCCESS":
      return { ...state, booking: action.payload, loading: false };
    case "BOOKING_DETAILS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "BOOKING_DETAILS_RESET":
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};

const BookingStatusState: BookingStatusState = {
  error: null,
  loading: false,
  message: "",
};

export const bookingStatusReducer = (
  state = BookingStatusState,
  action: BookingStatusAction
) => {
  switch (action.type) {
    case "BOOKING_STATUS_REQUEST":
      return { ...state, loading: true };
    case "BOOKING_STATUS_SUCCESS":
      return { ...state, message: action.payload, loading: false };
    case "BOOKING_STATUS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "BOOKING_STATUS_RESET":
      return { ...state, error: null, loading: false, message: "" };
    default:
      return state;
  }
};

const BookingAdditionalInformationState: BookingAdditionalInformationState = {
  error: null,
  loading: false,
  message: "",
};

export const bookingAdditionalInformationReducer = (
  state = BookingAdditionalInformationState,
  action: BookingAdditionalInformationAction
) => {
  switch (action.type) {
    case "BOOKING_ADDITIONAL_INFORMATION_REQUEST":
      return { ...state, loading: true };
    case "BOOKING_ADDITIONAL_INFORMATION_SUCCESS":
      return { ...state, message: action.payload, loading: false };
    case "BOOKING_ADDITIONAL_INFORMATION_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "BOOKING_ADDITIONAL_INFORMATION_RESET":
      return { ...state, error: null, loading: false, message: "" };
    default:
      return state;
  }
};

export const stripeCheckoutReducer = (
  state = { loading: false },
  action: StripeCheckoutAction
) => {
  switch (action.type) {
    case "STRIPE_CHECKOUT_REQUEST":
      return { ...state, loading: true };
    case "STRIPE_CHECKOUT_RESET":
      return { ...state, loading: false };
    default:
      return state;
  }
};
