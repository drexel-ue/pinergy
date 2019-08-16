import { combineReducers } from "redux";
import interests from "./interests_reducer";
import users from "./users_reducer"
export default combineReducers({
  interests,
  users
});
