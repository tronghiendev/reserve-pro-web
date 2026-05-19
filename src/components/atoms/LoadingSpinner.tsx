import React from 'react';
import { Spin } from 'antd';

interface LoadingSpinnerProps {
  tip?: string;
  fullPageTip?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ tip = 'Loading data...', fullPageTip }) => {
  if (fullPageTip) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#f7f9fc',
        }}
      >
        <Spin size="large" description={fullPageTip} />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
        width: '100%',
      }}
    >
      <Spin description={tip} />
    </div>
  );
};
