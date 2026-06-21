import React from "react";
import "..//..//style/adminDashboard/adminSlider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCheckCircle,
  faFileImport,
  faCog,
  faRightFromBracket,
  faReceipt,
  faComment,
  faUser,
  faBox,
  faList,
  faFile,
  faCartShopping,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const AdminSlider = () => {
  return (
    <div className="adminSlider">
      <div className="sliderRight">
        <img src="imgs/images.jpeg" />
        <h1>الاسم</h1>
      </div>
      <div className="sliderLeft">
        <NavLink to='/admin_panel' className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faHome} className="ml-2" />
          </div>
          <div className="text">الرئيسية</div>
        </NavLink>
        <NavLink to='/admin_panel/techniciens' className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faUser} className="ml-2" />
          </div>
          <div className="text">عرض ملفات الحرفيين</div>
        </NavLink>
        <NavLink to='/admin_panel/demandes_offres' className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faListCheck} className="ml-2" />
          </div>
          <div className="text">الطلبات والعروض</div>
        </NavLink>
        {/* <NavLink className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faFile} className="ml-2" />
          </div>
          <div className="text">ادارة المحتوى</div>
        </NavLink> */}
        <NavLink className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
          </div>
          <div className="text">تسجيل الخروج</div>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSlider;
