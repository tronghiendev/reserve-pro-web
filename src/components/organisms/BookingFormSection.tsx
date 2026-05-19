import React from 'react';
import { Card, Form, Button, Typography, App, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { useUI } from '../../contexts/UIContext';
import { useCreateBooking } from '../../hooks/useCreateBooking';
import { BookingFormFields } from '../molecules/BookingFormFields';

const { Title } = Typography;
const { useToken } = theme;

interface BookingFormValues {
  guestName: string;
  reservationTime: [Dayjs, Dayjs];
}

export const BookingFormSection: React.FC = () => {
  const { token } = useToken();
  const { selectedRoomId } = useUI();
  const { mutateAsync: createBooking, isPending } = useCreateBooking();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const onFinish = async (values: BookingFormValues) => {
    if (!selectedRoomId) {
      message.error('Please select a room first');
      return;
    }

    const { guestName, reservationTime } = values;
    const [start, end] = reservationTime;

    const payload = {
      roomId: selectedRoomId,
      guestName,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    };

    try {
      await createBooking(payload);
      message.success('Successfully reserved the room!');
      form.resetFields();
    } catch {
      message.error('Failed to create reservation');
    }
  };

  return (
    <Card
      style={{
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorder}`,
        background: token.colorBgContainer,
        boxShadow: token.boxShadowTertiary,
      }}
      styles={{ body: { padding: token.paddingLG } }}
    >
      <Title level={4} style={{ margin: `0 0 ${token.paddingLG}px 0`, fontWeight: 700, letterSpacing: '-0.01em' }}>
        Create New Booking
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <BookingFormFields />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: token.paddingLG }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<PlusOutlined />}
            loading={isPending}
            style={{
              borderRadius: token.borderRadius,
              height: '44px',
              fontWeight: 600,
              paddingLeft: '24px',
              paddingRight: '24px',
              width: 'auto',
            }}
          >
            Confirm Reservation
          </Button>
        </div>
      </Form>
    </Card>
  );
};
