import { useQuery } from '@tanstack/react-query';
import { fetchBookingsByRoomApi } from '../services/room.service';

export const useBookings = (roomId: number | null) => {
  return useQuery({
    queryKey: ['bookings', roomId],
    queryFn: () => fetchBookingsByRoomApi(roomId!),
    enabled: !!roomId,
  });
};
