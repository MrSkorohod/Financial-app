'use client';
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

export default function LoginProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const route = useRouter();

  useLayoutEffect(() => {
    if (isAuthenticated) {
      route.replace('/');
    }
  }, [isAuthenticated, route]);

  return isAuthenticated || isAuthenticated === null ? <></> : children;
}
