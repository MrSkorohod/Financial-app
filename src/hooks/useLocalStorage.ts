import { useState } from 'react';

//This hook need for store data in localHost and used only in AuthContext
export default function useLocalStorage() {
  const [value, setValue] = useState<string | null>(null);

  function setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    setValue(value);
  }

  function getItem(key: string) {
    const value = localStorage.getItem(key);
    setValue(value);
    return value;
  }

  function removeItem(key: string) {
    localStorage.removeItem(key);
    setValue(null);
  }

  return { value, setItem, getItem, removeItem };
}
