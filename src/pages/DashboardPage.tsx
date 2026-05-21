import React from 'react';
import { Typography, Card, Tag, Button } from 'antd';
import { AppstoreOutlined, ArrowRightOutlined, RightOutlined } from '@ant-design/icons';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { RoomHeroBanner } from '../components/molecules/RoomHeroBanner';
import { BookingTable } from '../components/organisms/BookingTable';
import { BookingFormSection } from '../components/organisms/BookingFormSection';
import { useUI } from '../contexts/UIContext';
import { useRooms } from '../hooks/useRooms';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import styles from './DashboardPage.module.css';

const { Title, Text, Paragraph } = Typography;

export const DashboardPage: React.FC = () => {
  const { selectedRoomId, selectRoom } = useUI();
  const { data: rooms, isLoading, isError } = useRooms();

  const selectedRoom = rooms?.find((r) => r.id === selectedRoomId);

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingSpinner tip="Loading console layout..." />
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <Text type="danger" style={{ display: 'block', padding: '48px 0', textAlign: 'center' }}>
          Failed to load application data. Please refresh page.
        </Text>
      </DashboardLayout>
    );
  }

  const availableRoomsCount = rooms?.filter((r) => !r.is_in_use).length || 0;
  const totalRoomsCount = rooms?.length || 0;

  // Render Left Side content based on selected room
  const mainContent = selectedRoom ? (
    <div className={styles.container}>
      <RoomHeroBanner room={selectedRoom} />
      <BookingTable />
    </div>
  ) : (
    <div className={styles.container}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.decorCircle} />
        <Title className={styles.bannerTitle}>Welcome to ReservePro</Title>
        <Paragraph className={styles.bannerText}>
          Coordinate your meetings effortlessly. Currently, <strong>{availableRoomsCount} of {totalRoomsCount} rooms</strong> are available for booking right now.
        </Paragraph>
      </div>

      {/* Rooms Overview Grid */}
      <div>
        <Title level={4} className={styles.sectionTitle}>
          Meeting Spaces Overview
        </Title>
        <div className={styles.roomsGrid}>
          {rooms?.map((room) => (
            <Card
              key={room.id}
              className={styles.roomCard}
              styles={{ body: { padding: 20, display: 'flex', flexDirection: 'column', height: '100%' } }}
              onClick={() => selectRoom(room.id)}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardRoomName}>{room.name}</span>
                <Tag
                  color={room.is_in_use ? 'error' : 'success'}
                  className={styles.statusTag}
                >
                  {room.is_in_use ? 'In Use' : 'Available'}
                </Tag>
              </div>

              <span className={styles.cardDesc}>
                {room.description || 'Modern and fully equipped conference space with full amenities.'}
              </span>

              <div className={styles.cardFooter}>
                <span className={styles.capacityText}>{room.capacity} seats</span>
                <Button type="link" size="small" icon={<ArrowRightOutlined />} style={{ padding: 0 }}>
                  View Schedule
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Right Side content based on selected room
  const rightPanel = selectedRoom ? (
    <BookingFormSection />
  ) : (
    <Card styles={{ body: { padding: 0, height: '100%' } }} style={{ height: '100%', border: '1px solid #c1c6d7' }}>
      <div className={styles.rightPanelEmpty}>
        <div className={styles.emptyIconBox}>
          <AppstoreOutlined />
        </div>
        <span className={styles.emptyTitle}>No Space Selected</span>
        <p className={styles.emptyText}>
          Choose a room from the left sidebar or the overview grid to start checking schedules and reserving your spot.
        </p>
        <Button
          type="primary"
          icon={<RightOutlined />}
          onClick={() => rooms && rooms.length > 0 && selectRoom(rooms[0].id)}
          style={{ marginTop: 12 }}
        >
          Select First Room
        </Button>
      </div>
    </Card>
  );

  return (
    <DashboardLayout rightPanel={rightPanel}>
      {mainContent}
    </DashboardLayout>
  );
};

export default DashboardPage;
