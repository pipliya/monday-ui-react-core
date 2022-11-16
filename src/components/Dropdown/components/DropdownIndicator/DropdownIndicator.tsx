/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { components, DropdownIndicatorProps as SelectDropdownIndicatorProps } from "react-select";
import Icon from "../../../Icon/Icon";
import DropdownChevronDown from "../../../Icon/Icons/components/DropdownChevronDown";
import { getIndicatorSize } from "../../Dropdown.styles";
import { SIZES } from "../../../../constants";

export type DropdownIndicatorProps = SelectDropdownIndicatorProps & { size: typeof SIZES[keyof typeof SIZES] };

const DropdownIndicator: FC<DropdownIndicatorProps> = props => {
  const { isDisabled, size } = props;
  return (
    <components.DropdownIndicator {...props} className="dropdown-indicator">
      <Icon
        iconType={Icon.type.SVG}
        icon={DropdownChevronDown}
        iconSize={getIndicatorSize(size)}
        tabindex="-1"
        clickable={!isDisabled}
      />
    </components.DropdownIndicator>
  );
};
export default DropdownIndicator;
