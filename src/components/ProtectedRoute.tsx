'use client';
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface ProtectRouteProps {
  children: React.ReactNode;
  permissionRule?: boolean;
}

export default function ProtectedRoute({
  children,
  permissionRule = true,
}: ProtectRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const route = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    console.log(pathname);
    if (isAuthenticated && pathname.includes('login')) {
      route.replace('/');
      return;
    }

    if (isAuthenticated && permissionRule) {
      return;
    }
    route.replace('/login');
  }, [isAuthenticated, route, pathname, permissionRule]);

  return children;
}
