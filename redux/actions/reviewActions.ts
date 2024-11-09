import { Dispatch } from "redux";
import valhallaAxios from "@/configs/valhallaAxios";
import { headers } from "@/data/constant";

export const updateReview =
  (data: { roomId: string; comment: string; rating: number }) =>
  async (dispatch: Dispatch<UpdateReviewAction>) => {
    try {
      dispatch({ type: "UPDATE_REVIEW_REQUEST", payload: null });
      const response = await valhallaAxios.put(`reviews`, data, headers);
      dispatch({
        type: "UPDATE_REVIEW_SUCCESS",
        payload: response.data.message,
      });
    } catch (err: any) {
      dispatch({
        type: "UPDATE_REVIEW_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetUpdateReview =
  () => async (dispatch: Dispatch<UpdateReviewAction>) => {
    dispatch({ type: "UPDATE_REVIEW_RESET", payload: null });
  };

export const checkReviewAvailability =
  (roomId: string) => async (dispatch: Dispatch<ReviewAvailabilityAction>) => {
    try {
      dispatch({ type: "REVIEW_AVAILABILITY_REQUEST", payload: null });
      const response = await valhallaAxios.get(`reviews/availability`, {
        params: { roomId },
      });
      dispatch({
        type: "REVIEW_AVAILABILITY_SUCCESS",
        payload: response.data.data.isReviewAvailable,
      });
    } catch (err: any) {
      dispatch({
        type: "REVIEW_AVAILABILITY_FAIL",
        payload: err.response.data.message,
      });
    }
  };

export const resetReviewAvailability =
  () => async (dispatch: Dispatch<ReviewAvailabilityAction>) => {
    dispatch({ type: "REVIEW_AVAILABILITY_RESET", payload: null });
  };

export const getUserReviews =
  () => async (dispatch: Dispatch<AdminReviewsAction>) => {
    try {
      dispatch({ type: "ADMIN_REVIEWS_REQUEST", payload: null });
      const response = await valhallaAxios.get("reviews");
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

export const resetUserReviews =
  () => async (dispatch: Dispatch<AdminReviewsAction>) => {
    dispatch({ type: "ADMIN_REVIEWS_RESET", payload: null });
  };

export const clearUserReviews =
  () => async (dispatch: Dispatch<AdminReviewsAction>) => {
    dispatch({ type: "ADMIN_REVIEWS_CLEAR", payload: null });
  };

export const deleteUserReview =
  (id: string, roomId: string) => async (dispatch: Dispatch<APIAction>) => {
    try {
      dispatch({ type: "REQUEST", payload: null });
      const response = await valhallaAxios.delete(`reviews/${id}`, {
        params: { roomId },
      });
      dispatch({ type: "SUCCESS", payload: response.data.message });
    } catch (err: any) {
      dispatch({ type: "FAIL", payload: err.response.data.message });
    }
  };
