import React, { createRef } from "react";

export default props => {
  let backdrop = createRef();

  const onClick = event => {
    if (backdrop.current === event.target) props.hide();
  };

  return (
    <div ref={backdrop} className="backdrop" onClick={onClick}>
      {props.children}
    </div>
  );
};
