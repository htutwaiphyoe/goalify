const allRoomsState: AllRoomsState = {
  rooms: [],
  error: null,
  loading: false,
};

export const allRoomsReducer = (
  state = allRoomsState,
  action: AllRoomsAction
) => {
  switch (action.type) {
    case "ALL_ROOMS_REQUEST":
      return { ...state, loading: true };
    case "ALL_ROOMS_SUCCESS":
      return { ...state, rooms: action.payload, loading: false };
    case "ALL_ROOMS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ALL_ROOMS_RESET":
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};

const roomDetailsState: RoomDetailsState = {
  room: null,
  error: null,
  loading: false,
};

export const roomDetailsReducer = (
  state = roomDetailsState,
  action: RoomDetailsAction
) => {
  switch (action.type) {
    case "ROOM_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "ROOM_DETAILS_SUCCESS":
      return { ...state, room: action.payload, loading: false };
    case "ROOM_DETAILS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ROOM_DETAILS_RESET":
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};
