import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookingApi } from '../services/booking.service';
import { useUI } from '../contexts/UIContext';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { selectedRoomId } = useUI();

  return useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      // Invalidate specific room bookings query
      if (selectedRoomId !== null) {
        queryClient.invalidateQueries({ queryKey: ['bookings', selectedRoomId] });
      }
    },
  });
};
