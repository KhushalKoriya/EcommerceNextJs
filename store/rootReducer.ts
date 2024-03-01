// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from "../store/redux/loginSlice"
// Import other reducers as needed

const rootReducer = combineReducers({
  login: loginReducer,
  // Add other reducers here
});

export default rootReducer;
