import React from 'react';
import { Layout, Drawer, Button, theme } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { TopNavBar } from '../organisms/TopNavBar';
import { RoomSidebar } from '../organisms/RoomSidebar';
import { useResponsive } from '../../hooks/useResponsive';
import { useUI } from '../../contexts/UIContext';

const { Content, Sider } = Layout;
const { useToken } = theme;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { token } = useToken();
  const {
    hasSider,
    siderWidth,
    drawerWidth,
    contentPad,
    maxWidth,
  } = useResponsive();

  const { isDrawerOpen, setIsDrawerOpen } = useUI();

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopNavBar />
      
      <Layout style={{ flex: 1, position: 'relative' }}>
        {/* Desktop / Laptop Sidebar */}
        {hasSider && (
          <Sider
            width={siderWidth}
            theme="light"
            style={{
              borderRight: `1px solid ${token.colorBorder}`,
              height: 'calc(100vh - 64px)',
              position: 'sticky',
              top: '64px',
              left: 0,
              overflowY: 'auto',
            }}
          >
            <RoomSidebar />
          </Sider>
        )}

        {/* Mobile / Tablet Drawer Sidebar */}
        {!hasSider && (
          <Drawer
            placement="left"
            closable={false}
            onClose={() => setIsDrawerOpen(false)}
            open={isDrawerOpen}
            size={drawerWidth}
            styles={{ body: { padding: 0 } }}
          >
            <RoomSidebar />
          </Drawer>
        )}

        {/* Main Content Pane */}
        <Content
          style={{
            padding: `${contentPad}px`,
            background: token.colorBgBase,
            overflowY: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          <div
            style={{
              maxWidth,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: `${token.paddingLG}px`,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>

      {/* Floating Action Button (FAB) for Mobile / Tablet */}
      {!hasSider && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<MenuOutlined style={{ fontSize: '20px' }} />}
          onClick={() => setIsDrawerOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '28px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99,
          }}
        />
      )}
    </Layout>
  );
};
