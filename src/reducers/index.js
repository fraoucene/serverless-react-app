import { combineReducers } from "redux";
import todos from "./todos";
import comments from "./comments";

export default combineReducers({
  todos,
  comments,
});
