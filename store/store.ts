// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';


// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Define AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Define useDispatch hook with correct type
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
