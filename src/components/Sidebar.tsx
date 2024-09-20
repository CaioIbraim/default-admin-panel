// components/Sidebar.tsx
import { useState } from 'react';
import Link from 'next/link';
import { Menu, Layout, Button } from 'antd';
import { FaSignOutAlt, FaHome, FaUsers, FaBusinessTime, FaMoneyBill } from 'react-icons/fa';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Sider } = Layout;

interface SidebarProps {
  loggedIn: boolean;
  onLogout: () => void;
  userFullName: string | null;
  userAvatar: string | null;
  children: React.ReactNode; // Corrigido para 'children'
}

export const Sidebar: React.FC<SidebarProps> = ({ loggedIn, onLogout, userFullName, userAvatar, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: <FaHome />, path: 'inicio', label: 'Inicio' },
    { icon: <FaUsers />, path: 'associados', label: 'Associados' },
    { icon: <FaBusinessTime />, path: 'empresas', label: 'Empresas' },
    { icon: <FaMoneyBill />, path: 'pagamentos', label: 'Pagamentos' },
  ];

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={!isOpen}
        className="bg-gray-50"
        width={196}
        style={{
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 999,
          overflow: 'auto',
        }}
      >
        <div className="p-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 text-2xl font-medium text-[#00796b] dark:text-gray-100">
              <Image
                src="/img/logo.png"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className={`transition-transform ${isOpen ? 'block' : 'hidden'}`}>STIVESG</span>
            </div>
          </Link>
          <Button
            type="text"
            className="text-gray-500 dark:text-gray-400 md:hidden"
            onClick={toggleSidebar}
            icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="h-full"
        >
          {navItems.map((item, index) => (
            <Menu.Item key={index} icon={item.icon}>
              <Link href={`/${item.path}`}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
          {loggedIn && (
            <Menu.Item key="logout" icon={<FaSignOutAlt />}>
              <Button
                type="default"
                danger
                onClick={onLogout}
                className="w-full flex items-center justify-start"
              >
                Sair
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: isOpen ? 256 : 0, transition: 'margin-left 0.3s ease' }}>
        <div className="p-4">
          {children}
        </div>
      </Layout>
      <div className="fixed top-0 left-0 p-4 z-10 md:hidden">
        <Button
          type="primary"
          icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
          onClick={toggleSidebar}
        />
      </div>
    </Layout>
  );
};
