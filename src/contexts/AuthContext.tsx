'use client';
import { auth } from '@/firebase.config';
import { registerThunk } from '@/lib/actionThunks/registerUser';
import { signInThunk } from '@/lib/actionThunks/signInUser';
import { signOutThunk } from '@/lib/actionThunks/signOutUser';
import { userDataThunk } from '@/lib/actionThunks/userData';
import { setPersistenceSignIn } from '@/lib/features/auth/authSlice';
import { useAppDispatch } from '@/lib/hooks';
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatch(setPersistenceSignIn(user.uid));
        dispatch(userDataThunk({ uid: user.uid }));
      } else {
        setUser(null);
        dispatch(setPersistenceSignIn(''));
      }
    });
    return () => unsubscribe();
  }, [dispatch, route]);

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
