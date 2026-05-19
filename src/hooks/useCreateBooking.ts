import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '../mocks/services';
import { useUI } from '../contexts/UIContext';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { selectedRoomId } = useUI();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      // Invalidate specific room bookings query
      if (selectedRoomId) {
        queryClient.invalidateQueries({ queryKey: ['bookings', selectedRoomId] });
      }
    },
  });
};
