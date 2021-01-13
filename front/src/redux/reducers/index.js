import { combineReducers } from "redux"
import currentUserReducer from "./currentUser"
import usersReducer from "./users"
import skillsReducer from "./skills"

export default combineReducers({
  currentUser: currentUserReducer,
  users: usersReducer,
  skills: skillsReducer,
})
