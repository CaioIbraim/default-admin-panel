// components/Layout.tsx
import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Importa o CSS do Ant Design

const { Sider, Content } = Layout;

const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsMobile(false);
      setCollapsed(false);
    } else {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapsed = () => {
    if (isMobile) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        id="sider-menu"
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={() => {}}
        className={`bg-gray-800 transition-transform duration-300 ease-in-out ${isMobile && collapsed ? 'transform -translate-x-full' : ''}`}
      >
        <div className="text-white text-center p-4 font-bold">Meu Sistema</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', label: 'Página Inicial' },
            { key: '2', label: 'Sobre' },
            { key: '3', label: 'Contato' },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: isMobile && collapsed ? 0 : 250 }}>
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
            transition: 'margin-left 0.3s ease'
          }}
        >
          <div className="p-4">
            {children}
          </div>
        </Content>
      </Layout>
      {isMobile && (
        <div className="fixed top-0 left-0 p-4 z-10 md:hidden">
          <button
            onClick={toggleCollapsed}
            className="p-2 bg-blue-600 text-white rounded-full"
            aria-label={collapsed ? 'Open Menu' : 'Close Menu'}
            aria-expanded={!collapsed}
            aria-controls="sider-menu"
          >
            {collapsed ? <MenuOutlined /> : <CloseOutlined />}
          </button>
        </div>
      )}
    </Layout>
  );
};

export default LayoutComponent;
