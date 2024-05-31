import { auth } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface UserData {
  email: string;
  password: string;
}

export const registerThunk = createAsyncThunk<
  { uid: string },
  UserData,
  {
    rejectValue: FirebaseError;
  }
>('auth/register', async (userData, { rejectWithValue }) => {
  const { email, password } = userData;

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { uid: result.user.uid };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error);
    }
    return { uid: '' };
  }
});
