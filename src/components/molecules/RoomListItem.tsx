import React from 'react';
import { theme } from 'antd';
import type { Room } from '../../types';
import { RoomIcon } from '../atoms/RoomIcon';
import { CapacityBadge } from '../atoms/CapacityBadge';

const { useToken } = theme;

interface RoomListItemProps {
  room: Room;
  active: boolean;
  onClick: () => void;
}

export const RoomListItem: React.FC<RoomListItemProps> = ({ room, active, onClick }) => {
  const { token } = useToken();

  const activeStyle: React.CSSProperties = {
    background: token.colorPrimary,
    color: token.colorWhite,
  };

  const inactiveStyle: React.CSSProperties = {
    background: 'transparent',
    color: token.colorTextBase,
  };

  return (
    <div
      onClick={onClick}
      className="roomItem"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${token.paddingSM}px ${token.padding}px`,
        margin: '4px 0',
        borderRadius: `${token.borderRadius}px`,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(active ? activeStyle : inactiveStyle),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: `${token.paddingSM}px`, overflow: 'hidden' }}>
        <RoomIcon active={active} />
        <span
          style={{
            fontWeight: active ? 600 : 500,
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {room.name}
        </span>
      </div>
      <CapacityBadge capacity={room.capacity} active={active} />
    </div>
  );
};
