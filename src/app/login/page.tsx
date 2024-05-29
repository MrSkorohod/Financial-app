'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import SignInForm from '@/components/signInForm/SignInForm';
import { Box } from '@mui/material';

export default function Login() {
  return (
    <ProtectedRoute>
      <Box
        sx={{
          margin: '100px auto',
        }}
      >
        <SignInForm />
      </Box>
    </ProtectedRoute>
  );
}
