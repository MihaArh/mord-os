import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './configureStore';

export interface User {
  email: string;
  password: string;
  loggedIn: boolean;
}
interface UserState {
  user: User;
}
const initialState: UserState = {
  user: {
    email: '',
    password: '',
    loggedIn: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Partial<User>>) {
      state.user.email = action.payload.email || '';
      state.user.password = action.payload.password || '';
      state.user.loggedIn = true;
    },
  },
});

export const { login } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectLoggedIn = createSelector(selectUser, user => user.user.loggedIn);

export default userSlice.reducer;
