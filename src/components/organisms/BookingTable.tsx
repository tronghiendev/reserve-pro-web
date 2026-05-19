import React from 'react';
import { Table, Typography, theme } from 'antd';
import dayjs from 'dayjs';
import type { Booking } from '../../types';
import { useBookings } from '../../hooks/useBookings';
import { useUI } from '../../contexts/UIContext';
import { DeleteBookingAction } from '../molecules/DeleteBookingAction';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

const { Text } = Typography;
const { useToken } = theme;

export const BookingTable: React.FC = () => {
  const { token } = useToken();
  const { selectedRoomId } = useUI();
  const { data: bookings, isLoading, isError } = useBookings(selectedRoomId);

  const formatTime = (timeStr: string) => dayjs(timeStr).format('YYYY-MM-DD HH:mm');

  const columns = [
    {
      title: 'Host / Guest Name',
      dataIndex: 'guestName',
      key: 'guestName',
      fontWeight: 600,
      render: (text: string) => <Text style={{ fontWeight: 600 }}>{text}</Text>,
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text: string) => <Text type="secondary">{formatTime(text)}</Text>,
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text: string) => <Text type="secondary">{formatTime(text)}</Text>,
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      align: 'center' as const,
      render: (_: unknown, record: Booking) => (
        <DeleteBookingAction bookingId={record.id} guestName={record.guestName} />
      ),
    },
  ];

  if (isLoading) {
    return <LoadingSpinner tip="Loading bookings schedule..." />;
  }

  if (isError) {
    return (
      <Text type="danger" style={{ display: 'block', padding: '24px 0', textAlign: 'center' }}>
        Failed to load bookings schedule for this room.
      </Text>
    );
  }

  return (
    <Table
      dataSource={bookings || []}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5, hideOnSinglePage: true }}
      locale={{ emptyText: 'No reservations booked for this room yet.' }}
      style={{
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
        overflow: 'hidden',
        background: token.colorBgContainer,
      }}
    />
  );
};
