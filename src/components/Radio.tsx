import React, { ReactNode } from "react";
import "../assets/styles/globals.css";

interface IRadioProps {
  handleClick?: () => void;
  isSelected?: boolean;
  children?: string | ReactNode;
}

const Radio = ({ isSelected, handleClick, children }: IRadioProps) => {
  return (
    <div className="radio" onClick={handleClick}>
      <input type="radio" checked={isSelected} />
      <span className="radiomark"></span>
      {children && <label>{children}</label>}
    </div>
  );
};

export default Radio;
