const adminFacilities: AdminFacilitiesState = {
  facilities: [],
  error: null,
  loading: false,
};

export const adminFacilitiesReducer = (
  state = adminFacilities,
  action: AdminFacilitiesAction
) => {
  switch (action.type) {
    case "ADMIN_FACILITIES_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_FACILITIES_SUCCESS":
      return { ...state, facilities: action.payload, loading: false };
    case "ADMIN_FACILITIES_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_FACILITIES_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_FACILITIES_CLEAR":
      return { ...state, facilities: [], error: null, loading: false };
    default:
      return state;
  }
};

const adminFacility: AdminFacilityState = {
  facility: null,
  error: null,
  loading: false,
};

export const adminFacilityReducer = (
  state = adminFacility,
  action: AdminFacilityAction
) => {
  switch (action.type) {
    case "ADMIN_FACILITY_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_FACILITY_SUCCESS":
      return { ...state, facility: action.payload, loading: false };
    case "ADMIN_FACILITY_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_FACILITY_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_FACILITY_CLEAR":
      return { ...state, facility: null, error: null, loading: false };
    default:
      return state;
  }
};

const adminUsers: AdminUsersState = {
  users: [],
  error: null,
  loading: false,
};

export const adminUsersReducer = (
  state = adminUsers,
  action: AdminUsersAction
) => {
  switch (action.type) {
    case "ADMIN_USERS_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_USERS_SUCCESS":
      return { ...state, users: action.payload, loading: false };
    case "ADMIN_USERS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_USERS_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_USERS_CLEAR":
      return { ...state, users: [], error: null, loading: false };
    default:
      return state;
  }
};

const adminUser: AdminUserState = {
  user: null,
  error: null,
  loading: false,
};

export const adminUserReducer = (
  state = adminUser,
  action: AdminUserAction
) => {
  switch (action.type) {
    case "ADMIN_USER_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_USER_SUCCESS":
      return { ...state, user: action.payload, loading: false };
    case "ADMIN_USER_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_USER_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_USER_CLEAR":
      return { ...state, user: null, error: null, loading: false };
    default:
      return state;
  }
};

const adminReviewState: AdminReviewsState = {
  loading: false,
  error: null,
  reviews: [],
  roomList: [],
};
export const adminReviewsReducer = (
  state = adminReviewState,
  action: AdminReviewsAction
) => {
  switch (action.type) {
    case "ADMIN_REVIEWS_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_REVIEWS_SUCCESS":
      const reviews = action.payload.reviews
        .map((roomReviews: any) =>
          roomReviews.reviews.map((review: any) => ({
            ...review,
            room: roomReviews.room,
          }))
        )
        .flat();
      return {
        ...state,
        loading: false,
        reviews,
        roomList: action.payload.roomList,
      };
    case "ADMIN_REVIEWS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_REVIEWS_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_REVIEWS_CLEAR":
      return {
        ...state,
        loading: false,
        error: null,
        reviews: [],
        roomList: [],
      };
    default:
      return state;
  }
};

const adminReports: AdminReportsState = {
  data: null,
  error: null,
  loading: false,
};

export const adminReportsReducer = (
  state = adminReports,
  action: AdminReportsAction
) => {
  switch (action.type) {
    case "ADMIN_REPORTS_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_REPORTS_SUCCESS":
      return { ...state, data: action.payload, loading: false };
    case "ADMIN_REPORTS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_REPORTS_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_REPORTS_CLEAR":
      return { ...state, data: null, error: null, loading: false };
    default:
      return state;
  }
};

const adminPromotions: AdminPromotionsState = {
  promotions: [],
  error: null,
  loading: false,
};

export const adminPromotionsReducer = (
  state = adminPromotions,
  action: AdminPromotionsAction
) => {
  switch (action.type) {
    case "ADMIN_PROMOTIONS_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_PROMOTIONS_SUCCESS":
      return { ...state, promotions: action.payload, loading: false };
    case "ADMIN_PROMOTIONS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_PROMOTIONS_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_PROMOTIONS_CLEAR":
      return { ...state, promotions: [], error: null, loading: false };
    default:
      return state;
  }
};

const adminPromotion: AdminPromotionState = {
  promotion: null,
  error: null,
  loading: false,
};

export const adminPromotionReducer = (
  state = adminPromotion,
  action: AdminPromotionAction
) => {
  switch (action.type) {
    case "ADMIN_PROMOTION_REQUEST":
      return { ...state, loading: true };
    case "ADMIN_PROMOTION_SUCCESS":
      return { ...state, promotion: action.payload, loading: false };
    case "ADMIN_PROMOTION_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADMIN_PROMOTION_RESET":
      return { ...state, error: null, loading: false };
    case "ADMIN_PROMOTION_CLEAR":
      return { ...state, promotion: null, error: null, loading: false };
    default:
      return state;
  }
};
