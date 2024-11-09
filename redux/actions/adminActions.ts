import { Dispatch } from "redux";
import valhallaAxios from "@/configs/valhallaAxios";
import { headers } from "@/data/constant";

export const resetAPIState = () => async (dispatch: Dispatch<APIAction>) => {
  dispatch({ type: "RESET", payload: null });
};

export const getAllRoomsByAdmin =
  () => async (dispatch: Dispatch<AllRoomsAction>) => {
    try {
      dispatch({ type: "ALL_ROOMS_REQUEST", payload: null });
      const response = await valhallaAxios.get("admin/rooms");
      dispatch({
        type: "ALL_ROOMS_SUCCESS",
        payload: response.data.data.rooms,
      });
    } catch (err: any) {
      dispatch({ type: "ALL_ROOMS_FAIL", payload: err.response.data.message });
    }
  };

export const resetAllRoomsByAdmin =
  () => async (dispatch: Dispatch<AllRoomsAction>) => {
    dispatch({ type: "ALL_ROOMS_RESET", payload: null });
  };

export const getRoomByAdmin =
  (id: string) => async (dispatch: Dispatch<RoomDetailsAction>) => {
    try {
      dispatch({ type: "ROOM_DETAILS_REQUEST", payload: null });
      const response = await valhallaAxios.get(`admin/rooms/${id}`);
      dispatch({
        type: "ROOM_DETAILS_SUCCESS",
        payload: response.data.data.room,
      });
    } catch (err: any) {
      dispatch({
        type: "ROOM_DETAILS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetRoomByAdmin =
  () => async (dispatch: Dispatch<RoomDetailsAction>) => {
    dispatch({ type: "ROOM_DETAILS_RESET", payload: null });
  };

export const createRoomByAdmin =
  (data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.post("admin/rooms", data, headers);
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const updateRoomByAdmin =
  (id: string, data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.put(
        `admin/rooms/${id}`,
        data,
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const deleteRoomByAdmin =
  (id: string) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.delete(`admin/rooms/${id}`);
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const getAllFacilitiesByAdmin =
  () => async (dispatch: Dispatch<AdminFacilitiesAction>) => {
    try {
      dispatch({ type: "ADMIN_FACILITIES_REQUEST", payload: null });
      const response = await valhallaAxios.get("admin/facilities");
      dispatch({
        type: "ADMIN_FACILITIES_SUCCESS",
        payload: response.data.data.facilities,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_FACILITIES_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetAllFacilitiesByAdmin =
  () => async (dispatch: Dispatch<AdminFacilitiesAction>) => {
    dispatch({ type: "ADMIN_FACILITIES_RESET", payload: null });
  };

export const clearAllFacilitiesByAdmin =
  () => async (dispatch: Dispatch<AdminFacilitiesAction>) => {
    dispatch({ type: "ADMIN_FACILITIES_CLEAR", payload: null });
  };

export const getFacilityByAdmin =
  (id: string) => async (dispatch: Dispatch<AdminFacilityAction>) => {
    try {
      dispatch({ type: "ADMIN_FACILITY_REQUEST", payload: null });
      const response = await valhallaAxios.get(`admin/facilities/${id}`);
      dispatch({
        type: "ADMIN_FACILITY_SUCCESS",
        payload: response.data.data.facility,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_FACILITY_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetFacilityByAdmin =
  () => async (dispatch: Dispatch<AdminFacilityAction>) => {
    dispatch({ type: "ADMIN_FACILITY_RESET", payload: null });
  };

export const clearFacilityByAdmin =
  () => async (dispatch: Dispatch<AdminFacilityAction>) => {
    dispatch({ type: "ADMIN_FACILITY_CLEAR", payload: null });
  };

export const createFacilityByAdmin =
  (data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.post(
        "admin/facilities",
        data,
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const updateFacilityByAdmin =
  (id: string, data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.put(
        `admin/facilities/${id}`,
        data,
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const deleteFacilityByAdmin =
  (id: string) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.delete(`admin/facilities/${id}`);
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const getAllBookingsByAdmin =
  () => async (dispatch: Dispatch<MyBookingsAction>) => {
    try {
      dispatch({ type: "MY_BOOKINGS_REQUEST", payload: null });
      const response = await valhallaAxios.get("admin/bookings");
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

export const resetAllBookingsByAdmin =
  () => async (dispatch: Dispatch<MyBookingsAction>) => {
    dispatch({ type: "MY_BOOKINGS_RESET", payload: null });
  };

export const getAllUsersByAdmin =
  () => async (dispatch: Dispatch<AdminUsersAction>) => {
    try {
      dispatch({ type: "ADMIN_USERS_REQUEST", payload: null });
      const response = await valhallaAxios.get("admin/users");
      dispatch({
        type: "ADMIN_USERS_SUCCESS",
        payload: response.data.data.users,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_USERS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetAllUsersByAdmin =
  () => async (dispatch: Dispatch<AdminUsersAction>) => {
    dispatch({ type: "ADMIN_USERS_RESET", payload: null });
  };

export const clearAllUsersByAdmin =
  () => async (dispatch: Dispatch<AdminUsersAction>) => {
    dispatch({ type: "ADMIN_USERS_CLEAR", payload: null });
  };

export const getUserByAdmin =
  (id: string) => async (dispatch: Dispatch<AdminUserAction>) => {
    try {
      dispatch({ type: "ADMIN_USER_REQUEST", payload: null });
      const response = await valhallaAxios.get(`admin/users/${id}`);
      dispatch({
        type: "ADMIN_USER_SUCCESS",
        payload: response.data.data.user,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_USER_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetUserByAdmin =
  () => async (dispatch: Dispatch<AdminUserAction>) => {
    dispatch({ type: "ADMIN_USER_RESET", payload: null });
  };

export const clearUserByAdmin =
  () => async (dispatch: Dispatch<AdminUserAction>) => {
    dispatch({ type: "ADMIN_USER_CLEAR", payload: null });
  };

export const createUserByAdmin =
  (data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.post("admin/users", data, headers);
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const updateUserByAdmin =
  (id: string, data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.put(
        `admin/users/${id}`,
        data,
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const updateUserStatusByAdmin =
  (id: string, data: { isSuspended: boolean }) =>
  async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.patch(
        `admin/users/${id}/status`,
        data,
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const getAllReviewsByAdmin =
  () => async (dispatch: Dispatch<AdminReviewsAction>) => {
    try {
      dispatch({ type: "ADMIN_REVIEWS_REQUEST", payload: null });
      const response = await valhallaAxios.get("admin/reviews");
      dispatch({
        type: "ADMIN_REVIEWS_SUCCESS",
        payload: response.data.data,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_REVIEWS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetAllReviewsByAdmin =
  () => async (dispatch: Dispatch<AdminReviewsAction>) => {
    dispatch({ type: "ADMIN_REVIEWS_RESET", payload: null });
  };

export const clearAllReviewsByAdmin =
  () => async (dispatch: Dispatch<AdminReviewsAction>) => {
    dispatch({ type: "ADMIN_REVIEWS_CLEAR", payload: null });
  };

export const deleteReviewByAdmin =
  (id: string, roomId: string) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.delete(`admin/reviews/${id}`, {
        params: { roomId },
      });
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const getReportByAdmin =
  (params: { startDate: Date; endDate: Date }) =>
  async (dispatch: Dispatch<AdminReportsAction>) => {
    try {
      dispatch({ type: "ADMIN_REPORTS_REQUEST", payload: null });
      const response = await valhallaAxios.get(`admin/reports`, { params });
      dispatch({
        type: "ADMIN_REPORTS_SUCCESS",
        payload: response.data.data,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_REPORTS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetReportsByAdmin =
  () => async (dispatch: Dispatch<AdminReportsAction>) => {
    dispatch({ type: "ADMIN_REPORTS_RESET", payload: null });
  };

export const clearReportsByAdmin =
  () => async (dispatch: Dispatch<AdminReportsAction>) => {
    dispatch({ type: "ADMIN_REPORTS_CLEAR", payload: null });
  };

export const getAllPromotionsByAdmin =
  () => async (dispatch: Dispatch<AdminPromotionsAction>) => {
    try {
      dispatch({ type: "ADMIN_PROMOTIONS_REQUEST", payload: null });
      const response = await valhallaAxios.get("admin/promotions");
      dispatch({
        type: "ADMIN_PROMOTIONS_SUCCESS",
        payload: response.data.data.promotions,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_PROMOTIONS_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetAllPromotionsByAdmin =
  () => async (dispatch: Dispatch<AdminPromotionsAction>) => {
    dispatch({ type: "ADMIN_PROMOTIONS_RESET", payload: null });
  };

export const clearAllPromotionsByAdmin =
  () => async (dispatch: Dispatch<AdminPromotionsAction>) => {
    dispatch({ type: "ADMIN_PROMOTIONS_CLEAR", payload: null });
  };

export const getPromotionByAdmin =
  (id: string) => async (dispatch: Dispatch<AdminPromotionAction>) => {
    try {
      dispatch({ type: "ADMIN_PROMOTION_REQUEST", payload: null });
      const response = await valhallaAxios.get(`admin/promotions/${id}`);
      dispatch({
        type: "ADMIN_PROMOTION_SUCCESS",
        payload: response.data.data.promotion,
      });
    } catch (err: any) {
      dispatch({
        type: "ADMIN_PROMOTION_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetPromotionByAdmin =
  () => async (dispatch: Dispatch<AdminPromotionAction>) => {
    dispatch({ type: "ADMIN_PROMOTION_RESET", payload: null });
  };

export const clearPromotionByAdmin =
  () => async (dispatch: Dispatch<AdminPromotionAction>) => {
    dispatch({ type: "ADMIN_PROMOTION_CLEAR", payload: null });
  };

export const createPromotionByAdmin =
  (data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.post(
        "admin/promotions",
        data,
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const updatePromotionByAdmin =
  (id: string, data: any) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.put(
        `admin/promotions/${id}`,
        data,
        headers
      );
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };

export const deletePromotionByAdmin =
  (id: string) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.delete(`admin/promotions/${id}`);
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };
