import { selectCurrentUser } from '@/lib/features/auth/authSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useAuth() {
  const user = useSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
}
