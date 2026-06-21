import React from 'react'
import "..//..//style/artisanDashboard/artisanDashboard.scss";
import ArtisanSlider from './artisanSlider';
import Overview from './dashboardPages/overview';
import Chat from '../chat/chat';
import { Outlet } from 'react-router-dom';

const ArtisanDashboard = () => {
  return (
    <div className='artisanDashboard'>
      <ArtisanSlider/>

      <Outlet/>
    </div>
  )
}

export default ArtisanDashboard;
