import React, { Fragment } from "react";

export default props => {
  return (
    <Fragment>
      {props.children}
      <div className="backdrop" onClick={props.hide} />
    </Fragment>
  );
};
