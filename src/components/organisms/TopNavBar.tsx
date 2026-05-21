import React from 'react';
import { Layout, Avatar, Button, Typography, Input, Badge, Dropdown, Space } from 'antd';
import { AppstoreOutlined, BellOutlined, QuestionCircleOutlined, SearchOutlined, DownOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useResponsive } from '../../hooks/useResponsive';
import styles from './TopNavBar.module.css';

const { Header } = Layout;
const { Title, Text } = Typography;

export const TopNavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isMobile } = useResponsive();

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'logout') {
      logout();
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'My Profile',
      icon: <UserOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Header className={styles.header} style={{ padding: isMobile ? '0 16px' : '0 24px' }}>
      {/* Left: Brand Logo & Title */}
      <div className={styles.brandBox}>
        <Avatar
          size={36}
          icon={<AppstoreOutlined style={{ fontSize: '18px', color: '#ffffff' }} />}
          className={styles.logoAvatar}
        />
        <Title level={4} className={styles.brandTitle} style={{ fontSize: isMobile ? '18px' : '20px' }}>
          ReservePro
        </Title>
      </div>

      {/* Middle: Search Bar (hidden on mobile) */}
      {!isMobile && (
        <Input
          prefix={<SearchOutlined style={{ color: '#5e5e5e' }} />}
          placeholder="Search rooms, bookings..."
          className={styles.searchBar}
          size="middle"
        />
      )}

      {/* Right: Actions / User Profile */}
      <div className={styles.rightSection}>
        <Badge dot color="#0057c2" offset={[-2, 6]}>
          <Button type="text" shape="circle" icon={<BellOutlined />} className={styles.iconButton} />
        </Badge>
        <Button type="text" shape="circle" icon={<QuestionCircleOutlined />} className={styles.iconButton} />

        {user && (
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleMenuClick }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Space className={styles.userSpace} size={8}>
              <Avatar
                size={32}
                style={{ backgroundColor: '#0057c2', verticalAlign: 'middle' }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              {!isMobile && (
                <>
                  <Text className={styles.userName}>{user.name}</Text>
                  <DownOutlined className={styles.downIcon} />
                </>
              )}
            </Space>
          </Dropdown>
        )}
      </div>
    </Header>
  );
};

export default TopNavBar;
