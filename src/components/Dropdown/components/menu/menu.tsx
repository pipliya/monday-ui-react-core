import React from "react";
import cx from "classnames";
import { components, MenuProps } from "react-select";
import { ElementContent } from "../../../../types";
import { selectPropsType } from "../../DropdownConstants";
import "./menu.scss";

export interface BaseMenuProps extends MenuProps {
  children?: ElementContent;
  selectProps?: { selectProps?: MenuProps & selectPropsType };
}
export interface VibeMenuProps extends BaseMenuProps {
  Renderer?: (props: BaseMenuProps) => ElementContent;
}
const Menu: React.FC<VibeMenuProps> = props => {
  const { children, Renderer, selectProps } = props;
  const withFixedPosition = selectProps?.selectProps?.insideOverflowContainer;
  return (
    <components.Menu
      {...props}
      className={cx("menu", "dropdown-menu-wrapper", { ["dropdown-menu-wrapper--fixed-position"]: withFixedPosition })}
    >
      {Renderer && Renderer(props)}
      {!Renderer && children}
    </components.Menu>
  );
};

export default Menu;
