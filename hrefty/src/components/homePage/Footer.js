import React from "react";
import "..//..//style/homePage/Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="row1">
        <div className="sec-right">
          <h1>شعار</h1>
          <p>
            مرحبًا بك في منصتنا الذكية التي تم تصميمها خصيصًا لربط العملاء
            بالحرفيين الموثوقين بطريقة سهلة وسريعة وآمنة.
          </p>
        </div>
        <div className="sec-left">
          <div className="sec sec1">
            <div className="h1">
              <h1>الصفحات</h1>
            </div>
            <div className="ul">
              <ul>
                <li>عن موقعنا</li>
                <li>الخدمات</li>
                <li>المهنيون</li>
                <li>المدونة</li>
              </ul>
            </div>
          </div>
          <div className="sec sec2">
            <div className="h1">
              <h1>الشروط والسياسات</h1>
            </div>
            <div className="ul">
              <ul>
                <li>سياسة الخصوصية</li>
                <li>اتفاقية الاستخدام</li>
                <li>اتصل بنا</li>
              </ul>
            </div>
          </div>
          <div className="sec sec3">
            <div className="h1">
              <h1>معلومات التواصل</h1>
            </div>
            <div className="ul">
              <ul>
                <li>الهاتف: 0614615551</li>
                <li>البريد الالكتروني: zradmed@gmail.com</li>
              </ul>
            </div>
            <div className="icons">
              <ul>
                <li>
                  <FontAwesomeIcon icon={faFacebook} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faInstagram} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faTwitter} />
                </li>
                <li>
                  <FontAwesomeIcon icon={faLinkedin} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row2">
        <h1>جميع الحقوق محفوظة لدى منصة Hrefty.com</h1>
        <button className="btn">الرجوع الى الاعلى</button>
      </div>
    </div>
  );
};

export default Footer;
