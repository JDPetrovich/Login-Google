"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Style from "./SidebarAdmin.module.css";
import { Layout, Menu } from "antd";
import {
  UserAddOutlined,
  ProfileOutlined,
  MedicineBoxOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

function SidebarAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: "Gatinhos", key: "gatinhos", icon: <UserAddOutlined /> },
    { label: "Recebimentos", key: "recebimentos", icon: <TeamOutlined /> },
    { label: "Vacinas", key: "vacinas", icon: <MedicineBoxOutlined /> },
    { label: "Castrações", key: "castracoes", icon: <SafetyCertificateOutlined /> },
    { label: "Solicitações", key: "solicitacoes", icon: <ProfileOutlined /> },
    { label: "Formulários de Adoção", key: "formularios", icon: <FileTextOutlined /> },
    { label: "Feedbacks", key: "feedbacks", icon: <ProfileOutlined /> },
    { label: "Configurações", key: "config", icon: <SettingOutlined /> },
    { 
      label: "Sair", 
      key: "logout", 
      icon: <LogoutOutlined />, 
      onClick: () => {
        sessionStorage.removeItem("token");
        router.replace("/admin/login");
      }
    }
  ];

  const handleClick = (key) => {
    if (key === "logout") return;
    router.push(`/admin/${key}`);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={Style.sidebar}
    >
      <div className={Style.logoSection}>
        <UserAddOutlined className={Style.logoIcon} />
        {!collapsed && <span className={Style.title}>Painel Admin</span>}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[menuItems.find(item => pathname.includes(item.key))?.key]}
        items={menuItems.map(item => ({
          ...item,
          onClick: () => {
            item.onClick ? item.onClick() : handleClick(item.key);
          }
        }))}
      />
    </Sider>
  );
}

export default SidebarAdmin;