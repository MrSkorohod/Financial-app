import {
  getDashboardsDataThunk,
  createDashboardDataThunk,
  deleteDashboardDataThunk,
  editDashboardDataThunk,
} from '@/lib/actionThunks/dashboardsData';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { getErrorMessageByCode } from '@/errorCodes';

export interface DashboardData {
  name: string;
  cash: number;
  uid: string;
  dateCreated: Date | string;
}

const dashboardsSlice = createSlice({
  name: 'dashboards',
  initialState: {
    dashboards: [] as DashboardData[],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardsDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardsDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessageByCode(action.payload);
      })
      .addCase(getDashboardsDataThunk.fulfilled, (state, action) => {
        state.dashboards = action.payload;
        state.loading = false;
      });
    builder
      .addCase(createDashboardDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDashboardDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessageByCode(action.payload);
      })
      .addCase(createDashboardDataThunk.fulfilled, (state, action) => {
        state.dashboards.push(action.payload);
        state.loading = false;
      });
    builder
      .addCase(deleteDashboardDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDashboardDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessageByCode(action.payload);
      })
      .addCase(deleteDashboardDataThunk.fulfilled, (state, action) => {
        state.dashboards = state.dashboards.filter(
          (item) => item.uid !== action.payload.dashboardUid
        );
        state.loading = false;
      });
    builder
      .addCase(editDashboardDataThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDashboardDataThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = getErrorMessageByCode(action.payload);
      })
      .addCase(editDashboardDataThunk.fulfilled, (state, action) => {
        state.dashboards = [
          ...state.dashboards.filter((item) => item.uid !== action.payload.uid),
          action.payload,
        ];
        state.loading = false;
      });
  },
});

export default dashboardsSlice.reducer;
export const getDashboards = (state: RootState) => state.dashboards.dashboards;
