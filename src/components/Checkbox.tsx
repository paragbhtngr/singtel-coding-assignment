import React, { ReactNode } from "react";
import "../assets/styles/globals.css";

interface ICheckboxProps {
  id?: string;
  handleClick?: () => void;
  isSelected?: boolean;
  children?: string | ReactNode;
  color?: string;
}

const Checkbox = ({
  id,
  isSelected,
  handleClick,
  children,
  color,
}: ICheckboxProps) => {
  return (
    <div className="checkbox" data-testid={id} id={id} onClick={handleClick}>
      <input type="checkbox" readOnly checked={isSelected} />
      <span
        className="checkmark"
        style={color && isSelected ? { backgroundColor: color } : {}}
      ></span>
      {children && <label htmlFor={id}>{children}</label>}
    </div>
  );
};

export default Checkbox;
