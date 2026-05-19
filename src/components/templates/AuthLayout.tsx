import React from 'react';
import { theme } from 'antd';

const { useToken } = theme;

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { token } = useToken();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        background: token.colorBgBase,
        padding: token.padding,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG * 1.5,
          border: `1px solid ${token.colorBorder}`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          padding: token.paddingLG * 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};
