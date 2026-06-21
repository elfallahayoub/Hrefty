import React from "react";
import "..//..//..//style/homePage/Artisans/Artisan.scss";

const Artisan = ({ artisanId, artisanNom, artisanSpecialite, artisanImg }) => {
  const clientRating = (id) => {
    window.location.href = `/profile/${id}`;
  };
  return (
    <div onClick={() => clientRating(artisanId)} className="Artisan">
      <img src={`http://localhost:8000/${artisanImg}`} />
      <div className="content">
        <h1>{artisanNom}</h1>
        <p>{artisanSpecialite}</p>
      </div>
    </div>
  );
};

export default Artisan;
