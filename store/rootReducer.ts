import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from "../store/redux/loginSlice"

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
