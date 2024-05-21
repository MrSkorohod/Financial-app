export const apiUrl = 'http://localhost:3001';

export interface User {
  id: string;
  name: string;
  email: string;
  authToken?: string;
}

export interface Account {
  id: string;
  value: number;
  name: string;
}
