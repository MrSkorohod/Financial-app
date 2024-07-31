import { apiSlice } from '@/lib/features/api/apiSlice';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
// import dashboardReducer from './features/dashboards/dashboardsSlice';
import { dashboardsApi } from './features/dashboards/dashboards';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [dashboardsApi.reducerPath]: dashboardsApi.reducer,
      auth: authReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(dashboardsApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
