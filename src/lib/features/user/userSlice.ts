import { userDataThunk } from '@/lib/actionThunks/userData';
import { RootState } from '@/lib/store';
import { User } from '@/utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null,
  },
  reducers: {
    addUser: (state, { payload: user }: PayloadAction<User>) => {
      state.user = user;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userDataThunk.rejected, (state) => {
        state.user = null;
      })
      .addCase(userDataThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUserState = (state: RootState) => state.user;

export const selectUser = (state: RootState) => selectUserState(state).user;

export const selectUserName = (state: RootState) =>
  selectUser(state)?.name || '';

export const selectUserEmail = (state: RootState) =>
  selectUser(state)?.email || '';
