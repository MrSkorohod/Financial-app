'use client';
import { useGetAccountsQuery } from '@/lib/features/api/apiSlice';
import { CircularProgress, Typography } from '@mui/material';
import { QueryStatus } from '@reduxjs/toolkit/query';

export default function Account() {
  const { status, data: account } = useGetAccountsQuery('api');

  return (
    <>
      <Typography>Account Page</Typography>
      {status === QueryStatus.fulfilled ? (
        account?.map((item, idx) => {
          return <Typography key={idx}>{item.name}</Typography>;
        })
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
