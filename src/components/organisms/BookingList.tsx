import React from 'react';
import { Typography } from 'antd';
import { useBookings } from '../../hooks/useBookings';
import { useUI } from '../../contexts/UIContext';
import { BookingCard } from '../molecules/BookingCard';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

const { Text } = Typography;

export const BookingList: React.FC = () => {
  const { selectedRoomId } = useUI();
  const { data: bookings, isLoading, isError } = useBookings(selectedRoomId);

  if (isLoading) {
    return <LoadingSpinner tip="Loading bookings schedule..." />;
  }

  if (isError) {
    return (
      <Text type="danger" style={{ display: 'block', padding: '16px 0', textAlign: 'center' }}>
        Failed to load bookings schedule for this room.
      </Text>
    );
  }

  const dataSource = bookings || [];

  if (dataSource.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <Text type="secondary">No reservations booked for this room yet.</Text>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {dataSource.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
