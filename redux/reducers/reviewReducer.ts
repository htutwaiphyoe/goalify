export const updateReviewReducer = (
  state = { loading: false, error: null, message: "" },
  action: UpdateReviewAction
) => {
  switch (action.type) {
    case "UPDATE_REVIEW_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_REVIEW_SUCCESS":
      return { ...state, loading: false, message: action.payload };
    case "UPDATE_REVIEW_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REVIEW_RESET":
      return { ...state, loading: false, error: null, message: "" };
    default:
      return state;
  }
};

export const reviewAvailabilityReducer = (
  state = { loading: false, error: null, isReviewAvailable: false },
  action: ReviewAvailabilityAction
) => {
  switch (action.type) {
    case "REVIEW_AVAILABILITY_REQUEST":
      return { ...state, loading: true };
    case "REVIEW_AVAILABILITY_SUCCESS":
      return { ...state, loading: false, isReviewAvailable: action.payload };
    case "REVIEW_AVAILABILITY_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "REVIEW_AVAILABILITY_RESET":
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};
