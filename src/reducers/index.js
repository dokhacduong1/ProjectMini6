import { combineReducers } from "redux";
import authReducer from ".//auth";

const allReducers = combineReducers({
  authReducer,
  // Viết thêm các reducer ở đây
});

export default allReducers;