import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { theme } from 'antd';

const { useToken } = theme;

interface RoomIconProps {
  active?: boolean;
}

export const RoomIcon: React.FC<RoomIconProps> = ({ active = false }) => {
  const { token } = useToken();

  return (
    <HomeOutlined
      style={{
        fontSize: '18px',
        color: active ? token.colorWhite : token.colorPrimary,
        transition: 'color 0.2s ease',
      }}
    />
  );
};
