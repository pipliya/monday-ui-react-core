import React from "react";
import cx from "classnames";
import { components, MenuProps } from "react-select";
import { ElementContent } from "../../../../types";
import "./menu.scss";

export interface BaseMenuProps {
  children?: ElementContent;
}
export interface VibeMenuProps extends BaseMenuProps {
  Renderer?: (props: BaseMenuProps) => ElementContent;
  selectProps?: MenuProps;
}
const Menu: React.FC<VibeMenuProps> = props => {
  const { children, Renderer, selectProps } = props;
  const menuProps = selectProps as MenuProps;
  // @ts-ignore TODO fix to right type
  const withFixedPosition = selectProps?.selectProps?.insideOverflowContainer;
  return (
    <components.Menu
      {...menuProps}
      className={cx("menu", "dropdown-menu-wrapper", { ["dropdown-menu-wrapper--fixed-position"]: withFixedPosition })}
    >
      {Renderer && Renderer(props)}
      {!Renderer && children}
    </components.Menu>
  );
};

export default Menu;
