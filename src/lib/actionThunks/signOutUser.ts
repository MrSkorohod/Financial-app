import { auth } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';

export const signOutThunk = createAsyncThunk(
  'auth/sign-out',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return false;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error);
      }
      return false;
    }
  }
);
