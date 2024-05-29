import { auth } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signOut } from 'firebase/auth';

// interface ValidationErrors {
//   errorMessage: string;
//   field_errors: Record<string, string>;
// }

export const signOutThunk = createAsyncThunk(
  'auth/sign-out',
  async (_, { rejectWithValue }) => {
    const result = await signOut(auth)
      .then(() => {
        return false;
      })
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
    return result;
  }
);
