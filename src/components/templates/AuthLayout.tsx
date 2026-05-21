import React from 'react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, header, footer }) => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.mainContainer}>
        {header && <div className={styles.headerContainer}>{header}</div>}
        <div className={styles.formPanel}>
          <div className={styles.formContainer}>
            {children}
          </div>
        </div>
        {footer && <div className={styles.footerContainer}>{footer}</div>}
      </main>
    </div>
  );
};
