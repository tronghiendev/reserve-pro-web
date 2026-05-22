import { useQuery } from '@tanstack/react-query';
import { fetchRoomsApi } from '../services/room.service';
import { useUI } from '../contexts/UIContext';
import { useEffect } from 'react';

export const useRooms = () => {
  const { selectedRoomId, selectRoom } = useUI();

  const query = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRoomsApi,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Auto-select first room when rooms are loaded and no room is selected yet
  useEffect(() => {
    if (query.data && query.data.length > 0 && !selectedRoomId) {
      selectRoom(query.data[0].id);
    }
  }, [query.data, selectedRoomId, selectRoom]);

  return query;
};
