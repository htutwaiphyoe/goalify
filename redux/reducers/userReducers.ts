const PasswordState: APIState = {
  error: null,
  loading: false,
  message: "",
};

export const passwordReducer = (state = PasswordState, action: APIAction) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, message: action.payload, loading: false };
    case "FAIL":
      return { ...state, error: action.payload, loading: false };
    case "RESET":
      return { ...state, error: null, loading: false, message: "" };
    default:
      return state;
  }
};
