import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminHeader from '../../components/Admin/Header';
import Sidebar from '../../components/Admin/Sidebar';

const AdminRoot = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      document.body.style.background = "#F0F0F0";
    } else {
      document.body.style.background = ""; // default (CSS-dən gələn rəng)
    }
  }, [location.pathname]);

  return (
    <div className="adminGridLayout">
      <AdminHeader />
      <Sidebar />
      <Outlet />
    </div>

  )
}

export default AdminRoot