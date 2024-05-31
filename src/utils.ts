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

export const maxEmailLength = 50;
export const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const minPasswordLength = 6;
