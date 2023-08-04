import React, { ReactNode } from "react";
import "../assets/styles/globals.css";

interface ICheckboxProps {
  handleClick?: () => void;
  isSelected?: boolean;
  children?: string | ReactNode;
}

const Checkbox = ({ isSelected, handleClick, children }: ICheckboxProps) => {
  return (
    <div className="checkbox" onClick={handleClick}>
      <input type="checkbox" checked={isSelected} />
      <span className="checkmark"></span>
      <label>{children}</label>
    </div>
  );
};

export default Checkbox;
