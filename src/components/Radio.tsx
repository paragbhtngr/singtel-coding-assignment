import React, { ReactNode } from "react";
import "../assets/styles/globals.css";

interface IRadioProps {
  id?: string;
  handleClick?: () => void;
  isSelected?: boolean;
  children?: string | ReactNode;
  color?: string;
}

const Radio = ({
  id,
  isSelected,
  handleClick,
  children,
  color,
}: IRadioProps) => {
  return (
    <div className="radio" data-testid={id} id={id} onClick={handleClick}>
      <input type="radio" readOnly checked={isSelected} />
      <span
        className="radiomark"
        style={color && isSelected ? { backgroundColor: color } : {}}
      ></span>
      {children && <label htmlFor={id}>{children}</label>}
    </div>
  );
};

export default Radio;
