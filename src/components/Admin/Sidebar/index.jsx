import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router'

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation()
  const menuItems = [
    { title: t("adminRoot.sidebar.guests"), path: "/admin" },
    { title: t("adminRoot.sidebar.program"), path: "/admin/logo" },
    { title: t("adminRoot.sidebar.faq"), path: "/admin/faq" },
  ];
  const checkActive = (itemPath) => {
    if (itemPath === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <aside id="sidebar">
      <p className="logo">{t("adminRoot.sidebar.navigation")}</p>
      <ul className="sidebarMenu">
        {menuItems.map((item, index) => (
          <li key={index} className={checkActive(item.path) ? "activeLi" : ""}>
            <Link to={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
