import React from "react";
import "..//..//style/artisanDashboard/artisanSlider.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCheckCircle,
  faFileImport,
  faCog,
  faRightFromBracket,
  faReceipt,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/Slices/authSlice";
import { useDispatch } from "react-redux";

const ArtisanSlider = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch()
  return (
    <div className="artisanSlider">
      <div className="sliderRight">
        {user && (
          <>
            <img src={`http://localhost:8000/${user.artisan.photo}`} />
            <h1>{user.artisan.nom}</h1>
          </>
        )}
      </div>
      <div className="sliderLeft">
        <NavLink to="/technicien_panel" className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faHome} className="ml-2" />
          </div>
          <div className="text">الرئيسية</div>
        </NavLink>
        <NavLink to="/technicien_panel/chat" className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faComment} className="ml-2" />
          </div>
          <div className="text">المحادثات</div>
        </NavLink>
        {/* <NavLink className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faCog} className="ml-2" />
          </div>
          <div className="text">اعدادات الحساب</div>
        </NavLink> */}
        <NavLink onClick={()=>dispatch(logout())} className="btn">
          <div className="icon">
            <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
          </div>
          <div className="text">تسجيل الخروج</div>
        </NavLink>
      </div>
    </div>
  );
};

export default ArtisanSlider;
