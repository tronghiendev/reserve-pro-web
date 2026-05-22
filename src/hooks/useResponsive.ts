import { Grid } from 'antd';

const { useBreakpoint } = Grid;

export const useResponsive = () => {
  const screens = useBreakpoint();

  const isMobile = !screens.sm;                       // < 576px (xs)
  const isTablet = !!screens.sm && !screens.lg;       // 576px - 991px (sm, md)
  const isLaptop = !!screens.lg && !screens.xl;       // 992px - 1199px (lg)
  const isDesktop = !!screens.xl;                     // >= 1200px (xl, xxl)

  const hasSider = !!screens.lg;                      // Laptop + Desktop show Sider
  const hasTable = !!screens.lg;                      // Laptop + Desktop show Table
  const showUsername = !!screens.lg;                  // Laptop + Desktop show username text

  const siderWidth = screens.xl ? 300 : 260;          // Desktop 300px, Laptop 260px
  const drawerWidth = screens.sm ? 320 : '100%';      // Tablet 320px, Mobile 100%
  const contentPad = screens.sm ? 24 : 16;            // Padding: Tablet/Laptop/Desktop 24px, Mobile 16px
  const maxWidth = screens.xl ? 960 : screens.lg ? 800 : '100%'; // Centered max width

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    hasSider,
    hasTable,
    showUsername,
    siderWidth,
    drawerWidth,
    contentPad,
    maxWidth,
  };
};
