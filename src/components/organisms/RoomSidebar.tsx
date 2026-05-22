import React from 'react';
import { Typography } from 'antd';
import { useRooms } from '../../hooks/useRooms';
import { useUI } from '../../contexts/UIContext';
import { RoomListItem } from '../molecules/RoomListItem';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import styles from './RoomSidebar.module.css';

const { Title, Text } = Typography;

export const RoomSidebar: React.FC = () => {
  const { data: rooms, isLoading, isError } = useRooms();
  const { selectedRoomId, selectRoom } = useUI();

  return (
    <div className={styles.container}>
      {/* Sidebar Header */}
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          Meeting Rooms
        </Title>
      </div>


      {/* Rooms List Section */}
      <div className={styles.listScroll}>
        {isLoading && <LoadingSpinner tip="Loading rooms..." />}

        {isError && (
          <Text type="danger" style={{ display: 'block', padding: '16px 0', textAlign: 'center' }}>
            Failed to load rooms.
          </Text>
        )}

        {!isLoading && !isError && rooms && (
          <div className={styles.listContainer}>
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

export default RoomSidebar;
