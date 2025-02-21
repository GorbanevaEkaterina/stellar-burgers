import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from '../slices/ingredientsSlice';
import burgerConstructorSlice from '../slices/burgerConstructorSlice';
import feedSlice from '../slices/feedSlice';
import userInfoSlice from '../slices/userSlice';
import userOrderHistorySlice from '../slices/userOrderHistorySlice';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  feed: feedSlice.reducer,
  userInfo: userInfoSlice.reducer,
  orderHistory: userOrderHistorySlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
