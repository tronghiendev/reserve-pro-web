import React, { useState } from 'react';
import { Table, Typography, Tag, DatePicker, Card } from 'antd';
import dayjs from 'dayjs';
import type { Booking } from '../../types';
import { useBookings } from '../../hooks/useBookings';
import { useUI } from '../../contexts/UIContext';
import { useAuth } from '../../contexts/AuthContext';
import { DeleteBookingAction } from '../molecules/DeleteBookingAction';
import { LoadingSpinner } from '../atoms/LoadingSpinner';
import styles from './BookingTable.module.css';

const { Text, Title } = Typography;

export const BookingTable: React.FC = () => {
  const { selectedRoomId } = useUI();
  const { user } = useAuth();
  const { data: bookings, isLoading, isError } = useBookings(selectedRoomId);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());

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

  // Filter bookings based on the selected date
  const filteredBookings = (bookings || []).filter((booking) => {
    return dayjs(booking.start_time).isSame(selectedDate, 'day');
  });

  const getStatus = (start: string, end: string) => {
    const now = dayjs();
    const startTime = dayjs(start);
    const endTime = dayjs(end);

    if (now.isBefore(startTime)) {
      return { text: 'Upcoming', color: 'blue' };
    } else if (now.isAfter(endTime)) {
      return { text: 'Done', color: 'default' };
    } else {
      return { text: 'Ongoing', color: 'green' };
    }
  };

  const columns = [
    {
      title: 'Time',
      key: 'time',
      render: (_: unknown, record: Booking) => {
        const start = dayjs(record.start_time).format('HH:mm');
        const end = dayjs(record.end_time).format('HH:mm');
        return <span className={styles.timeText}>{`${start} - ${end}`}</span>;
      },
      width: 140,
    },
    {
      title: 'Meeting Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Booking) => (
        <span className={styles.meetingTitleText}>
          {text || `Meeting with ${record.user_name}`}
        </span>
      ),
    },
    {
      title: 'Host',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: unknown, record: Booking) => {
        const { text, color } = getStatus(record.start_time, record.end_time);
        return (
          <Tag color={color} className={styles.statusTag}>
            {text}
          </Tag>
        );
      },
      width: 110,
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      align: 'center' as const,
      render: (_: unknown, record: Booking) => {
        const isOwner = user && record.user_id === user.id;
        return isOwner ? (
          <DeleteBookingAction bookingId={record.id} guestName={record.user_name} />
        ) : null;
      },
    },
  ];

  return (
    <Card className={styles.card}>
      <div className={styles.headerRow}>
        <Title level={4} className={styles.title}>
          Today's Schedule
        </Title>
        <DatePicker
          value={selectedDate}
          onChange={(date) => date && setSelectedDate(date)}
          className={styles.datePicker}
          allowClear={false}
          format="DD/MM/YYYY"
        />
      </div>

      <Table
        dataSource={filteredBookings}
        columns={columns}
        rowKey="id"
        className={styles.table}
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
        locale={{ emptyText: 'No reservations booked for this day.' }}
      />
    </Card>
  );
};

export default BookingTable;
