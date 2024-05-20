import axios from 'axios';

import { apiUrl } from './utils';

interface User {}

export async function getUser(userId: string): Promise<User> {
  try {
    const user = await axios.get(`${apiUrl}/users/${userId}`);
    if (!user) {
      throw new Error('User does not exist');
    }
    return user;
  } catch (error) {
    console.error(error);
    return {} as User;
  }
}

export async function createUser(userId: string, user: User): Promise<void> {
  try {
    await axios.post(`${apiUrl}/users/${userId}`, user);
  } catch (error) {
    console.error(error);
  }
}
