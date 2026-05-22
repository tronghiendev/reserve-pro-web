import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookingCard } from '../BookingCard';
import { useAuth } from '../../../contexts/AuthContext';
import { useDeleteBooking } from '../../../hooks/useDeleteBooking';
import { App } from 'antd';

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../../../hooks/useDeleteBooking', () => ({
  useDeleteBooking: vi.fn(),
}));

describe('BookingCard', () => {
  const mockBooking = {
    id: 42,
    room_id: 10,
    user_id: 1,
    user_name: 'john_doe',
    start_time: '2026-05-21 10:00:00',
    end_time: '2026-05-21 11:00:00',
    title: 'Design Sync',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useDeleteBooking).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as unknown as ReturnType<typeof useDeleteBooking>);
  });

  it('renders booking host name and formatted date/time', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      loading: false,
    });

    render(
      <App>
        <BookingCard booking={mockBooking} />
      </App>
    );

    expect(screen.getByText('Reservation Host: john_doe')).toBeInTheDocument();
    expect(screen.getByText(/21\/05\/2026/)).toBeInTheDocument();
    expect(screen.getByText(/10:00 - 11:00/)).toBeInTheDocument();
  });

  it('does not render delete action if no user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      loading: false,
    });

    const { container } = render(
      <App>
        <BookingCard booking={mockBooking} />
      </App>
    );

    const deleteButton = container.querySelector('.ant-btn-dangerous');
    expect(deleteButton).toBeNull();
  });

  it('does not render delete action if logged in user is not the host', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 2, name: 'other_user', email: 'other@example.com' },
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      loading: false,
    });

    const { container } = render(
      <App>
        <BookingCard booking={mockBooking} />
      </App>
    );

    const deleteButton = container.querySelector('.ant-btn-dangerous');
    expect(deleteButton).toBeNull();
  });

  it('renders delete button if logged in user is the host', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 1, name: 'john_doe', email: 'john@example.com' },
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      loading: false,
    });

    const { container } = render(
      <App>
        <BookingCard booking={mockBooking} />
      </App>
    );

    const deleteButton = container.querySelector('.ant-btn-dangerous');
    expect(deleteButton).toBeInTheDocument();
  });
});
