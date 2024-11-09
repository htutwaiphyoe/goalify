export const headers = {
  headers: { "Content-Type": "application/json" },
};

export const THIRTY_MINUTES = 30 * 60 * 1000;

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
];

export const routes = {
  home: "/",
  about: "/about",
  rooms: "/rooms",
  roomDetails: "/rooms/:id",
  signIn: "/signin",
  signUp: "/signup",
  forgot: "/password/forgot",
  reset: "/password/reset/:id",
  profile: "/profile",
  bookings: "/bookings",
  bookingDetails: "/bookings/:id",
  reviews: "/reviews",
  adminRooms: "/admin/rooms",
  newRoom: "/admin/rooms/new",
  editRoom: "/admin/rooms/:id",
  adminFacilities: "/admin/facilities",
  newFacility: "/admin/facilities/new",
  editFacility: "/admin/facilities/:id",
  adminBookings: "/admin/bookings",
  adminBookingDetails: "/admin/bookings/:id",
  adminUsers: "/admin/users",
  newUser: "/admin/users/new",
  editUser: "/admin/users/:id",
  adminReviews: "/admin/reviews",
  adminPromotions: "/admin/promotions",
  newPromotion: "/admin/promotions/new",
  editPromotion: "/admin/promotions/:id",
  reports: "/admin/reports",
};

export const roomCategories = [
  { value: "", label: "All categories" },
  { value: "Superior", label: "Superior" },
  { value: "Deluxe", label: "Deluxe" },
  { value: "Junior", label: "Junior" },
  { value: "Executive", label: "Executive" },
];

export const bedTypes = [
  { value: "", label: "All bed types" },
  { value: "Single", label: "Single" },
  { value: "Twin", label: "Twin" },
  { value: "Double", label: "Double" },
  { value: "King", label: "King" },
];

export const MMKRate = 3000;

export const bookingStatus = {
  booked: "Booked",
  checkedIn: "Checked-In",
  checkedOut: "Checked-Out",
  cancelled: "Cancelled",
};

export const paymentStatus = {
  paid: "paid",
  pending: "pending",
  refunded: "refunded",
};

export const statusColor = {
  Booked: "info",
  "Checked-In": "success",
  "Checked-Out": "success",
  Cancelled: "danger",
  pending: "warning",
  paid: "success",
  refunded: "info",
};

export const roles = {
  admin: "admin",
  agency: "agency",
  user: "user",
};

export const roomCategory = {
  superior: "Superior",
  deluxe: "Deluxe",
  junior: "Junior",
  executive: "Executive",
};

export const bedType = {
  single: "Single",
  twin: "Twin",
  double: "Double",
  king: "King",
};

export const roomCategoryOptions = [
  { value: "Superior", label: "Superior" },
  { value: "Deluxe", label: "Deluxe" },
  { value: "Junior", label: "Junior" },
  { value: "Executive", label: "Executive" },
];

export const bedTypeOptions = [
  { value: "Single", label: "Single" },
  { value: "Twin", label: "Twin" },
  { value: "Double", label: "Double" },
  { value: "King", label: "King" },
];

export const bookingStatusList = [
  { value: "", label: "All Booking Status" },
  { value: "Booked", label: "Booked" },
  { value: "Checked-In", label: "Checked-In" },
  { value: "Checked-Out", label: "Checked-Out" },
  { value: "Cancelled", label: "Cancelled" },
];

