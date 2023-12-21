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
    "2Q_time": "4",
    "2Q_a_count": "1",
    "2Q_b_count": "1",
    "2Q_c_count": "1",
    "2Q_d_count": "1",
    "3Q_time": "2",
    "3Q_a_count": "1",
    "3Q_b_count": "1",
    "4Q_time": "2",
    "4Q_a_count": "1",
    "4Q_b_count": "1",
    "5Q_time": "2",
    "5Q_a_count": "1",
    "5Q_b_count": "1",
    "6Q_time": "5",
    "6Q_a_count": "1",
    "6Q_b_count": "1",
    "6Q_c_count": "1",
    "6Q_d_count": "1",
    "6Q_e_count": "1",
    "7Q_time": "2",
    "7Q_a_count": "1",
    "7Q_b_count": "1",
  };

  try {
    const response = await axios.post("https://mcq-generator-xr5k.onrender.com/get_mcq", values);
    const responseData = response.data?.MCQ_Questions ?? [];

    const testList = responseData.map((e) => ({ ...e, duration: 600 }));
    console.log(testList);

    dispatch({
      type: "EXAM_LOAD_SUCCESS",
      payload: testList,
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
    console.log(err.message);
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
    console.log(err.message);
    return err.message;
  }
};
