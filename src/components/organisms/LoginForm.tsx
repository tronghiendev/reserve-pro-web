import React, { useState } from 'react';
import { Form, Input, Button, App, Checkbox, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginForm.module.css';

const { Link } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

export const LoginForm: React.FC = () => {
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
    <div style={{ width: '100%' }}>
      <Form
        name="login_form"
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        initialValues={{ remember: true }}
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
            prefix={<UserOutlined style={{ color: '#5e5e5e' }} />}
            placeholder="Enter your email (e.g. admin@example.com)"
            size="large"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: '#5e5e5e' }} />}
            placeholder="Enter your password (e.g. admin123)"
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>

        <div className={styles.rowBetween}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link href="#forgot" className={styles.footerLink}>Forgot password?</Link>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            icon={<ArrowRightOutlined />}
            style={{ height: '48px', fontSize: '15px', fontWeight: 600 }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <Alert
        className={styles.alertBox}
        message="Demo Credentials"
        description={
          <div>
            Use <strong>admin@example.com</strong> / <strong>admin123</strong> to sign in.
          </div>
        }
        type="info"
        showIcon
      />

      <div className={styles.footer}>
        <Link href="#privacy" className={styles.footerLink}>Privacy Policy</Link>
        <span className={styles.divider}>•</span>
        <Link href="#terms" className={styles.footerLink}>Terms of Service</Link>
      </div>
    </div>
  );
};

export default LoginForm;
