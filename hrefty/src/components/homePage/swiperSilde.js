import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "..//..//style/homePage/swiperSlide.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { listAds } from "../../redux/Slices/adminSlice";

export default () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAds());
  }, [dispatch]);
  const ads = useSelector((state) => state.admin.ads);
  console.log(ads);
  return (
    <div
      className="m-auto"
      style={{ width: "500px" }}
      onMouseEnter={() => swiperInstance.autoplay.stop()} // Arrête autoplay
      onMouseLeave={() => swiperInstance.autoplay.start()} // Reprend autoplay
    >
      <Swiper
        onSwiper={setSwiperInstance}
        className="swiper"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        // spaceBetween={50}
        slidesPerView={1}
        // navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
      >
        {ads &&
          ads
            .filter((ad) => ad.actif != false)
            .map((ad) => (
              <SwiperSlide>
                <img
                  style={{ width: "100%" }}
                  src={`http://localhost:8000/${ad.image}`}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};
