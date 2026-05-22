import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCreateBooking } from '../useCreateBooking';
import { createBookingApi } from '../../services/booking.service';
import { UIProvider, useUI } from '../../contexts/UIContext';

vi.mock('../../services/booking.service', () => ({
  createBookingApi: vi.fn(),
}));

const ContextSetter: React.FC<{ selectedRoomId: number | null; children: React.ReactNode }> = ({ selectedRoomId, children }) => {
  const { selectRoom } = useUI();
  React.useEffect(() => {
    if (selectedRoomId !== null) {
      selectRoom(selectedRoomId);
    }
  }, [selectedRoomId, selectRoom]);
  return <>{children}</>;
};

const createWrapper = (selectedRoomId: number | null = null) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <UIProvider>
          <ContextSetter selectedRoomId={selectedRoomId}>{children}</ContextSetter>
        </UIProvider>
      </QueryClientProvider>
    );
  };
  return { wrapper, queryClient };
};

describe('useCreateBooking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls createBookingApi on mutate', async () => {
    const mockBookingParams = {
      room_id: 5,
      user_name: 'test',
      start_time: '2026-05-21 10:00:00',
      end_time: '2026-05-21 11:00:00',
      title: 'Lunch meeting',
    };
    vi.mocked(createBookingApi).mockResolvedValue({ id: 99, ...mockBookingParams });

    const { wrapper } = createWrapper(5);
    const { result } = renderHook(() => useCreateBooking(), { wrapper });

    result.current.mutate(mockBookingParams);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(vi.mocked(createBookingApi).mock.calls[0][0]).toEqual(mockBookingParams);
  });

  it('invalidates bookings queries for active room on success', async () => {
    const mockBookingParams = {
      room_id: 12,
      user_name: 'test',
      start_time: '2026-05-21 10:00:00',
      end_time: '2026-05-21 11:00:00',
      title: 'Lunch meeting',
    };
    vi.mocked(createBookingApi).mockResolvedValue({ id: 99, ...mockBookingParams });

    const { wrapper, queryClient } = createWrapper(12);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useCreateBooking(), { wrapper });

    result.current.mutate(mockBookingParams);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['bookings', 12] });
  });
});
