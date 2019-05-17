import React, { createRef } from "react";

export default ({ children, hide = () => {}, className = [] }) => {
  let backdrop = createRef();

  const onClick = event => {
    if (backdrop.current === event.target) hide();
  };

  return (
    <div ref={backdrop} className={`backdrop ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
