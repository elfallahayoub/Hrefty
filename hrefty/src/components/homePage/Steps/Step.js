import React from "react";
import "..//..//..//style/homePage/Steps/Step.scss";

const Step = ({ Titre, Steps, Image }) => {
  return (
    <div className="Step">
      <div className="img">
        <img src={Image} />
      </div>
      <div className="content">
        <h1>{Titre}</h1>
        <ul>
          {Steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
        <button className="btn">تسجيل</button>
      </div>
    </div>
  );
};

export default Step;
