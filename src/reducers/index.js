import { combineReducers } from "redux";
import examReducer from "./exam";
import authReducer from "./auth";
import commonReducer from "./common";

export default combineReducers({ auth: authReducer, common: commonReducer, exam: examReducer });
