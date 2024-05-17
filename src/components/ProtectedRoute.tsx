'use client';
import useAuth from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectRouteProps {
  children: React.ReactNode;
  permissionRule?: () => boolean;
}
//TODO Add more pages
const publicPages = ['/'];

export default function ProtectedRoute({
  children,
  permissionRule,
}: ProtectRouteProps) {
  const { user } = useAuth();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    //TODO Add more specific rules

    const isAllowed = permissionRule ? permissionRule() : true;
    if (user || publicPages.includes(pathname) || isAllowed) return;
    route.replace('/');
  }, [user, route, pathname, permissionRule]);

  return permissionRule && permissionRule() ? children : <></>;
}
