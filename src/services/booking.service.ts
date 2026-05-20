import apiClient from '../lib/axios';
import type { Booking } from '../types';

export interface CreateBookingPayload {
  room_id: number;
  user_name: string;
  start_time: string; // "YYYY-MM-DD HH:mm:ss"
  end_time: string;   // "YYYY-MM-DD HH:mm:ss"
}

export const createBookingApi = async (payload: CreateBookingPayload): Promise<Booking> => {
  const response = await apiClient.post<{ data: Booking }>('/bookings', payload);
  return response.data.data;
};

export const deleteBookingApi = async (id: number): Promise<void> => {
  await apiClient.delete(`/bookings/${id}`);
};
