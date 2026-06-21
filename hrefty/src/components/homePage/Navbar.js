import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "..//..//style/homePage/Navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="Navbar">
      <div className="navbarRight">شعار</div>
      <div className="navbarLeft">
        <ul className="routerLinks">
          <NavLink to={"/"} className="home link">
            الرئيسية
          </NavLink>
          <NavLink to={"/services"} className="link">
            الخدمات
          </NavLink>
          <NavLink to={"/techniciens"} className="link">
            المهنيون
          </NavLink>
          {/* <li className='link'>المدونة</li> */}
        </ul>
        <div className="buttons">
          {!user ? (
            <NavLink to="/login" className="btn">
              دخول
            </NavLink>
          ) : user.role === "client" ? (
            <NavLink to="/client_panel" className="btn">
              لوحة التحكم
            </NavLink>
          ) : (
            <NavLink to="/technicien_panel" className="btn">
              لوحة التحكم
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
