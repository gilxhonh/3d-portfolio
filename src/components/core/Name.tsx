import React from "react";
import "./Name.css";

interface NameProps {
  children: React.ReactNode;
}

const Name: React.FC<NameProps> = (props) => {
  const { children } = props;
  return (
    <div className="container">
      <p className="glitch">
        <span aria-hidden="true">{children}</span>
        {children}
        <span aria-hidden="true">{children}</span>
      </p>
    </div>
  );
};

export default Name;
