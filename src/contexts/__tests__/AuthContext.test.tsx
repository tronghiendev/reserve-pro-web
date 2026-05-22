import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../AuthContext';
import { loginApi } from '../../services/auth.service';

vi.mock('../../services/auth.service', () => ({
  loginApi: vi.fn(),
}));

const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</div>
      <div data-testid="user-email">{user?.email || 'no-email'}</div>
      <button onClick={() => login('test@example.com', 'password123')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('provides unauthenticated state by default', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    expect(screen.getByTestId('user-email').textContent).toBe('no-email');
  });

  it('restores state from localStorage if user object is stored', () => {
    const mockUser = { id: 1, email: 'test@example.com', name: 'test' };
    localStorage.setItem('reserve_pro_user', JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    expect(screen.getByTestId('user-email').textContent).toBe('test@example.com');
  });

  it('successfully logs in, updates state, and sets localStorage', async () => {
    vi.mocked(loginApi).mockResolvedValue({ token: 'mock-token', type: 'Bearer' });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByText('Login');
    await act(async () => {
      loginBtn.click();
    });

    expect(loginApi).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    expect(screen.getByTestId('user-email').textContent).toBe('test@example.com');
    expect(localStorage.getItem('reserve_pro_token')).toBe('mock-token');
    expect(JSON.parse(localStorage.getItem('reserve_pro_user') || '{}')).toEqual({
      id: 1,
      email: 'test@example.com',
      name: 'test',
    });
  });

  it('clears state and localStorage on logout', () => {
    const mockUser = { id: 1, email: 'test@example.com', name: 'test' };
    localStorage.setItem('reserve_pro_user', JSON.stringify(mockUser));
    localStorage.setItem('reserve_pro_token', 'mock-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');

    const logoutBtn = screen.getByText('Logout');
    act(() => {
      logoutBtn.click();
    });

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    expect(localStorage.getItem('reserve_pro_user')).toBeNull();
    expect(localStorage.getItem('reserve_pro_token')).toBeNull();
  });

  it('throws error when useAuth is used outside AuthProvider', () => {
    // Suppress console.error for clean test logs
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within an AuthProvider');
    
    consoleSpy.mockRestore();
  });
});
