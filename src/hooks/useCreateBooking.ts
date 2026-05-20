import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookingApi } from '../services/booking.service';
import { useUI } from '../contexts/UIContext';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { selectedRoomId } = useUI();

  return useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      // Invalidate specific room bookings query
      if (selectedRoomId !== null) {
        queryClient.invalidateQueries({ queryKey: ['bookings', selectedRoomId] });
      }
    },
  });
};
