import React from "react";
// import "..//..//style/artisanDashboard/artisanDashboard.scss";
// import ArtisanSlider from './artisanSlider';
// import Overview from './dashboardPages/overview';
import AdminSlider from "./adminSlider";
import Techniciens from "./dashboardPages/techniciens";
import Demandes_offres from "./dashboardPages/demandes_offres";
import { Outlet } from "react-router-dom";
// import Chat from '../chat/chat';

const AdminDashboard = () => {
  return (
    <div className="artisanDashboard">
      <AdminSlider />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
