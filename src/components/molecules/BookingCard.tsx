import React from 'react';
import { Card, Space, Typography, theme } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Booking } from '../../types';
import { BookingStatusTag } from '../atoms/BookingStatusTag';
import { DeleteBookingAction } from './DeleteBookingAction';
import { useAuth } from '../../contexts/AuthContext';

const { Text, Title } = Typography;
const { useToken } = theme;

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { token } = useToken();
  const { user } = useAuth();
  const formatTime = (timeStr: string) => dayjs(timeStr).format('HH:mm');
  const formatDate = (timeStr: string) => dayjs(timeStr).format('DD/MM/YYYY');

  return (
    <Card
      style={{
        marginBottom: token.paddingSM,
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorder}`,
        background: token.colorBgContainer,
        boxShadow: token.boxShadowTertiary,
      }}
      styles={{ body: { padding: token.padding } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: token.paddingXS, flex: 1, marginRight: token.paddingSM }}>
          <Space wrap size={[8, 4]}>
            <BookingStatusTag startTime={booking.start_time} endTime={booking.end_time} />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              <CalendarOutlined style={{ marginRight: '4px' }} />
              {formatDate(booking.start_time)} ({formatTime(booking.start_time)} - {formatTime(booking.end_time)})
            </Text>
          </Space>
          
          <Title level={5} style={{ margin: `${token.paddingXS}px 0 0 0`, fontSize: '16px', fontWeight: 600 }}>
            Reservation Host: {booking.user_name}
          </Title>

          <Space style={{ marginTop: '4px', fontSize: '13px' }} size="small">
            <UserOutlined style={{ color: token.colorTextSecondary }} />
            <Text type="secondary">{booking.user_name}</Text>
          </Space>
        </div>

        {user && booking.user_name === user.name && (
          <div style={{ alignSelf: 'center' }}>
            <DeleteBookingAction bookingId={booking.id} guestName={booking.user_name} />
          </div>
        )}
      </div>
    </Card>
  );
};
