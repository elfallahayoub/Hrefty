import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "..//..//..//style/homePage/signCard/signCard.scss";
import { Navigate, useNavigate } from "react-router-dom";

const SignCard = ({
  signCardImage,
  signCardTitle,
  signCardParagraph,
  buttonContent,
  buttonPath,
}) => {
  const navigate = useNavigate();

  return (
    <div className="signCard">
      <img src={signCardImage} alt="" />
      <div className="signCardContent">
        <h1 className="title">{signCardTitle}</h1>
        <p className="paragraph">{signCardParagraph}</p>
        <button onClick={() => navigate(buttonPath)} className="btn">
          {buttonContent}
        </button>
      </div>
    </div>
  );
};

export default SignCard;
