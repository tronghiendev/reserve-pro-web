import { useQuery } from '@tanstack/react-query';
import { fetchBookingsByRoom } from '../mocks/services';

export const useBookings = (roomId: string | null) => {
  return useQuery({
    queryKey: ['bookings', roomId],
    queryFn: () => fetchBookingsByRoom(roomId!),
    enabled: !!roomId,
  });
};
