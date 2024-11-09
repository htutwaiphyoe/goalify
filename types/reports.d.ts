type ReportsState = {
  occupancyRate: number;
  noOfOccupancyBookings: number;
  noOfRooms: number;
  totalRevenue: number;
  averageDailyRate: number;
  totalRoomsSold: number;
  revenuePerAvailableRooms: number;
  averageLengthOfStays: number;
  totalLengthOfStays: number;
  noOfValidBookings: number;
  cancellationRate: number;
  noOfCancelledBookings: number;
  noOfBookings: number;
  revenuePerRoomType: any;
  roomRevenue: RoomRevenue[];
  userRevenue: UserRevenue[];
  bookingAndPaymentStatus: any;
};

type RoomRevenue = {
  _id: string;
  name: string;
  roomNumber: string;
  reviews: number;
  bookings: number;
  revenue: number;
};

type UserRevenue = {
  _id: string;
  name: string;
  email: string;
  avatar: { publicId: string; url: string };
  role: string;
  reviews: number;
  bookings: number;
  revenue: number;
};

type AdminReportsState = {
  loading: boolean;
  error: any;
  data: ReportsState | null;
};

type AdminReportsAction = {
  type:
    | "ADMIN_REPORTS_REQUEST"
    | "ADMIN_REPORTS_SUCCESS"
    | "ADMIN_REPORTS_FAIL"
    | "ADMIN_REPORTS_RESET"
    | "ADMIN_REPORTS_CLEAR";
  payload: any;
};
