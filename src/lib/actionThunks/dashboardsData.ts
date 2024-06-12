import { CommonErrorCode, FirebaseErrorCode } from '@/errorCodes';
import { db } from '@/firebase.config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

interface DashboardData {
  name: string;
  cash: number;
  uid: string;
}

export const getDashboardsDataThunk = createAsyncThunk<
  DashboardData[],
  { uid: string },
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('users/get-dashboard', async (userUid, { rejectWithValue }) => {
  const { uid } = userUid;
  try {
    const docCollection = await getDocs(
      collection(db, 'users', uid, 'dashboards')
    );
    const result = docCollection.docs.map((item) => ({
      ...item.data(),
      uid: item.id,
    }));
    return result as DashboardData[];
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code as FirebaseErrorCode);
    }
    return rejectWithValue(CommonErrorCode.UnexpectedErr);
  }
});

export const createDashboardDataThunk = createAsyncThunk<
  { uid: string } & DashboardData,
  { uid: string } & DashboardData,
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('users/set-dashboard', async (dashboardData, { rejectWithValue }) => {
  const { uid, cash, name } = dashboardData;

  try {
    const docDashboard = doc(collection(db, 'users', uid, 'dashboards'));
    await setDoc(docDashboard, {
      cash,
      name,
    });
    return { uid: docDashboard.id, cash, name };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code as FirebaseErrorCode);
    }
    return rejectWithValue(CommonErrorCode.UnexpectedErr);
  }
});

export const deleteDashboardDataThunk = createAsyncThunk<
  { dashboardUid: string },
  { userUid: string; dashboardUid: string },
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('users/delete-dashboard', async (uidsData, { rejectWithValue }) => {
  const { userUid, dashboardUid } = uidsData;
  try {
    const docDashboard = doc(db, 'users', userUid, 'dashboards', dashboardUid);
    await deleteDoc(docDashboard);
    return { dashboardUid };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code as FirebaseErrorCode);
    }
    return rejectWithValue(CommonErrorCode.UnexpectedErr);
  }
});
