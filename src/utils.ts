export const apiUrl = 'http://localhost:3001';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Account {
  id: string;
  value: number;
  name: string;
}

export type AuthToken = string | null;
