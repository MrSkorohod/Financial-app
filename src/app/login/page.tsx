'use client';
import LoginProtectedRoute from '@/components/protected-routes/LoginProtectedRoute';
import SignInForm from '@/components/signInForm/SignInForm';
import { Box } from '@mui/material';

export default function Login() {
  return (
    <LoginProtectedRoute>
      <Box
        sx={{
          margin: '100px auto',
        }}
      >
        <SignInForm />
      </Box>
    </LoginProtectedRoute>
  );
}
