import React from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  brandContent?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, brandContent }) => {
  return (
    <div className={styles.wrapper}>
      {brandContent && (
        <div className={styles.brandPanel}>
          <div className={`${styles.decorCircle} ${styles.circle1}`} />
          <div className={`${styles.decorCircle} ${styles.circle2}`} />
          {brandContent}
        </div>
      )}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};
