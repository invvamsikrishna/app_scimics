import UserServices from "../services/UserServices";

export const getExamQuestions = () => async (dispatch) => {
  dispatch({
    type: "EXAM_LOAD_START",
  });

  try {
    const response = await UserServices.getExamQuestions();
    const responseData = response.data?.data ?? [];

    dispatch({
      type: "EXAM_LOAD_SUCCESS",
      payload: responseData,
    });

    dispatch({
      type: "EXAM_NEXT_TEST",
    });

    dispatch({
      type: "EXAM_NEXT_QUES",
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: "EXAM_LOAD_ERROR",
      payload: err.message,
    });
  }
};

export const getPrevQuestion = () => (dispatch) => {
  dispatch({
    type: "EXAM_PREV_QUES",
  });
};

export const getNextQuestion = () => (dispatch) => {
  try {
    dispatch({
      type: "EXAM_NEXT_QUES",
    });
  } catch (err) {
    // console.log(err.message);
  }
};
export const getTestQuestion = (value) => (dispatch) => {
  dispatch({
    type: "EXAM_GET_QUES",
    payload: value,
  });
};

export const setAnstoQues = (value) => (dispatch) => {
  dispatch({
    type: "EXAM_SET_ANS",
    payload: value,
  });
};

export const clearAnstoQues = (value) => (dispatch) => {
  dispatch({
    type: "EXAM_CLEAR_ANS",
    payload: value,
  });
};

export const markReviewtoQues = () => (dispatch) => {
  dispatch({
    type: "EXAM_MARK_REVIEW",
  });

  dispatch({
    type: "EXAM_NEXT_QUES",
  });
};

export const getNextTest = () => (dispatch) => {
  try {
    dispatch({
      type: "EXAM_NEXT_TEST",
    });

    dispatch({
      type: "EXAM_NEXT_QUES",
    });

    return true;
  } catch (err) {
    // console.log(err.message);
    return err.message;
  }
};
