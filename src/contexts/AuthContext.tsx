'use client';
import { auth } from '@/firebase.config';
import { registerThunk } from '@/lib/actionThunks/registerUser';
import { signInThunk } from '@/lib/actionThunks/signInUser';
import { signOutThunk } from '@/lib/actionThunks/signOutUser';
import { getPersistenceSignIn } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CircularProgress } from '@mui/material';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const noop = () => {};

interface AuthContextType {
  user: User | null;
  logIn: (email: string, password: string) => void;
  registerUser: (email: string, password: string) => void;
  logOut: () => void;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  logIn: noop,
  registerUser: noop,
  logOut: noop,
});
export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const route = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatch(getPersistenceSignIn(user.uid));
      } else {
        setUser(null);
        route.replace('/login');
      }
    });

    return () => unsubscribe();
  }, [dispatch, route]);

  async function logIn(email: string, password: string): Promise<void> {
    dispatch(signInThunk({ email, password }));
    setUser(user);
  }

  async function registerUser(email: string, password: string): Promise<void> {
    dispatch(registerThunk({ email, password }));
    setUser(user);
  }

  function logOut(): void {
    dispatch(signOutThunk());
    route.replace('/login');
  }

  return (
    <AuthContext.Provider value={{ user, logIn, registerUser, logOut }}>
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};
