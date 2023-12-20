import { QUES_STATUS } from "../constants";

const initialState = {
  isLoading: false,
  data: [],
  currentTest: null,
  currentQues: null,
  errorMessage: null,
};

export default function examReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "EXAM_LOAD_START":
      return {
        ...state,
        isLoading: true,
        data: [],
        currentTest: null,
        currentQues: null,
        errorMessage: null,
      };

    case "EXAM_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case "EXAM_LOAD_ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };

    case "EXAM_PREV_QUES":
      var currentQues = state.currentQues;
      var nextQues = currentQues - 1 >= 0 ? currentQues - 1 : currentQues;
      return {
        ...state,
        currentQues: nextQues,
      };

    case "EXAM_NEXT_QUES":
      var quesLength = state.data[state.currentTest]?.questions?.length;
      if (quesLength == null || quesLength <= 0) {
        throw new Error("No questions available");
      }

      var nextQues;
      if (state.currentQues == null) {
        nextQues = 0;
      } else {
        if (state.currentQues < quesLength - 1) {
          nextQues = state.currentQues + 1;
        } else {
          nextQues = 0;
        }
      }

      var updatedData = [...state.data];
      var ques = updatedData[state.currentTest]?.questions[nextQues];
      if (ques?.status == null) {
        ques.status = QUES_STATUS[1];
      }

      return {
        ...state,
        currentQues: nextQues,
        data: updatedData,
      };

    case "EXAM_GET_QUES":
      return {
        ...state,
        currentQues: payload,
      };

    case "EXAM_SET_ANS":
      var updatedData = [...state.data];
      var ques = updatedData[state.currentTest]?.questions[state.currentQues];
      if (ques != null) {
        ques.answer = payload;
        ques.status = QUES_STATUS[2];
      }

      return {
        ...state,
        data: updatedData,
      };

    case "EXAM_CLEAR_ANS":
      var updatedData = [...state.data];
      var ques = updatedData[state.currentTest]?.questions[state.currentQues];
      if (ques != null) {
        ques.answer = "";
        ques.status = QUES_STATUS[1];
      }

      return {
        ...state,
        data: updatedData,
      };

    case "EXAM_MARK_REVIEW":
      var updatedData = [...state.data];
      var ques = updatedData[state.currentTest]?.questions[state.currentQues];
      if (ques != null) {
        ques.status = ques.answer == null || ques.answer == "" ? QUES_STATUS[3] : QUES_STATUS[4];
      }

      return {
        ...state,
        data: updatedData,
      };

    case "EXAM_NEXT_TEST":
      var testLength = state.data?.length;
      if (testLength == null || testLength <= 0) {
        throw new Error("No tests available");
      }

      var nextTest;
      if (state.currentTest == null) {
        nextTest = 0;
      } else {
        if (state.currentTest < testLength - 1) {
          nextTest = state.currentTest + 1;
        } else {
          throw new Error("No tests available");
        }
      }

      return {
        ...state,
        currentTest: nextTest,
        currentQues: null,
      };

    case "EXAM_DATA_CLEAR":
      return {
        ...state,
        isLoading: false,
        data: [],
        currentTest: null,
        currentQues: null,
        errorMessage: null,
      };

    default:
      return state;
  }
}
