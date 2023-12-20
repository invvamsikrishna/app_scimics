import axios from "axios";
import { examQuestionsJson } from "../sections/examination/examJson";

export const getExamQuestions = () => async (dispatch) => {
  dispatch({
    type: "EXAM_LOAD_START",
  });

  var values = {
    stream: "Btech",
    course: "CSE",
    "1Q_count": "2",
    "1Q_time": "2",
    "2Q_time": "2",
    "2Q_a_count": "2",
    "2Q_b_count": "2",
    "2Q_c_count": "2",
    "2Q_d_count": "2",
    "3Q_time": "2",
    "3Q_a_count": "2",
    "3Q_b_count": "2",
    "4Q_time": "2",
    "4Q_a_count": "2",
    "4Q_b_count": "2",
    "5Q_time": "2",
    "5Q_a_count": "2",
    "5Q_b_count": "2",
    "6Q_time": "2",
    "6Q_a_count": "2",
    "6Q_b_count": "2",
    "6Q_c_count": "2",
    "6Q_d_count": "2",
    "6Q_e_count": "2",
    "7Q_time": "2",
    "7Q_a_count": "2",
    "7Q_b_count": "2",
  };

  try {
    const response = await axios.post("https://mcq-generator-xr5k.onrender.com/get_mcq", values);
    console.log(response);

    dispatch({
      type: "EXAM_LOAD_SUCCESS",
      payload: examQuestionsJson,
    });

    dispatch({
      type: "EXAM_NEXT_TEST",
    });

    dispatch({
      type: "EXAM_NEXT_QUES",
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "EXAM_LOAD_ERROR",
      payload: err.message,
    });
  }
};

export const getPrevQuestion = () => async (dispatch) => {
  dispatch({
    type: "EXAM_PREV_QUES",
  });
};

export const getNextQuestion = () => async (dispatch) => {
  try {
    dispatch({
      type: "EXAM_NEXT_QUES",
    });
  } catch (err) {
    console.log(err.message);
  }
};
export const getTestQuestion = (value) => async (dispatch) => {
  dispatch({
    type: "EXAM_GET_QUES",
    payload: value,
  });
};

export const setAnstoQues = (value) => async (dispatch) => {
  dispatch({
    type: "EXAM_SET_ANS",
    payload: value,
  });
};

export const clearAnstoQues = (value) => async (dispatch) => {
  dispatch({
    type: "EXAM_CLEAR_ANS",
    payload: value,
  });
};

export const markReviewtoQues = () => async (dispatch) => {
  dispatch({
    type: "EXAM_MARK_REVIEW",
  });

  dispatch({
    type: "EXAM_NEXT_QUES",
  });
};

export const getNextTest = () => async (dispatch) => {
  try {
    dispatch({
      type: "EXAM_NEXT_TEST",
    });

    dispatch({
      type: "EXAM_NEXT_QUES",
    });
  } catch (err) {
    console.log(err.message);
  }
};
