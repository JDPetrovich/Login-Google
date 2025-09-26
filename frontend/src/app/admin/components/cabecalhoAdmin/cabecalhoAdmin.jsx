"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Style from "./cabecalhoAdmin.module.css";
import { Layout, Typography, Drawer, Menu, Button } from "antd";
import {
  UserAddOutlined,
  ProfileOutlined,
  MedicineBoxOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  MenuOutlined
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

function CabecalhoAdmin() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  const menuItems = [
    { label: "Gatinhos", key: "gatinhos", icon: <UserAddOutlined /> },
    { label: "Recebimentos", key: "recebimentos", icon: <TeamOutlined /> },
    { label: "Vacinas", key: "vacinas", icon: <MedicineBoxOutlined /> },
    { label: "Castrações", key: "castracoes", icon: <SafetyCertificateOutlined /> },
    { label: "Solicitações", key: "solicitacoes", icon: <ProfileOutlined /> },
    { label: "Formulários de Adoção", key: "formularios", icon: <FileTextOutlined /> },
    { label: "Feedbacks", key: "feedbacks", icon: <ProfileOutlined /> },
    { label: "Configurações", key: "config", icon: <SettingOutlined /> }
  ];

  return (
    <Header className={Style.cabecalho}>
      <div className={Style.logoSection}>
        <UserAddOutlined className={Style.logoIcon} />
        <Title level={3} className={Style.title}>
          Painel Admin
        </Title>
      </div>

      <div className={Style.desktopMenu}>
        {menuItems.map((item) => {
          const isActive = pathname.includes(item.key);
          return (
            <Link
              key={item.key}
              href={`/admin/${item.key}`}
              className={`${Style.menuItem} ${isActive ? Style.activeMenuItem : ""}`}
            >
              {item.icon} {item.label}
            </Link>
          );
        })}
      </div>

      <Button className={Style.mobileMenu} type="text" onClick={showDrawer}>
        <MenuOutlined />
      </Button>

      <Drawer
        title="Menu Admin"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        className={Style.drawerMenu}
      >
        <Menu
          items={menuItems.map(item => ({
            ...item,
            onClick: () => {
              router.push(`/admin/${item.key}`);
              closeDrawer();
            }
          }))}
          mode="vertical"
        />
      </Drawer>
    </Header>
  );
}

export default CabecalhoAdmin;