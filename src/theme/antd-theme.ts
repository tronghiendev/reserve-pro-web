import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
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
    Input: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Button: {
      controlHeight: 40,
      borderRadius: 8,
    },
    DatePicker: {
      controlHeight: 40,
    },
  },
};

export default antdTheme;
