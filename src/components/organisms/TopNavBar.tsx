import React from 'react';
import { Layout, Avatar, Button, Space, Typography, theme } from 'antd';
import { BookOutlined, LogoutOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useResponsive } from '../../hooks/useResponsive';

const { Header } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;

export const TopNavBar: React.FC = () => {
  const { token } = useToken();
  const { user, logout } = useAuth();
  const { showUsername, isMobile } = useResponsive();

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? `0 ${token.padding}px` : `0 ${token.paddingLG}px`,
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorder}`,
        height: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Left: Brand Logo & Title */}
      <Space size={token.paddingXS} style={{ cursor: 'pointer' }}>
        <BookOutlined style={{ fontSize: '24px', color: token.colorPrimary }} />
        <Title
          level={3}
          style={{
            margin: 0,
            color: token.colorPrimary,
            fontWeight: 700,
            fontSize: isMobile ? '20px' : '24px',
            letterSpacing: '-0.02em',
          }}
        >
          ReservePro
        </Title>
      </Space>

      {/* Right: Actions / User Profile */}
      <Space size={isMobile ? 'small' : 'middle'}>
        {!isMobile && (
          <>
            <Button type="text" shape="circle" icon={<BellOutlined />} />
            <Button type="text" shape="circle" icon={<QuestionCircleOutlined />} />
          </>
        )}

        {user && (
          <Space size={token.paddingXS}>
            <Avatar alt={user.name} style={{ border: `1px solid ${token.colorBorder}` }}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            {showUsername && (
              <>
                <Text style={{ fontWeight: 600, color: token.colorTextBase }}>
                  {user.name}
                </Text>
                <span style={{ color: token.colorBorder, margin: '0 4px' }}>|</span>
                <Button
                  type="text"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={logout}
                  style={{ fontWeight: 500 }}
                >
                  Logout
                </Button>
              </>
            )}

            {!showUsername && (
              <Button
                type="text"
                danger
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={logout}
              />
            )}
          </Space>
        )}
      </Space>
    </Header>
  );
};
