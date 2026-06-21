import React from 'react'
import DashboardSlider from './dashboardSlider';
import "..//..//style/clientDashboard/clientDashboard.scss";

import Overview from './dashboardPages/overview';
import Chat from '../chat/chat';
import { Outlet } from 'react-router-dom';

const ClientDashboard = () => {
  return (
    <div className='clientDashboard'>
      <DashboardSlider/>
      <Outlet/>
    </div>
  )
}

export default ClientDashboard;
