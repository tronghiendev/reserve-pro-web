import React from 'react';
import { Typography } from 'antd';
import { AppstoreOutlined, CheckOutlined } from '@ant-design/icons';
import { AuthLayout } from '../components/templates/AuthLayout';
import { LoginForm } from '../components/organisms/LoginForm';
import styles from './LoginPage.module.css';

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const brandContent = (
    <div className={styles.brandContainer}>
      <div className={styles.brandHeader}>
        <div className={styles.logoBox}>
          <AppstoreOutlined />
        </div>
        <span className={styles.brandName}>ReservePro</span>
      </div>

      <div className={styles.brandBody}>
        <Title className={styles.headline}>
          Master your workspace with precision.
        </Title>
        <p className={styles.subheadline}>
          The complete booking platform for modern hybrid teams. Reserve meeting rooms, manage schedules, and coordinate collaborations in one place.
        </p>

        <div className={styles.featuresList}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <CheckOutlined />
            </div>
            <span>Real-time meeting room availability tracking</span>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <CheckOutlined />
            </div>
            <span>Instant booking with one-click reserve</span>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <CheckOutlined />
            </div>
            <span>Interactive schedules and conflict resolution</span>
          </div>
        </div>
      </div>

      <div className={styles.brandFooter}>
        <div className={styles.avatarGroup}>
          <img className={styles.avatarItem} src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User 1" />
          <img className={styles.avatarItem} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User 2" />
          <img className={styles.avatarItem} src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80" alt="User 3" />
          <img className={styles.avatarItem} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" alt="User 4" />
        </div>
        <span className={styles.avatarText}>Trusted by 10,000+ teams worldwide</span>
      </div>
    </div>
  );

  return (
    <AuthLayout brandContent={brandContent}>
      <div className={styles.formHeader}>
        <Title level={2} className={styles.formTitle}>
          Sign In
        </Title>
        <Text type="secondary" className={styles.formSubtitle}>
          Access your workspace booking management system
        </Text>
      </div>

      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
