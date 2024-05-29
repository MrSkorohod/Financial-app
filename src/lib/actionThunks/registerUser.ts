import { auth } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface UserData {
  email: string;
  password: string;
}

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const registerThunk = createAsyncThunk<
  { uid: string },
  UserData,
  {
    rejectValue: ValidationErrors;
  }
>('auth/register', async (userData, { rejectWithValue }) => {
  const { email, password } = userData;
  const result = await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return { uid: user.uid };
    })
    .catch((error) => {
      return rejectWithValue(error.response.data);
    });
  return result;
});
