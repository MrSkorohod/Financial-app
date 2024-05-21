'use client';
import useAuth from '@/hooks/useAuth';
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
  const { user } = useAuth();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(user);
    if (user || permissionRule) return;
    route.replace('/');
  }, [user, route, pathname, permissionRule]);

  return permissionRule ? children : <></>;
}
