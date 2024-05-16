import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import useUser, { User } from './useUser';

export default function useAuth() {
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem('user');
    if (user) {
      addUser(JSON.parse(user));
    }
  }, [addUser, getItem]);

  function login(user: User) {
    addUser(user);
    setItem('user', JSON.stringify(user));
  }

  function logout() {
    removeUser();
    setItem('user', '');
  }

  return { user, login, logout, setUser };
}
