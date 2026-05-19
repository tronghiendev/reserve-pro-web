import React from 'react';
import { Typography, Row, Col, theme } from 'antd';
import { DashboardLayout } from '../components/templates/DashboardLayout';
import { BookingTable } from '../components/organisms/BookingTable';
import { BookingList } from '../components/organisms/BookingList';
import { BookingFormSection } from '../components/organisms/BookingFormSection';
import { useUI } from '../contexts/UIContext';
import { useRooms } from '../hooks/useRooms';
import { useResponsive } from '../hooks/useResponsive';
import { LoadingSpinner } from '../components/atoms/LoadingSpinner';

const { Title, Text } = Typography;
const { useToken } = theme;

export const DashboardPage: React.FC = () => {
  const { token } = useToken();
  const { selectedRoomId } = useUI();
  const { data: rooms, isLoading } = useRooms();
  const { hasTable, isMobile } = useResponsive();

  const selectedRoom = rooms?.find((r) => r.id === selectedRoomId);

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingSpinner tip="Loading console layout..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Room Detail Header Banner */}
      {selectedRoom ? (
        <div>
          <Title
            level={isMobile ? 3 : 2}
            style={{
              margin: `0 0 ${token.paddingXS}px 0`,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: token.colorTextBase,
            }}
          >
            {selectedRoom.name}
          </Title>
          <Text type="secondary" style={{ fontSize: isMobile ? '13px' : '14px' }}>
            Capacity: {selectedRoom.capacity} • Video Conferencing • Whiteboard • Air Conditioning
          </Text>
        </div>
      ) : (
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
            Select a Room
          </Title>
          <Text type="secondary">
            Choose a room from the sidebar menu to begin managing reservations.
          </Text>
        </div>
      )}

      {/* Grid Content Split */}
      <Row gutter={[token.paddingLG, token.paddingLG]}>
        {/* Left Column: Bookings List or Table */}
        <Col xs={24} lg={14} xl={15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: token.padding }}>
            <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
              Current Bookings
            </Title>
            {hasTable ? <BookingTable /> : <BookingList />}
          </div>
        </Col>

        {/* Right Column: Reservation Form */}
        <Col xs={24} lg={10} xl={9}>
          <BookingFormSection />
        </Col>
      </Row>
    </DashboardLayout>
  );
};
