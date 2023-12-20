import UserServices from "../services/UserServices";
import { COMMON_ERROR_MSG } from "../constants";

export const getAllColleges = () => async (dispatch) => {
  dispatch({
    type: "COMMON_CLG_LOAD_START",
  });

  try {
    const response = await UserServices.getColleges();
    const responseData = response.data?.data ?? [];

    dispatch({
      type: "COMMON_CLG_LOAD_SUCCESS",
      payload: responseData,
    });

    return true;
  } catch (err) {
    console.log(err);
    return err.response?.data?.error ?? COMMON_ERROR_MSG;
  }
};

export const getAllCoursesById = (id) => async (dispatch) => {
  dispatch({
    type: "COMMON_CRS_LOAD_START",
  });

  try {
    const response = await UserServices.getCourses(id);
    const responseData = response.data?.data ?? [];

    dispatch({
      type: "COMMON_CRS_LOAD_SUCCESS",
      payload: responseData,
    });

    return true;
  } catch (err) {
    console.log(err);
    return err.response?.data?.error ?? COMMON_ERROR_MSG;
  }
};
