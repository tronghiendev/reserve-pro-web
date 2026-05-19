import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../mocks/services';
import { useUI } from '../contexts/UIContext';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { selectedRoomId } = useUI();

  return useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      // Invalidate specific room bookings query
      if (selectedRoomId) {
        queryClient.invalidateQueries({ queryKey: ['bookings', selectedRoomId] });
      }
    },
  });
};
