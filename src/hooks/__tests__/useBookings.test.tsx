import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBookings } from '../useBookings';
import { fetchBookingsByRoomApi } from '../../services/room.service';

vi.mock('../../services/room.service', () => ({
  fetchBookingsByRoomApi: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useBookings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not fetch bookings when roomId is null', () => {
    renderHook(() => useBookings(null), { wrapper: createWrapper() });
    expect(fetchBookingsByRoomApi).not.toHaveBeenCalled();
  });

  it('fetches bookings when roomId is provided', async () => {
    const mockBookings = [
      { id: 1, room_id: 10, title: 'Meeting 1', start_time: '2026-05-21 10:00:00', end_time: '2026-05-21 11:00:00', user_name: 'test' }
    ];
    vi.mocked(fetchBookingsByRoomApi).mockResolvedValue(mockBookings);

    const { result } = renderHook(() => useBookings(10), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(fetchBookingsByRoomApi).toHaveBeenCalledWith(10);
    expect(result.current.data).toEqual(mockBookings);
  });
});
