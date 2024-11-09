import { Dispatch } from "redux";
import valhallaAxios from "@/configs/valhallaAxios";

export const getAllRooms = () => async (dispatch: Dispatch<AllRoomsAction>) => {
  try {
    const response = await valhallaAxios.get("rooms");
    dispatch({ type: "ALL_ROOMS_SUCCESS", payload: response.data.data.rooms });
  } catch (err: any) {
    dispatch({ type: "ALL_ROOMS_FAIL", payload: err.response.data.message });
  }
};

export const resetAllRooms =
  () => async (dispatch: Dispatch<AllRoomsAction>) => {
    dispatch({ type: "ALL_ROOMS_RESET", payload: null });
  };

export const getRoomDetails =
  (id: string) => async (dispatch: Dispatch<RoomDetailsAction>) => {
    try {
      const response = await valhallaAxios.get(`rooms/${id}`);
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

export const resetRoomDetails =
  () => async (dispatch: Dispatch<RoomDetailsAction>) => {
    dispatch({ type: "ROOM_DETAILS_RESET", payload: null });
  };
