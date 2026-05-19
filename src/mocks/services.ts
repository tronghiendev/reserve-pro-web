import type { Room, Booking, AuthUser } from '../types';
import { MOCK_ROOMS, MOCK_BOOKINGS, MOCK_USERS } from './data';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Keep bookings in a mutable local copy in this module to persist edits during session
let bookings: Booking[] = [...MOCK_BOOKINGS];

export const fetchRooms = async (): Promise<Room[]> => {
  await delay(800);
  return [...MOCK_ROOMS];
};

export const fetchBookingsByRoom = async (roomId: string): Promise<Booking[]> => {
  await delay(600);
  return bookings.filter((b) => b.roomId === roomId);
};

export const createBooking = async (payload: Omit<Booking, 'id'>): Promise<Booking> => {
  await delay(1000);
  const newBooking: Booking = {
    ...payload,
    id: `booking-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  };
  bookings.push(newBooking);
  return newBooking;
};

export const deleteBooking = async (id: string): Promise<void> => {
  await delay(500);
  bookings = bookings.filter((b) => b.id !== id);
};

export const loginUser = async (username: string, password: string): Promise<AuthUser | null> => {
  await delay(800);
  const found = MOCK_USERS.find((u) => u.username === username && u.password === password);
  if (found) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = found; // exclude password
    return user;
  }
  return null;
};
