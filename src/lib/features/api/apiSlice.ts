import { Account, apiUrl } from '@/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getAccounts: builder.query<Account[], string>({
      query: () => '/accounts',
    }),
  }),
});

export const { useGetAccountsQuery } = apiSlice;
