const initialState = {
  isLoading: false,
  data: [],
  errorMessage: null,
};

export default function questionReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "QUESTION_LOAD_START":
      return {
        ...state,
        isLoading: true,
        data: [],
        errorMessage: null,
      };

    case "QUESTION_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case "QUESTION_LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case "QUESTION_DATA_CLEAR":
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
