import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, App, DatePicker, TimePicker, Row, Col, Alert } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useUI } from '../../contexts/UIContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCreateBooking } from '../../hooks/useCreateBooking';
import styles from './BookingFormSection.module.css';

const { Title, Text } = Typography;

interface BookingFormValues {
  title: string;
  hostName: string;
  date: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
}

export const BookingFormSection: React.FC = () => {
  const { selectedRoomId } = useUI();
  const { user } = useAuth();
  const { mutateAsync: createBooking, isPending } = useCreateBooking();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  // Keep hostName input value in sync with authenticated user
  useEffect(() => {
    if (user) {
      form.setFieldsValue({ hostName: user.name });
    }
  }, [user, form]);

  const onFinish = async (values: BookingFormValues) => {
    if (selectedRoomId === null) {
      message.error('Please select a room first');
      return;
    }

    const { title, date, startTime, endTime } = values;

    const dateStr = date.format('YYYY-MM-DD');
    const startStr = `${dateStr} ${startTime.format('HH:mm:00')}`;
    const endStr = `${dateStr} ${endTime.format('HH:mm:00')}`;

    // Simple client-side validation
    if (endTime.isBefore(startTime) || endTime.isSame(startTime)) {
      form.setFields([
        {
          name: 'endTime',
          errors: ['End time must be after start time.'],
        },
      ]);
      return;
    }

    const payload = {
      room_id: selectedRoomId,
      user_name: user?.name || 'Unknown Host',
      title: title,
      start_time: startStr,
      end_time: endStr,
    };

    try {
      await createBooking(payload);
      message.success('Successfully reserved the room!');
      form.resetFields(['title', 'startTime', 'endTime']);
      if (user) {
        form.setFieldsValue({ hostName: user.name });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const errors = error.response.data?.errors;
        let errorMessage = error.response.data?.message || 'The room is already booked for this time period.';
        
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
            name: 'startTime',
            errors: [errorMessage],
          },
        ]);
      } else {
        message.error('Failed to create reservation');
      }
    }
  };

  return (
    <div className={styles.panel}>
      <Title level={4} className={styles.title}>
        Quick Reserve
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        initialValues={{
          date: dayjs(),
          startTime: dayjs().add(1, 'hour').startOf('hour'),
          endTime: dayjs().add(2, 'hour').startOf('hour'),
        }}
      >
        <Form.Item
          label="Meeting Title"
          name="title"
          rules={[{ required: true, message: 'Please enter meeting title' }]}
        >
          <Input placeholder="e.g. Sync & Alignment" />
        </Form.Item>

        <Form.Item
          label="Host Name"
          name="hostName"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
            suffixIcon={<CalendarOutlined style={{ color: '#5e5e5e' }} />}
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[{ required: true, message: 'Select start time' }]}
            >
              <TimePicker
                format="HH:mm"
                minuteStep={15}
                style={{ width: '100%' }}
                suffixIcon={<ClockCircleOutlined style={{ color: '#5e5e5e' }} />}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[{ required: true, message: 'Select end time' }]}
            >
              <TimePicker
                format="HH:mm"
                minuteStep={15}
                style={{ width: '100%' }}
                suffixIcon={<ClockCircleOutlined style={{ color: '#5e5e5e' }} />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isPending}
          className={styles.submitBtn}
        >
          Confirm Booking
        </Button>
      </Form>

      <Alert
        className={styles.tipBox}
        message="Booking Tip"
        description="Peak hours are between 10:00 AM and 2:00 PM. Book in advance to secure your spot."
        type="info"
        showIcon={true}
        icon={<InfoCircleOutlined style={{ color: '#0057c2' }} />}
      />

      <div className={styles.disclaimer}>
        <Text type="secondary" className={styles.disclaimer}>
          By clicking you agree to workspace policies
        </Text>
      </div>
    </div>
  );
};

export default BookingFormSection;
