'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase-config';
import { login } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  const route = useRouter();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      storeRef.current?.dispatch(login(user.uid));
      return;
    } else {
      route.replace('/login');
    }
  });

  return <Provider store={storeRef.current}>{children}</Provider>;
}
