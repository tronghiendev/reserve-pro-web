import React from 'react';
import { Typography, Space, theme } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { AuthLayout } from '../components/templates/AuthLayout';
import { LoginForm } from '../components/organisms/LoginForm';

const { Title, Text } = Typography;
const { useToken } = theme;

export const LoginPage: React.FC = () => {
  const { token } = useToken();

  return (
    <AuthLayout>
      <Space orientation="vertical" align="center" size="small" style={{ marginBottom: token.paddingLG, textAlign: 'center' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: `${token.colorPrimary}12`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
          }}
        >
          <BookOutlined style={{ fontSize: '32px', color: token.colorPrimary }} />
        </div>
        <Title level={2} style={{ margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Sign in to ReservePro
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Mini Booking Management Console
        </Text>
      </Space>

      <LoginForm />
    </AuthLayout>
  );
};
