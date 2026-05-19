import React from 'react';
import { Typography, theme } from 'antd';
import { useRooms } from '../../hooks/useRooms';
import { useUI } from '../../contexts/UIContext';
import { RoomListItem } from '../molecules/RoomListItem';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

const { Title, Text } = Typography;
const { useToken } = theme;

export const RoomSidebar: React.FC = () => {
  const { token } = useToken();
  const { data: rooms, isLoading, isError } = useRooms();
  const { selectedRoomId, selectRoom } = useUI();

  return (
    <div
      style={{
        padding: `${token.paddingLG}px ${token.padding}px`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: `${token.padding}px`,
        background: token.colorBgContainer,
      }}
    >
      <div>
        <Title level={4} style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>
          Rooms
        </Title>
        <Text type="secondary" style={{ fontSize: '13px' }}>
          Select a room to view schedules
        </Text>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', marginRight: '-8px', paddingRight: '8px' }}>
        {isLoading && <LoadingSpinner tip="Loading rooms..." />}
        
        {isError && (
          <Text type="danger" style={{ display: 'block', padding: '16px 0', textAlign: 'center' }}>
            Failed to load rooms.
          </Text>
        )}

        {!isLoading && !isError && rooms && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {rooms.map((room) => (
              <RoomListItem
                key={room.id}
                room={room}
                active={selectedRoomId === room.id}
                onClick={() => selectRoom(room.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
