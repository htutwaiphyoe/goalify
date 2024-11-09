type UpdateReviewState = {
  loading: boolean;
  error: any;
  message: string;
};

type UpdateReviewAction = {
  type:
    | "UPDATE_REVIEW_REQUEST"
    | "UPDATE_REVIEW_SUCCESS"
    | "UPDATE_REVIEW_FAIL"
    | "UPDATE_REVIEW_RESET";
  payload: any;
};

type Review = {
  _id: string;
  user: string;
  name: string;
  avatar: {
    publicId: string;
    url: string;
  };
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

type AdminReview = Review & { room: string };

type ReviewAvailabilityState = {
  loading: boolean;
  error: any;
  isReviewAvailable: boolean;
};

type ReviewAvailabilityAction = {
  type:
    | "REVIEW_AVAILABILITY_REQUEST"
    | "REVIEW_AVAILABILITY_SUCCESS"
    | "REVIEW_AVAILABILITY_FAIL"
    | "REVIEW_AVAILABILITY_RESET";
  payload: any;
};

type AdminReviewsState = {
  loading: boolean;
  error: any;
  reviews: AdminReview[];
  roomList: { value: string; label: string }[];
};

type AdminReviewsAction = {
  type:
    | "ADMIN_REVIEWS_REQUEST"
    | "ADMIN_REVIEWS_SUCCESS"
    | "ADMIN_REVIEWS_FAIL"
    | "ADMIN_REVIEWS_RESET"
    | "ADMIN_REVIEWS_CLEAR";
  payload: any;
};
