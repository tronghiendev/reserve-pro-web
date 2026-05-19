import React from 'react';
import { Card, Space, Typography, theme } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Booking } from '../../types';
import { BookingStatusTag } from '../atoms/BookingStatusTag';
import { DeleteBookingAction } from './DeleteBookingAction';

const { Text, Title } = Typography;
const { useToken } = theme;

interface BookingCardProps {
  booking: Booking;
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { token } = useToken();
  const formatTime = (timeStr: string) => dayjs(timeStr).format('HH:mm');
  const formatDate = (timeStr: string) => dayjs(timeStr).format('MMM DD, YYYY');

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
            <BookingStatusTag startTime={booking.startTime} endTime={booking.endTime} />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              <CalendarOutlined style={{ marginRight: '4px' }} />
              {formatDate(booking.startTime)} ({formatTime(booking.startTime)} - {formatTime(booking.endTime)})
            </Text>
          </Space>
          
          <Title level={5} style={{ margin: `${token.paddingXS}px 0 0 0`, fontSize: '16px', fontWeight: 600 }}>
            Reservation Host: {booking.guestName}
          </Title>

          <Space style={{ marginTop: '4px', fontSize: '13px' }} size="small">
            <UserOutlined style={{ color: token.colorTextSecondary }} />
            <Text type="secondary">{booking.guestName}</Text>
          </Space>
        </div>

        <div style={{ alignSelf: 'center' }}>
          <DeleteBookingAction bookingId={booking.id} guestName={booking.guestName} />
        </div>
      </div>
    </Card>
  );
};
