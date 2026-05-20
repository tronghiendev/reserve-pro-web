import React from 'react';
import { Card, Form, Button, Typography, App, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import axios from 'axios';
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
    if (selectedRoomId === null) {
      message.error('Please select a room first');
      return;
    }

    const { guestName, reservationTime } = values;
    const [start, end] = reservationTime;

    const payload = {
      room_id: selectedRoomId,
      user_name: guestName,
      start_time: start.format('YYYY-MM-DD HH:mm:ss'),
      end_time: end.format('YYYY-MM-DD HH:mm:ss'),
    };

    try {
      await createBooking(payload);
      message.success('Successfully reserved the room!');
      form.resetFields();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response.data?.errors;
        let errorMessage = error.response.data?.message || 'The room is already booked for this time period.';
        
        // Trích xuất lỗi cụ thể cho start_time/end_time từ errors của Laravel nếu có
        if (errors) {
          if (errors.start_time) {
            errorMessage = errors.start_time[0];
          } else if (errors.end_time) {
            errorMessage = errors.end_time[0];
          } else if (errors.room_id) {
            errorMessage = errors.room_id[0];
          } else if (errors.user_name) {
            errorMessage = errors.user_name[0];
          }
        }
        
        form.setFields([
          {
            name: 'reservationTime',
            errors: [errorMessage],
          },
        ]);
      } else {
        message.error('Failed to create reservation');
      }
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
