import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchRoomsApi, fetchBookingsByRoomApi } from '../room.service';
import apiClient from '../../lib/axios';

vi.mock('../../lib/axios', () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe('room.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetchRoomsApi - success', async () => {
    const mockRooms = [{ id: 1, name: 'Room A', capacity: 10, amenities: [] }];
    const mockResponse = { data: { data: mockRooms } };
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const result = await fetchRoomsApi();

    expect(apiClient.get).toHaveBeenCalledWith('/rooms');
    expect(result).toEqual(mockRooms);
  });

  test('fetchBookingsByRoomApi - success', async () => {
    const mockBookings = [
      { id: 101, room_id: 1, user_name: 'user', start_time: '2026-05-21 14:00:00', end_time: '2026-05-21 15:00:00' },
    ];
    const mockResponse = { data: { data: mockBookings } };
    vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

    const result = await fetchBookingsByRoomApi(1);

    expect(apiClient.get).toHaveBeenCalledWith('/rooms/1/bookings');
    expect(result).toEqual(mockBookings);
  });
});
