import { CommonErrorCode, FirebaseErrorCode } from '@/errorCodes';
import { auth } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';

export const signOutThunk = createAsyncThunk<
  boolean,
  void,
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('auth/sign-out', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return false;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code as FirebaseErrorCode);
    }
    return rejectWithValue(CommonErrorCode.UnexpectedErr);
  }
});
