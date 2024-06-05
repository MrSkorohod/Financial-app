import { getErrorMessageByCode } from '@/errorCodes';
import { registerThunk } from '@/lib/actionThunks/registerUser';
import { signInThunk } from '@/lib/actionThunks/signInUser';
import { signOutThunk } from '@/lib/actionThunks/signOutUser';
import { RootState } from '@/lib/store';
import { AuthToken } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null as AuthToken,
    loading: false,
    error: false,
    errorMessage: '',
    success: false,
    isSignIn: false,
  },
  reducers: {
    setPersistenceSignIn(state, action) {
      state.isSignIn = true;
      state.token = action.payload || '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.isSignIn = false;
        state.error = false;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.token = '';
        state.error = true;
        state.isSignIn = false;
        state.errorMessage = getErrorMessageByCode(action.payload);
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.uid || '';
        state.isSignIn = true;
        state.error = false;
      });

    builder
      .addCase(signOutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOutThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignIn = action.payload;
        state.token = '';
      })
      .addCase(signOutThunk.rejected, (state, action) => {
        state.loading = false;
        state.token = '';
        state.error = true;
        state.isSignIn = false;
        state.errorMessage = getErrorMessageByCode(action.payload);
      });
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.token = action.payload.uid || '';
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.token = '';
        state.error = true;
        state.isSignIn = false;
        state.errorMessage = getErrorMessageByCode(action.payload);
      });
  },
});

export const { setPersistenceSignIn } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsAuthenticated = (state: RootState) => {
  const token = state.auth.token;
  return token === null ? null : !!token;
};
