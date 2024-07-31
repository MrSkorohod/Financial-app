import { db } from '@/firebase.config';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  FieldValue,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { CommonErrorCode, FirebaseErrorCode } from '@/errorCodes';

export interface DashboardData {
  name: string;
  cash: number;
  uid: string;
  dateCreated: FieldValue | Timestamp;
}

export const dashboardsApi = createApi({
  reducerPath: 'dashboardsApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Dashboard'],
  endpoints: (build) => ({
    getDashboards: build.query<DashboardData[], string>({
      async queryFn(uid: string) {
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
          return { data: result as DashboardData[] };
        } catch (error) {
          if (error instanceof FirebaseError) {
            return { error: error.code as FirebaseErrorCode };
          }
          return { error: CommonErrorCode.UnexpectedErr };
        }
      },
      providesTags: ['Dashboard'],
    }),
    createDashboard: build.mutation<
      DashboardData,
      { userUid: string; cash: number; name: string }
    >({
      async queryFn({ userUid, cash, name }) {
        try {
          const docDashboard = doc(
            collection(db, 'users', userUid, 'dashboards')
          );
          const docData = {
            cash,
            name,
            dateCreated: serverTimestamp(),
          };
          await setDoc(docDashboard, docData);
          return {
            data: { uid: docDashboard.id, ...docData } as DashboardData,
          };
        } catch (error) {
          if (error instanceof FirebaseError) {
            return { error: error.code as FirebaseErrorCode };
          }
          return { error: CommonErrorCode.UnexpectedErr };
        }
      },
      invalidatesTags: ['Dashboard'],
    }),
    deleteDashboard: build.mutation<
      { dashboardUid: string },
      { userUid: string; dashboardUid: string }
    >({
      async queryFn({ userUid, dashboardUid }) {
        try {
          const docDashboard = doc(
            db,
            'users',
            userUid,
            'dashboards',
            dashboardUid
          );
          await deleteDoc(docDashboard);
          return { data: { dashboardUid } };
        } catch (error) {
          if (error instanceof FirebaseError) {
            return { error: error.code as FirebaseErrorCode };
          }
          return { error: CommonErrorCode.UnexpectedErr };
        }
      },
      invalidatesTags: ['Dashboard'],
    }),
    updateDashboard: build.mutation<
      DashboardData,
      { userUid: string } & Partial<DashboardData>
    >({
      async queryFn({ userUid, uid, cash, name }) {
        try {
          const docDashboard = doc(db, 'users', userUid, 'dashboards', uid!);
          await updateDoc(docDashboard, {
            cash,
            name,
            dateCreated: serverTimestamp(),
          });
          return { data: { uid, cash, name } as DashboardData };
        } catch (error) {
          if (error instanceof FirebaseError) {
            return { error: error.code as FirebaseErrorCode };
          }
          return { error: CommonErrorCode.UnexpectedErr };
        }
      },
      invalidatesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetDashboardsQuery,
  useCreateDashboardMutation,
  useDeleteDashboardMutation,
  useUpdateDashboardMutation,
} = dashboardsApi;
