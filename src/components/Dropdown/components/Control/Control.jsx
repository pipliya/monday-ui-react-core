import React from "react";
import { components } from "react-select";

const Control = props => {
  const { controlRef } = props;
  const control = <components.Control {...props} />;
  if (controlRef)
    return (
      <div className="monday-dropdown_scrollable-wrapper" ref={controlRef}>
        {control}
      </div>
    );
  return control;
};

export default Control;
