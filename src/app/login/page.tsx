'use client';
import ErrorAlert from '@/components/error-alert/ErrorAlert';
import LoginProtectedRoute from '@/components/protected-routes/LoginProtectedRoute';
import SignInForm from '@/components/signInForm/SignInForm';
import { useAppSelector } from '@/lib/hooks';
import { Box, CircularProgress } from '@mui/material';

export default function Login() {
  const { loading } = useAppSelector((state) => state.auth);

  return (
    <LoginProtectedRoute>
      <Box sx={{ position: 'relative' }}>
        <ErrorAlert />
        <Box
          sx={{
            margin: '100px auto',
            opacity: loading ? 0.6 : 1,
          }}
        >
          <SignInForm />
        </Box>
        {loading && (
          <CircularProgress
            size={'64px'}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-24px',
              marginLeft: '-24px',
            }}
          />
        )}
      </Box>
    </LoginProtectedRoute>
  );
}
