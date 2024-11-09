type AllRoomsState = {
  rooms: Room[];
  error: any;
  loading: boolean;
};

type AllRoomsAction = {
  type:
    | "ALL_ROOMS_REQUEST"
    | "ALL_ROOMS_SUCCESS"
    | "ALL_ROOMS_FAIL"
    | "ALL_ROOMS_RESET";
  payload: any;
};

type RoomDetailsState = {
  room: Room | null;
  error: any;
  loading: boolean;
};

type RoomDetailsAction = {
  type:
    | "ROOM_DETAILS_REQUEST"
    | "ROOM_DETAILS_SUCCESS"
    | "ROOM_DETAILS_FAIL"
    | "ROOM_DETAILS_RESET";
  payload: any;
};

type Room = {
  _id: string;
  roomNumber: string;
  name: string;
  description: string;
  category: string;
  facilities: Facility[];
  pricePerNight: number;
  promotion: Promotion | null;
  guestCapacity: number;
  bedType: string;
  ratings: number;
  numOfReviews: number;
  image: {
    publicId: string;
    url: string;
  };
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
