export interface User {
  uid: string;
  name: string;
  email: string;
}

export interface Account {
  id: string;
  value: number;
  name: string;
}

export type AuthToken = string | null;
