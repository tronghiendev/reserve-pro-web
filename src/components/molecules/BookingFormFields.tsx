import React from 'react';
import { Form, Input, DatePicker, Row, Col, theme } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { useToken } = theme;

export const BookingFormFields: React.FC = () => {
  const { token } = useToken();

  return (
    <Row gutter={[{ xs: 0, sm: 16, md: 24 }, { xs: 16, sm: 0 }]}>
      <Col xs={24} sm={12}>
        <Form.Item
          label="Guest Name"
          name="guestName"
          rules={[{ required: true, message: 'Please enter guest name' }]}
          style={{ marginBottom: 0 }}
        >
          <Input
            prefix={<UserOutlined style={{ color: token.colorTextSecondary }} />}
            placeholder="e.g. Emma Watson"
            size="large"
            style={{ borderRadius: token.borderRadius }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12}>
        <Form.Item
          label="Reservation Interval"
          name="reservationTime"
          rules={[{ required: true, message: 'Please select reservation interval' }]}
          style={{ marginBottom: 0 }}
        >
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start Date & Time', 'End Date & Time']}
            size="large"
            style={{ width: '100%', borderRadius: token.borderRadius }}
            suffixIcon={<CalendarOutlined style={{ color: token.colorTextSecondary }} />}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
