import AdminServices from "../services/AdminServices";

export const getQuestionsList = (catid, subcatid) => async (dispatch) => {
  dispatch({
    type: "QUESTION_LOAD_START",
  });

  try {
    const response = await AdminServices.getQuestionsByCategory({ catid: catid, subcatid: subcatid });
    const responseData = response.data?.data ?? [];

    dispatch({
      type: "QUESTION_LOAD_SUCCESS",
      payload: responseData,
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: "QUESTION_LOAD_ERROR",
      payload: err.message,
    });
  }
};
