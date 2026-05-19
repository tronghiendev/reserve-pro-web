import type { Room, Booking } from '../types';

export const MOCK_ROOMS: Room[] = [
  { id: 'room-1', name: 'Boardroom A',       capacity: 12 },
  { id: 'room-2', name: 'Studio 1',          capacity: 4  },
  { id: 'room-3', name: 'Focus Pod',         capacity: 2  },
  { id: 'room-4', name: 'Conference Room B', capacity: 20 },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    roomId: 'room-1',
    guestName: 'Emma Watson',
    startTime: '2026-05-19T09:00:00.000Z',
    endTime: '2026-05-19T11:00:00.000Z',
  },
  {
    id: 'booking-2',
    roomId: 'room-1',
    guestName: 'John Doe',
    startTime: '2026-05-19T13:00:00.000Z',
    endTime: '2026-05-19T14:30:00.000Z',
  },
  {
    id: 'booking-3',
    roomId: 'room-2',
    guestName: 'Jane Smith',
    startTime: '2026-05-19T10:00:00.000Z',
    endTime: '2026-05-19T12:00:00.000Z',
  },
];

export const MOCK_USERS = [
  {
    id: 'user-1',
    username: 'admin',
    password: 'admin123',
    displayName: 'Alex Johnson',
    avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex',
  },
];
