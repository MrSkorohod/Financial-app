'use client';
import { auth } from '@/firebase.config';
import { registerThunk } from '@/lib/actionThunks/registerUser';
import { signInThunk } from '@/lib/actionThunks/signInUser';
import { signOutThunk } from '@/lib/actionThunks/signOutUser';
import { setPersistenceSignIn } from '@/lib/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

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
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatch(setPersistenceSignIn(user.uid));
      } else {
        setUser(null);
        dispatch(setPersistenceSignIn(''));
      }
    });

    if (error) {
      toast.warn('Error!');
    }

    return () => unsubscribe();
  }, [dispatch, route, error]);

  async function logIn(email: string, password: string): Promise<void> {
    dispatch(signInThunk({ email, password }));
  }

  async function registerUser(email: string, password: string): Promise<void> {
    dispatch(registerThunk({ email, password }));
  }

  function logOut(): void {
    dispatch(signOutThunk());
  }

  return (
    <AuthContext.Provider value={{ user, logIn, registerUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
