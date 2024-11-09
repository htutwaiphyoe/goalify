import { Dispatch } from "redux";
import valhallaAxios from "@/configs/valhallaAxios";
import { headers } from "@/data/constant";
import { toast } from "react-toastify";
import { getStripe } from "@/libs/stripe";

export const createBooking =
  (data: {
    room: string;
    startDate: Date;
    endDate: Date;
    amountPaid: number;
    daysOfStay: number;
    additionalRequest: string;
    promotion: string;
    paymentInfo: {
      id: string;
      method: string;
      status: string;
      paidWith: string;
      account: string;
    };
  }) =>
  async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.post("bookings", data, headers);
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const resetCreateBookingState =
  () => async (dispatch: Dispatch<APIAction>) => {
    dispatch({ type: "RESET", payload: null });
  };

export const checkRoomAvailability =
  (data: { room: string; startDate: Date; endDate: Date }) =>
  async (dispatch: Dispatch<RoomAvailabilityAction>) => {
    try {
      dispatch({ type: "ROOM_AVAILABILITY_REQUEST", payload: null });
      const response = await valhallaAxios.get("bookings/check", {
        params: data,
      });
      dispatch({
        type: "ROOM_AVAILABILITY_SUCCESS",
        payload: response.data.data.isAvailable,
      });
    } catch (err: any) {
      dispatch({
        type: "ROOM_AVAILABILITY_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetRoomAvailabilityState =
  () => async (dispatch: Dispatch<RoomAvailabilityAction>) => {
    dispatch({ type: "ROOM_AVAILABILITY_RESET", payload: null });
  };

export const getRoomBookedDates =
  (room: string) => async (dispatch: Dispatch<RoomBookedDatesAction>) => {
    try {
      dispatch({ type: "ROOM_BOOKED_DATES_REQUEST", payload: null });
      const response = await valhallaAxios.get("bookings/dates", {
        params: { room },
      });
      dispatch({
        type: "ROOM_BOOKED_DATES_SUCCESS",
        payload: response.data.data.bookedDates,
      });
    } catch (err: any) {
      dispatch({
        type: "ROOM_BOOKED_DATES_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetRoomBookedDatesState =
  () => async (dispatch: Dispatch<RoomBookedDatesAction>) => {
    dispatch({ type: "ROOM_BOOKED_DATES_RESET", payload: null });
  };

export const getMyBookings =
  () => async (dispatch: Dispatch<MyBookingsAction>) => {
    try {
      dispatch({ type: "MY_BOOKINGS_REQUEST", payload: null });
      const response = await valhallaAxios.get("bookings/me");
      dispatch({
        type: "MY_BOOKINGS_SUCCESS",
        payload: response.data.data.bookings,
      });
    } catch (err: any) {
      dispatch({
        type: "MY_BOOKINGS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetMyBookingsState =
  () => async (dispatch: Dispatch<MyBookingsAction>) => {
    dispatch({ type: "MY_BOOKINGS_RESET", payload: null });
  };

export const getBookingDetails =
  (id: string) => async (dispatch: Dispatch<BookingDetailsAction>) => {
    try {
      dispatch({ type: "BOOKING_DETAILS_REQUEST", payload: null });
      const response = await valhallaAxios.get(`bookings/${id}`);
      dispatch({
        type: "BOOKING_DETAILS_SUCCESS",
        payload: response.data.data.booking,
      });
    } catch (err: any) {
      dispatch({
        type: "BOOKING_DETAILS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetBookingDetails =
  () => async (dispatch: Dispatch<BookingDetailsAction>) => {
    dispatch({ type: "BOOKING_DETAILS_RESET", payload: null });
  };

export const updateBookingStatus =
  (id: string, status: string, paidWith?: string, account?: string) =>
  async (dispatch: Dispatch<BookingStatusAction>) => {
    try {
      dispatch({ type: "BOOKING_STATUS_REQUEST", payload: null });
      const response = await valhallaAxios.put(
        `bookings/${id}/status`,
        { status, paidWith, account },
        headers
      );
      dispatch({
        type: "BOOKING_STATUS_SUCCESS",
        payload: response.data.message,
      });
    } catch (err: any) {
      dispatch({
        type: "BOOKING_STATUS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetUpdateBookingStatus =
  () => async (dispatch: Dispatch<BookingStatusAction>) => {
    dispatch({ type: "BOOKING_STATUS_RESET", payload: null });
  };

export const updateBookingAdditionalInformation =
  (id: string, additionalRequest: string, guestInformation: string) =>
  async (dispatch: Dispatch<BookingAdditionalInformationAction>) => {
    try {
      dispatch({
        type: "BOOKING_ADDITIONAL_INFORMATION_REQUEST",
        payload: null,
      });
      const response = await valhallaAxios.put(
        `bookings/${id}/additional-information`,
        { additionalRequest, guestInformation },
        headers
      );
      dispatch({
        type: "BOOKING_ADDITIONAL_INFORMATION_SUCCESS",
        payload: response.data.message,
      });
    } catch (err: any) {
      dispatch({
        type: "BOOKING_ADDITIONAL_INFORMATION_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetUpdateBookingAdditionalInformation =
  () => async (dispatch: Dispatch<BookingAdditionalInformationAction>) => {
    dispatch({ type: "BOOKING_ADDITIONAL_INFORMATION_RESET", payload: null });
  };

export const getStripeCheckoutSession =
  ({
    id,
    ...params
  }: {
    id: string;
    startDate: Date;
    endDate: Date;
    daysOfStay: number;
    amountPaid: number;
    additionalRequest: string;
    promotion: string;
  }) =>
  async (dispatch: Dispatch<StripeCheckoutAction>) => {
    try {
      dispatch({ type: "STRIPE_CHECKOUT_REQUEST" });
      const response = await valhallaAxios.get(
        `payment/stripe-checkout/${id}`,
        { params }
      );
      const stripe = await getStripe();
      await stripe?.redirectToCheckout({
        sessionId: response.data.data.session.id,
      });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      dispatch({ type: "STRIPE_CHECKOUT_RESET" });
    }
  };
