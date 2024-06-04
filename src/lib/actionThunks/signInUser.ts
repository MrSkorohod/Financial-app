import { FirebaseErrorCode } from '@/errorCodes';
import { auth } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface UserData {
  email: string;
  password: string;
}

export const signInThunk = createAsyncThunk<
  { uid: string },
  UserData,
  {
    rejectValue: FirebaseErrorCode;
  }
>('auth/sign-in', async (userData, { rejectWithValue }) => {
  const { email, password } = userData;

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { uid: result.user.uid };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code as FirebaseErrorCode);
    }
    return { uid: '' };
  }
});
