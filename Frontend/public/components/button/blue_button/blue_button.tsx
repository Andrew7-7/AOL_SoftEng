import React from "react";
import { Link } from "react-router-dom";
const BlueButton = ({link,text}) => {
  return (
    
      <Link to={link} className="blueButton">{text}</Link>
    
  );
};

export default BlueButton
