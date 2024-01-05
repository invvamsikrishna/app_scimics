import UserServices from "../services/UserServices";

export const getMyTestReports = (id) => async (dispatch) => {
  dispatch({
    type: "REPORT_LOAD_START",
  });

  try {
    const response = await UserServices.getReports(id);
    const responseData = response.data?.data ?? [];

    dispatch({
      type: "REPORT_LOAD_SUCCESS",
      payload: responseData,
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: "REPORT_LOAD_ERROR",
      payload: err.message,
    });
  }
};
