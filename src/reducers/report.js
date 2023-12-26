const initialState = {
  isLoading: false,
  data: [],
  errorMessage: null,
};

export default function reportReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "REPORT_LOAD_START":
      return {
        ...state,
        isLoading: true,
        data: [],
        errorMessage: null,
      };

    case "REPORT_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case "REPORT_LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case "EXAM_DATA_CLEAR":
      return {
        ...state,
        isLoading: false,
        data: [],
        errorMessage: null,
      };

    default:
      return state;
  }
}
