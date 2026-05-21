import { describe, test, expect, vi, beforeEach } from 'vitest';
import { createBookingApi, deleteBookingApi } from '../booking.service';
import apiClient from '../../lib/axios';

vi.mock('../../lib/axios', () => {
  return {
    default: {
      post: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe('booking.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('createBookingApi - success', async () => {
    const payload = {
      room_id: 1,
      user_name: 'testuser',
      title: 'Sync',
      start_time: '2026-05-21 14:00:00',
      end_time: '2026-05-21 15:00:00',
    };
    const mockBooking = { id: 101, ...payload };
    const mockResponse = { data: { data: mockBooking } };
    
    vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse);

    const result = await createBookingApi(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/bookings', payload);
    expect(result).toEqual(mockBooking);
  });

  test('deleteBookingApi - success', async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: null });

    await deleteBookingApi(101);

    expect(apiClient.delete).toHaveBeenCalledWith('/bookings/101');
  });
});
