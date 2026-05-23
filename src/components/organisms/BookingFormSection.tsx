import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, App, DatePicker, TimePicker, Row, Col, Alert } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { useUI } from '../../contexts/UIContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCreateBooking } from '../../hooks/useCreateBooking';
import styles from './BookingFormSection.module.css';

const { Title } = Typography;

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
  const [error, setError] = useState<{ roomId: number | null; message: string | null }>({ roomId: null, message: null });

  // Calculate displayed error dynamically during render to avoid synchronous state updates in useEffect
  const displayedError = error.roomId === selectedRoomId ? error.message : null;

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

    const startDateTime = dayjs(date)
      .hour(startTime.hour())
      .minute(startTime.minute())
      .second(0)
      .millisecond(0);

    const endDateTime = dayjs(date)
      .hour(endTime.hour())
      .minute(endTime.minute())
      .second(0)
      .millisecond(0);

    // Simple client-side validation
    if (startDateTime.isBefore(dayjs().subtract(1, 'minute'))) {
      form.setFields([
        {
          name: 'startTime',
          errors: ['Start time cannot be in the past.'],
        },
      ]);
      return;
    }

    if (endDateTime.isBefore(startDateTime) || endDateTime.isSame(startDateTime)) {
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
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
    };

    try {
      setError({ roomId: null, message: null });
      await createBooking(payload);
      message.success('Successfully reserved the room!');
      form.resetFields(['title', 'startTime', 'endTime']);
      if (user) {
        form.setFieldsValue({ hostName: user.name });
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        const errors = err.response.data?.errors;
        let errorMessage = err.response.data?.message || 'The room is already booked for this time period.';

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

        setError({ roomId: selectedRoomId, message: errorMessage });
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

      {displayedError && (
        <Alert
          title={displayedError}
          type="error"
          showIcon
          closable
          onClose={() => setError({ roomId: null, message: null })}
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={() => setError({ roomId: null, message: null })}
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
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
            suffixIcon={<CalendarOutlined style={{ color: '#5e5e5e' }} />}
            disabledDate={(current) => current && current.isBefore(dayjs().startOf('day'))}
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
    </div>
  );
};

export default BookingFormSection;
