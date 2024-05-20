import axios from 'axios';

import { apiUrl } from './utils';

export interface Account {}

export async function getAccounts(): Promise<Account[]> {
  try {
    const accounts = await axios.get<Account[]>(`${apiUrl}/accounts`);
    if (accounts?.status < 200 || accounts?.status >= 300) {
      throw new Error('Status is not valid');
    }
    if (!accounts?.data?.length) {
      throw new Error('Accounts doesn`t exist');
    }
    return accounts?.data;
  } catch (error) {
    return [] as Account[];
  }
}
