import React from 'react';
import { Typography, Button, Divider } from 'antd';
import { DashboardOutlined, FilterOutlined, CalendarOutlined, SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useRooms } from '../../hooks/useRooms';
import { useUI } from '../../contexts/UIContext';
import { RoomListItem } from '../molecules/RoomListItem';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import styles from './RoomSidebar.module.css';

const { Title, Text } = Typography;

export const RoomSidebar: React.FC = () => {
  const { data: rooms, isLoading, isError } = useRooms();
  const { selectedRoomId, selectRoom } = useUI();

  // If selectedRoomId is null, it means we are on the main Dashboard view.
  const isDashboardActive = selectedRoomId === null;

  return (
    <div className={styles.container}>
      {/* Sidebar Header */}
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          Meeting Rooms
        </Title>
        <Button type="text" shape="circle" icon={<FilterOutlined />} className={styles.filterBtn} />
      </div>

      {/* Main Navigation Section */}
      <div className={styles.navSection}>
        <div
          className={`${styles.navItem} ${isDashboardActive ? styles.navItemActive : ''}`}
          onClick={() => selectRoom(null)} // Select null to return to main dashboard
        >
          <DashboardOutlined className={styles.navIcon} />
          <span>Dashboard</span>
        </div>
      </div>

      <Divider className={styles.divider} />

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

      <Divider className={styles.divider} />

      {/* Bottom Nav & Footer */}
      <div className={styles.footerSection}>
        <div className={styles.navItem}>
          <CalendarOutlined className={styles.navIcon} />
          <span>My Bookings</span>
        </div>
        <div className={styles.navItem}>
          <SettingOutlined className={styles.navIcon} />
          <span>Settings</span>
        </div>
        
        <Divider className={styles.divider} />
        
        <div className={styles.navItem}>
          <QuestionCircleOutlined className={styles.navIcon} />
          <span>Help Center</span>
        </div>
      </div>
    </div>
  );
};

export default RoomSidebar;
