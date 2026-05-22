import apiClient from '../lib/axios';

export interface LoginResponse {
  token: string;
  type: string;
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/login', {
    email,
    password,
  });
  return response.data;
};
