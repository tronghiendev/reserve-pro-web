import apiClient from '../lib/axios';
import type { Room, Booking } from '../types';

export const fetchRoomsApi = async (): Promise<Room[]> => {
  const response = await apiClient.get<{ data: Room[] }>('/rooms');
  return response.data.data;
};

export const fetchBookingsByRoomApi = async (roomId: number): Promise<Booking[]> => {
  const response = await apiClient.get<{ data: Booking[] }>(`/rooms/${roomId}/bookings`);
  return response.data.data;
};
