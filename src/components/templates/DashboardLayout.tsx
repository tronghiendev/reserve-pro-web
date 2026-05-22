import React from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { TopNavBar } from '../organisms/TopNavBar';
import { RoomSidebar } from '../organisms/RoomSidebar';
import { useResponsive } from '../../hooks/useResponsive';
import { useUI } from '../../contexts/UIContext';
import styles from './DashboardLayout.module.css';

const { Content, Sider } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, rightPanel }) => {
  const {
    hasSider,
    siderWidth,
    drawerWidth,
    contentPad,
    maxWidth,
  } = useResponsive();

  const { isDrawerOpen, setIsDrawerOpen } = useUI();

  return (
    <Layout className={styles.layout}>
      <TopNavBar />
      
      <Layout className={styles.innerLayout}>
        {/* Left Desktop Sidebar */}
        {hasSider && (
          <Sider
            width={siderWidth}
            theme="light"
            className={styles.leftSider}
          >
            <RoomSidebar />
          </Sider>
        )}

        {/* Left Mobile Drawer */}
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
          className={styles.content}
          style={{ padding: `${contentPad}px` }}
        >
          <div
            className={styles.contentWrapper}
            style={{ maxWidth }}
          >
            {children}
            
            {/* On mobile/tablet, render the rightPanel content at the bottom of the page */}
            {!hasSider && rightPanel && (
              <div className={styles.mobileRightPanel}>
                {rightPanel}
              </div>
            )}
          </div>
        </Content>

        {/* Right Desktop Sider */}
        {hasSider && rightPanel && (
          <Sider
            width={320}
            theme="light"
            className={styles.rightSider}
          >
            {rightPanel}
          </Sider>
        )}
      </Layout>

      {/* Floating Action Button (FAB) for Mobile / Tablet to open RoomSidebar */}
      {!hasSider && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<MenuOutlined style={{ fontSize: '20px' }} />}
          onClick={() => setIsDrawerOpen(true)}
          className={styles.fab}
        />
      )}
    </Layout>
  );
};

export default DashboardLayout;
