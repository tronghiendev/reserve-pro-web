import React, { useState } from 'react';
import { Form, Input, Button, App, theme } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { useToken } = theme;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { token } = useToken();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        message.success('Welcome back to ReservePro!');
        navigate('/', { replace: true });
      } else {
        message.error('Invalid email or password.');
      }
    } catch {
      message.error('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="login_form"
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      style={{ width: '100%' }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email address' }
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: token.colorTextSecondary }} />}
          placeholder="Enter your email (e.g. admin@example.com)"
          size="large"
          autoComplete="email"
          style={{ borderRadius: token.borderRadius }}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
        style={{ marginBottom: token.padding }}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: token.colorTextSecondary }} />}
          placeholder="Enter your password (e.g. admin123)"
          size="large"
          autoComplete="current-password"
          style={{ borderRadius: token.borderRadius }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
          icon={<ArrowRightOutlined />}
          style={{
            height: '48px',
            borderRadius: token.borderRadius,
            fontSize: '15px',
            fontWeight: 600,
            marginTop: '8px',
          }}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};
