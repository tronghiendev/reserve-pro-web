import React from 'react';
import { Typography, Card } from 'antd';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { RoomHeroBanner } from '../components/molecules/RoomHeroBanner';
import { BookingTable } from '../components/organisms/BookingTable';
import { BookingFormSection } from '../components/organisms/BookingFormSection';
import { useUI } from '../contexts/UIContext';
import { useRooms } from '../hooks/useRooms';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';
import styles from './DashboardPage.module.css';

const { Title, Text } = Typography;

export const DashboardPage: React.FC = () => {
  const { selectedRoomId, selectRoom } = useUI();
  const { data: rooms, isLoading, isError } = useRooms();

  React.useEffect(() => {
    document.title = 'ReservePro';
  }, []);

  React.useEffect(() => {
    if (!selectedRoomId && rooms && rooms.length > 0) {
      selectRoom(rooms[0].id);
    }
  }, [rooms, selectedRoomId, selectRoom]);

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

  // Render Left Side content based on selected room
  const mainContent = selectedRoom ? (
    <div className={styles.container}>
      <RoomHeroBanner room={selectedRoom} />
      <BookingTable />
    </div>
  ) : (
    <div className={styles.container}>
      <Card styles={{ body: { padding: 48, textAlign: 'center' } }} style={{ border: '1px solid #c1c6d7' }}>
        <Title level={4}>No Meeting Rooms Available</Title>
        <Text type="secondary">There are currently no meeting rooms configured in the system.</Text>
      </Card>
    </div>
  );

  // Render Right Side content based on selected room
  const rightPanel = selectedRoom ? (
    <BookingFormSection />
  ) : null;

  return (
    <DashboardLayout rightPanel={rightPanel}>
      {mainContent}
    </DashboardLayout>
  );
};

export default DashboardPage;
