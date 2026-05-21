import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../LoginForm';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('LoginForm', () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: mockLogin,
      logout: vi.fn(),
      loading: false,
    });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders login form elements', () => {
    render(
      <App>
        <LoginForm />
      </App>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields on submit', async () => {
    render(
      <App>
        <LoginForm />
      </App>
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter your email')).toBeInTheDocument();
      expect(screen.getByText('Please enter your password')).toBeInTheDocument();
    });
  });

  it('calls login on form submission with valid values', async () => {
    mockLogin.mockResolvedValue(true);

    render(
      <App>
        <LoginForm />
      </App>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'password123');
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });

  it('displays alert error when login API throws an error', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials.'));

    render(
      <App>
        <LoginForm />
      </App>
    );

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
    });
  });
});
