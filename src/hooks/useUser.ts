import { selectUser } from '@/lib/features/user/userSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useUser() {
  const user = useSelector(selectUser);

  return useMemo(() => ({ user }), [user]);
}
