'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Typography } from '@mui/material';

export default function Account() {
  return (
    <ProtectedRoute permissionRule={() => false}>
      <Typography>Account Page</Typography>
    </ProtectedRoute>
  );
}
