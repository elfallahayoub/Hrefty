import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "..//..//..//style/homePage/Features/Feature.scss";

const Feature = ({ featureId, featureTitle, featureParagraph, featureIcon }) => {
  return (
    <div className="Feature">
      <div className="span">
        <span className="sp1"><FontAwesomeIcon icon={featureIcon}/></span>
        <span className="sp2">#{featureId}</span>
      </div>
      <h1>{featureTitle}</h1>
      <p>{featureParagraph}</p>
    </div>
  );
};

export default Feature;
