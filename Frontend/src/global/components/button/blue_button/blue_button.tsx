import React, { MouseEventHandler } from "react";
import { Link, Path } from "react-router-dom";
import "./blueButton_css.css";
const BlueButton = ({
  text,
  clickFunction,
}: {
  text: string;
  clickFunction: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button onClick={clickFunction} className="blueButton">
      {text}
    </button>
  );
};

export default BlueButton;
