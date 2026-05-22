import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDeleteBooking } from '../useDeleteBooking';
import { deleteBookingApi } from '../../services/booking.service';
import { UIProvider, useUI } from '../../contexts/UIContext';

vi.mock('../../services/booking.service', () => ({
  deleteBookingApi: vi.fn(),
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

describe('useDeleteBooking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls deleteBookingApi on mutate', async () => {
    vi.mocked(deleteBookingApi).mockResolvedValue(undefined);

    const { wrapper } = createWrapper(5);
    const { result } = renderHook(() => useDeleteBooking(), { wrapper });

    result.current.mutate(42);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(vi.mocked(deleteBookingApi).mock.calls[0][0]).toBe(42);
  });

  it('invalidates bookings queries for active room on success', async () => {
    vi.mocked(deleteBookingApi).mockResolvedValue(undefined);

    const { wrapper, queryClient } = createWrapper(12);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useDeleteBooking(), { wrapper });

    result.current.mutate(42);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['bookings', 12] });
  });
});
