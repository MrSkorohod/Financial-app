'use client';
import useUser from '@/hooks/useUser';
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
  const { user } = useUser();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user || permissionRule) return;
    route.replace('/');
  }, [user, route, pathname, permissionRule]);

  return permissionRule ? children : <></>;
}
