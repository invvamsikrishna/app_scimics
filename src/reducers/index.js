import { combineReducers } from "redux";
import examReducer from "./exam";
import authReducer from "./auth";
import commonReducer from "./common";
import reportReducer from "./report";
import questionReducer from "./question";

export default combineReducers({ auth: authReducer, common: commonReducer, exam: examReducer, question: questionReducer, report: reportReducer });
