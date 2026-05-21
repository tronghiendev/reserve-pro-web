import React from 'react';
import { Typography } from 'antd';
import { AuthLayout } from '../components/templates/AuthLayout';
import { LoginForm } from '../components/organisms/LoginForm';
import styles from './LoginPage.module.css';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Sign In | ReservePro';
  }, []);

  const header = (
    <div className={styles.mobileHeader}>
      <img src="/logo.png" alt="ReservePro Logo" className={styles.mobileLogo} />
      <Title level={1} className={styles.mobileTitle}>
        Sign in to ReservePro
      </Title>
      <Text className={styles.mobileSubtitle}>
        Mini Booking Management Console
      </Text>
    </div>
  );

  const footer = (
    <footer className={styles.mobileFooter}>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} ReservePro Booking Management
      </div>
    </footer>
  );

  return (
    <AuthLayout header={header} footer={footer}>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
