import { auth } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface UserData {
  email: string;
  password: string;
}

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const signInThunk = createAsyncThunk<
  { uid: string },
  UserData,
  {
    rejectValue: ValidationErrors;
  }
>('auth/sign-in', async (userData, { rejectWithValue }) => {
  const { email, password } = userData;
  const result = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return { uid: user.uid };
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
  return result;
});
