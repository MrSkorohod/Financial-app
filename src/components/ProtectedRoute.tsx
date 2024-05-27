'use client';
import { selectIsAuthenticated } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && permissionRule) return;
  }, [isAuthenticated, route, pathname, permissionRule, dispatch]);

  return isAuthenticated && permissionRule ? children : <></>;
}