export const paymentStatusList = [
  { value: "", label: "All Payment Status" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
];

export const userStatusList = [
  { value: "", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Suspended", label: "Suspended" },
];

export const userRoleList = [
  { value: "", label: "All Roles" },
  { value: "user", label: "User" },
  { value: "agency", label: "Agency" },
  { value: "admin", label: "Admin" },
];

export const orderList = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export const orders = {
  newest: "newest",
  oldest: "oldest",
};

export const paymentProviderList = [
  { value: "Cash", label: "Cash" },
  { value: "KPay", label: "KPay" },
  { value: "WavePay", label: "WavePay" },
  { value: "CBPay", label: "CBPay" },
  { value: "AYAPay", label: "AYAPay" },
  { value: "AYABanking", label: "AYABanking" },
  { value: "KBZBanking", label: "KBZBanking" },
  { value: "CBBanking", label: "CBBanking" },
];

export const paymentProviders = {
  Cash: "Cash",
  KPay: "KPay",
  WavePay: "WavePay",
  CBPay: "CBPay",
  AYAPay: "AYAPay",
  AYABanking: "AYABanking",
  KBZBanking: "KBZBanking",
  CBBanking: "CBBanking",
};

export const rooms = [
  {
    image: "superior.jpeg",
    name: "Superior",
    description: `Our modern and comfortable superior rooms are well furnished and offer convenience with a comfortable single bed for the solo business traveler and twins and double beds. These single superior rooms is furnished for you to do your work or relax, watch movies on a large screen TV, or read in bed.`,
  },
  {
    image: "deluxe.jpeg",
    name: "Deluxe",
    description: `With full length glass windows, and featuring a double bed or twin sharing beds that come with fully air-conditioned rooms and walk in shower with a range of cool amenities. Large screen smart tv and cable tv programs`,
  },
  {
    image: "junior.jpeg",
    name: "Junior",
    description: `Offering the option of a King-sized bed and a double bed for junior rooms, which is perfectly suitable for your family or friends. The room features with simple, modern technology essentials and unique interior design, bathtub and jacuzzi.`,
  },
  {
    image: "executive.jpeg",
    name: "Executive",
    description: `Offering the option of a King-sized bed and a double bed for executive rooms, which is perfectly suitable for your family or friends. The room features with beautiful living room, modern technology essentials and unique interior design, bathtub and jacuzzi.`,
  },
];

export const services = [
  {
    image: "restaurant.jpeg",
    name: "Restaurant",
    description: `Our restaurant offer a casual dinning experience with a cross-over kitchen of Regional Asian and International Cuisine`,
  },
  {
    image: "sky-bar.jpeg",
    name: "Sky bar",
    description: `World famous Cocktails like the Pegu Club will be served beside our wine cellar and a wide beer selection`,
  },
  {
    image: "swimming-pool.jpeg",
    name: "Swimming Pool",
    description: `Indoor swimming pool has a perfect ventilation system, strict water quality control, and natural lighting that ensures a relaxing atmosphere`,
  },
];

export const faqs = [
  {
    name: "What kind of place is Hotel Valhalla?",
    description: `Hotel Valhalla is a great stop for trekkers, bikers, and golfers, as it offers a practice golf range just in front of the hotel.`,
  },
  {
    name: "What kind of facilities does Hotel Valhalla offer?",
    description: `Hotel Valhalla offers common facilities for each room category: hot and cold water, aircon, tv, mini bar, veranda, breakfast, bath tub. Junior and Executive rooms provide beautiful decoration, wider bath tub, jacuzzi and living room.`,
  },
  {
    name: "How many room categories does Hotel Valhalla offer?",
    description: `Hotel Valhalla provides a total of four room categories: Superior, Deluxe, Junior, and Executive.`,
  },
  {
    name: "Can I book a room with a specific bed type at Hotel Valhalla?",
    description: `Yes, you can. Hotel Valhalla offers various bed options within each room category, including single, twin, double, and king-size beds.`,
  },
  {
    name: "What is the peak season at Hotel Valhalla, and when should I plan my visit?",
    description: `The hotel experiences its peak season during festival periods and holidays, such as Winter December holidays, Taunggyi Tazaungdaing, and Thingyan (Burmese New Year).`,
  },
  {
    name: "What payment methods are accepted at Hotel Valhalla?",
    description: `Guests can make payments using cash or local payment options or credit card. Additionally, the hotel is working with various travel agencies.`,
  },
];
