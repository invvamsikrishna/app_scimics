const initialState = {
  isCollegesLoading: false,
  isCoursesLoading: false,
  colleges: [],
  courses: [],
};

export default function commonReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "COMMON_CLG_LOAD_START":
      return {
        ...state,
        isCollegesLoading: true,
        colleges: [],
      };

    case "COMMON_CRS_LOAD_START":
      return {
        ...state,
        isCoursesLoading: true,
        courses: [],
      };

    case "COMMON_CLG_LOAD_SUCCESS":
      return {
        ...state,
        isCollegesLoading: false,
        colleges: payload,
      };

    case "COMMON_CRS_LOAD_SUCCESS":
      return {
        ...state,
        isCoursesLoading: false,
        courses: payload,
      };

    default:
      return state;
  }
}
