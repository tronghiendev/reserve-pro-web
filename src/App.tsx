import React from 'react';
import { ConfigProvider, App as AntdApp } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import { router } from './router';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0057c2',
            colorBgBase: '#f7f9fc',
            colorBgContainer: '#ffffff',
            colorBorder: '#c1c6d7',
            colorBorderSecondary: '#c1c6d7',
            colorTextBase: '#191c1e',
            colorTextSecondary: '#5e5e5e',
            colorTextTertiary: '#414755',
            colorError: '#ba1a1a',
            colorErrorBg: '#ffdad6',
            colorFillAlter: '#f2f4f7',     // surface-container-low (table header / hover)
            colorFillContent: '#eceef1',   // surface-container
            borderRadius: 8,
            borderRadiusLG: 12,
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontSizeLG: 16,
            boxShadowTertiary: '0 1px 2px 0 rgba(0,0,0,0.03)',
          },
          components: {
            Layout: {
              headerBg: '#ffffff',
              siderBg: '#ffffff',
              headerHeight: 64,
            },
            Table: {
              headerBg: '#f2f4f7',
              rowHoverBg: '#f7f9fc',
              borderColor: '#c1c6d7',
            },
            Card: {
              paddingLG: 24,
            },
            Menu: {
              itemBorderRadius: 8,
            },
          },
        }}
      >
        <AntdApp>
          <AuthProvider>
            <UIProvider>
              <RouterProvider router={router} />
            </UIProvider>
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
