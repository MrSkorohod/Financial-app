import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import useLocalStorage from './useLocalStorage';
//This hook need for store user in context and used only in AuthContext

//TODO replace this
export interface User {
  id: string;
  name: string;
  email: string;
  authToken?: string;
}

export default function useUser() {
  const { user } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  function addUser(user: User) {
    setItem('user', JSON.stringify(user));
  }

  function removeUser() {
    setItem('user', '');
  }

  return { user, addUser, removeUser };
}
