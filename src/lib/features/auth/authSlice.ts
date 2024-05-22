import { RootState } from '@/lib/store';
import { AuthToken } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null as AuthToken,
  },
  reducers: {
    login: (state, { payload: token }: PayloadAction<AuthToken>) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
