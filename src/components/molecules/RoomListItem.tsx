import React from 'react';
import { Tag } from 'antd';
import type { Room } from '../../types';
import { RoomIcon } from '../atoms/RoomIcon';
import styles from './RoomListItem.module.css';

interface RoomListItemProps {
  room: Room;
  active: boolean;
  onClick: () => void;
}

export const RoomListItem: React.FC<RoomListItemProps> = ({ room, active, onClick }) => {
  const isInUse = room.is_in_use;

  return (
    <div
      onClick={onClick}
      className={`${styles.item} ${active ? styles.itemActive : ''}`}
    >
      <div className={styles.itemInfo}>
        <RoomIcon active={active} />
        <div className={styles.textContainer}>
          <span className={`${styles.itemName} ${active ? styles.itemNameActive : ''}`}>
            {room.name}
          </span>
          <span className={styles.itemCapacity}>
            {room.capacity} seats
          </span>
        </div>
      </div>
      
      <Tag
        color={isInUse ? 'error' : 'success'}
        className={styles.statusTag}
      >
        {isInUse ? 'In Use' : 'Available'}
      </Tag>
    </div>
  );
};

export default RoomListItem;
