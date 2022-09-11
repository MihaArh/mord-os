import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import applicationsReducer from './applicationsSlice';
import directoryReducer from './directorySlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    directory: directoryReducer,
    apps: applicationsReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
