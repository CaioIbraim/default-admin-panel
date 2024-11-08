// components/MenuWithLogo.js
import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { HomeOutlined, UserOutlined, FileOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from "next/image";

const { Header, Content, Footer } = Layout;

const MenuWithLogo = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo à esquerda */}
        <div className="logo" style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        <Image
                    src="/img/logo.png"
                    alt="N"
                    width={100}
                    height={52}
                  />
        </div>


        {/* Menu para mobile */}
        <Button
          className="mobile-menu-button"
          type="primary"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}
        />

        {/* Drawer para mobile */}
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={toggleDrawer}
          visible={drawerVisible}
          width={250}
        >
          <Menu mode="inline" theme="dark">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link href="/">Início</Link>
            </Menu.Item>
            <Menu.Item key="about" icon={<UserOutlined />}>
              <Link href="/sobre">Sobre</Link>
            </Menu.Item>
            <Menu.Item key="services" icon={<FileOutlined />}>
              <Link href="/servicos">Serviços</Link>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </Layout>
  );
};

export default MenuWithLogo;
