import apiClient from '../lib/axios';
import type { AuthUser } from '../types';

export interface LoginResponse {
  token: string;
  type: string;
  user: AuthUser;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/login', {
    email,
    password,
  });
  return response.data;
};
