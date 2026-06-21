import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "..//..//..//style/homePage/Artisans/Artisans.scss";
import Artisan from "./Artisan";
import { useDispatch, useSelector } from "react-redux";
import { artisansList } from "../../../redux/Slices/pageArtisansSlice";
import { NavLink } from "react-router-dom";

const Artisans = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
  };
  // const artisans = [
  //   { Nom: "أحمد الحرفي", Profession: "نجار" },
  //   { Nom: "فاطمة الزهراء", Profession: "خياطة" },
  //   { Nom: "يوسف الحداد", Profession: "حداد" },
  //   { Nom: "مريم الطرازي", Profession: "طرّازة" },
  //   { Nom: "علي البلاطي", Profession: "عامل بلاط" },
  //   { Nom: "خالد الكهربائي", Profession: "كهربائي" },
  //   { Nom: "سعيد السباك", Profession: "سبّاك" },
  //   { Nom: "هشام الدهان", Profession: "دهّان" },
  //   { Nom: "نورا المصممة", Profession: "مصممة أزياء" },
  //   { Nom: "حسن الميكانيكي", Profession: "ميكانيكي" },
  // ];

  const dispatch = useDispatch();

  const artisans = useSelector((state) => state.artisans.listArtisans);
  const [listArtisans, setListArtisans] = useState([]);
  useEffect(() => {
    dispatch(artisansList()); // ← parentheses ici
  }, [dispatch]);
  useEffect(() => {
    setListArtisans(artisans || []);
  }, [artisans]);
  console.log(artisans);

  return (
    <div className="Artisans">
      <div className="descreption">
        <h1>~ مجموعة من المهنيين ~</h1>
        <p>
          تعرف على المزيد من المهنيين المحترفين{" "}
          <NavLink to={"/techniciens"} className="btn">
            المزيد
          </NavLink>
        </p>
      </div>
      <div className="content">
        <Slider {...settings}>
          {artisans.map((artisan, index) => (
            <Artisan
              key={index}
              artisanId={artisan.user.id}
              artisanNom={artisan.nom}
              artisanSpecialite={artisan.specialite.nom}
              artisanImg={artisan.photo}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Artisans;
