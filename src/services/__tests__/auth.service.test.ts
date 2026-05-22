import { describe, test, expect, vi, beforeEach } from 'vitest';
import { loginApi } from '../auth.service';
import apiClient from '../../lib/axios';

vi.mock('../../lib/axios', () => {
  return {
    default: {
      post: vi.fn(),
    },
  };
});

describe('auth.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loginApi - success', async () => {
    const mockResponse = { data: { token: 'mock-token', type: 'Bearer' } };
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    const result = await loginApi('test@example.com', 'password123');

    expect(apiClient.post).toHaveBeenCalledWith('/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result).toEqual({ token: 'mock-token', type: 'Bearer' });
  });

  test('loginApi - failure', async () => {
    const mockError = new Error('Invalid credentials');
    vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);

    await expect(loginApi('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
  });
});
