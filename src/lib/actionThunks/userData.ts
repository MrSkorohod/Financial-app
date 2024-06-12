import { CommonErrorCode, FirebaseErrorCode } from '@/errorCodes';
import { db } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { doc, getDoc } from 'firebase/firestore';

interface UserInfo {
  name: string;
  uid: string;
  email: string;
}

export const userDataThunk = createAsyncThunk<
  UserInfo,
  { uid: string },
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('users/user-data', async ({ uid }, { rejectWithValue }) => {
  try {
    const result = (await getDoc(doc(db, 'users', uid))).data();
    return result as UserInfo;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code as FirebaseErrorCode);
    }
    return rejectWithValue(CommonErrorCode.UnexpectedErr);
  }
});
