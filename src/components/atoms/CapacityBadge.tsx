import React from 'react';
import { Tag, theme } from 'antd';

const { useToken } = theme;

interface CapacityBadgeProps {
  capacity: number;
  active?: boolean;
}

export const CapacityBadge: React.FC<CapacityBadgeProps> = ({ capacity, active = false }) => {
  const { token } = useToken();

  return (
    <Tag
      variant="filled"
      style={{
        margin: 0,
        backgroundColor: active ? 'rgba(255, 255, 255, 0.2)' : token.colorFillContent,
        color: active ? token.colorWhite : token.colorTextSecondary,
        fontWeight: 500,
        fontSize: '11px',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
      }}
    >
      Cap: {capacity}
    </Tag>
  );
};
