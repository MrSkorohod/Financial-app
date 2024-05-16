'use client';
import useAuth from '@/hooks/useAuth';
import { User } from '@/hooks/useUser';
import { PropsWithChildren, createContext, useContext } from 'react';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const { user, setUser } = useAuth();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
