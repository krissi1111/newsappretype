import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import newsReducer from '../redux/slices/newsSlice'
import userReducer from '../redux/slices/userSlice'
import commentReducer from '../redux/slices/commentSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    news: newsReducer,
    user: userReducer,
    comments: commentReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
