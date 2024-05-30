'use client';

import SignInForm from '@/components/signInForm/SignInForm';
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const route = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      route.replace('/');
    }
  }, [isAuthenticated, route]);

  return (
    <Box
      sx={{
        margin: '100px auto',
      }}
    >
      <SignInForm />
    </Box>
  );
}
