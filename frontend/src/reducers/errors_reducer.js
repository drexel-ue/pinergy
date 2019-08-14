import { combineReducers } from "redux";

import session from "./session_errors_reducer";
import userUpdate from "./user_update_errors_reducer";

export default combineReducers({
  session,
  userUpdate
});
