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
  updateDoc,
  orderBy,
  query,
} from 'firebase/firestore';

interface DashboardData {
  name: string;
  cash: number;
  uid: string;
  dateCreated: Date | string;
}

export const getDashboardsDataThunk = createAsyncThunk<
  DashboardData[],
  { uid: string },
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('users/get-dashboards', async (userUid, { rejectWithValue }) => {
  const { uid } = userUid;
  try {
    const collectionData = query(
      collection(db, 'users', uid, 'dashboards'),
      orderBy('dateCreated', 'asc')
    );
    const docCollection = await getDocs(collectionData);

    const result = docCollection.docs.map((item) => ({
      ...item.data(),
      dateCreated: item.data().dateCreated.toDate().toString(),
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
  DashboardData,
  { userUid: string; cash: number; name: string },
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('users/create-dashboard', async (dashboardData, { rejectWithValue }) => {
  const { userUid, cash, name } = dashboardData;

  try {
    const docDashboard = doc(collection(db, 'users', userUid, 'dashboards'));
    await setDoc(docDashboard, {
      cash,
      name,
      dateCreated: new Date(),
    });
    return { uid: docDashboard.id, cash, name, dateCreated: new Date() };
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

export const editDashboardDataThunk = createAsyncThunk<
  DashboardData,
  { userUid: string } & DashboardData,
  {
    rejectValue: FirebaseErrorCode | CommonErrorCode;
  }
>('users/edit-dashboard', async (dashboardData, { rejectWithValue }) => {
  const { userUid, uid, cash, name } = dashboardData;
  try {
    const docDashboard = doc(db, 'users', userUid, 'dashboards', uid);
    await updateDoc(docDashboard, {
      cash,
      name,
      dateCreated: new Date(),
    });
    return dashboardData;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return rejectWithValue(error.code as FirebaseErrorCode);
    }
    return rejectWithValue(CommonErrorCode.UnexpectedErr);
  }
});
