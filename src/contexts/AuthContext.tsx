'use client';
import useAuth from '@/hooks/useAuth';
import { User } from '@/hooks/useUser';
import { PropsWithChildren, createContext, useContext } from 'react';

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
