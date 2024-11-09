type RoomAvailabilityState = {
  error: any;
  loading: boolean;
  isAvailable: boolean;
};

type RoomAvailabilityAction = {
  type:
    | "ROOM_AVAILABILITY_REQUEST"
    | "ROOM_AVAILABILITY_SUCCESS"
    | "ROOM_AVAILABILITY_FAIL"
    | "ROOM_AVAILABILITY_RESET";
  payload: any;
};

type RoomBookedDatesState = {
  error: any;
  loading: boolean;
  bookedDates: Date[];
};

type RoomBookedDatesAction = {
  type:
    | "ROOM_BOOKED_DATES_REQUEST"
    | "ROOM_BOOKED_DATES_SUCCESS"
    | "ROOM_BOOKED_DATES_FAIL"
    | "ROOM_BOOKED_DATES_RESET";
  payload: any;
};

type MyBookingsState = {
  error: any;
  loading: boolean;
  bookings: Booking[];
};

type MyBookingsAction = {
  type:
    | "MY_BOOKINGS_REQUEST"
    | "MY_BOOKINGS_SUCCESS"
    | "MY_BOOKINGS_FAIL"
    | "MY_BOOKINGS_RESET";
  payload: any;
};

type Booking = {
  _id: string;
  startDate: Date;
  endDate: Date;
  amountPaid: number;
  daysOfStay: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  additionalRequest: string;
  guestInformation: string;
  promotion: string;
  paymentInfo: {
    id: string;
    method: string;
    status: string;
    paidWith: string;
    account: string;
  };
  room: {
    roomNumber: string;
    name: string;
  };
  user: {
    email: string;
  };
  __v: string;
};

type BookingDetailsState = {
  error: any;
  loading: boolean;
  booking: BookingDetails | null;
};

type BookingDetailsAction = {
  type:
    | "BOOKING_DETAILS_REQUEST"
    | "BOOKING_DETAILS_SUCCESS"
    | "BOOKING_DETAILS_FAIL"
    | "BOOKING_DETAILS_RESET";
  payload: any;
};

type BookingDetails = {
  _id: string;
  startDate: Date;
  endDate: Date;
  amountPaid: number;
  daysOfStay: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  additionalRequest: string;
  guestInformation: string;
  promotion: string;
  paidAt: null | string | Date;
  refundedAt: null | string | Date;
  checkedInAt: null | string | Date;
  checkedOutAt: null | string | Date;
  cancelAt: null | string | Date;

  paymentInfo: {
    id: string;
    method: string;
    status: string;
    paidWith: string;
    account: string;
  };

  room: {
    _id: string;
    roomNumber: string;
    name: string;
    image: {
      publicId: string;
      url: string;
    };
    category: string;
    pricePerNight: number;
    guestCapacity: number;
    bedType: string;
  };

  user: {
    _id: string;
    email: string;
    name: string;
    avatar: {
      publicId: string;
      url: string;
    };
  };
  __v: string;
};

type BookingStatusState = {
  error: any;
  loading: boolean;
  message: string;
};

type BookingStatusAction = {
  type:
    | "BOOKING_STATUS_REQUEST"
    | "BOOKING_STATUS_SUCCESS"
    | "BOOKING_STATUS_FAIL"
    | "BOOKING_STATUS_RESET";
  payload: any;
};

type BookingAdditionalInformationState = {
  error: any;
  loading: boolean;
  message: string;
};

type BookingAdditionalInformationAction = {
  type:
    | "BOOKING_ADDITIONAL_INFORMATION_REQUEST"
    | "BOOKING_ADDITIONAL_INFORMATION_SUCCESS"
    | "BOOKING_ADDITIONAL_INFORMATION_FAIL"
    | "BOOKING_ADDITIONAL_INFORMATION_RESET";
  payload: any;
};

type StripeCheckoutState = {
  loading: boolean;
};

type StripeCheckoutAction = {
  type: "STRIPE_CHECKOUT_REQUEST" | "STRIPE_CHECKOUT_RESET";
};
