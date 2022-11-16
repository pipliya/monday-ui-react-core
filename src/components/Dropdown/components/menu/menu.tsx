import React from "react";
import cx from "classnames";
import { components, MenuProps as SelectMenuProps } from "react-select";
import { ElementContent } from "../../../../types";
import "./menu.scss";

export type MenuProps = SelectMenuProps & {
  Renderer: (props: any) => ElementContent;
};

export interface BaseMenuProps {
  children?: ElementContent;
}
export interface VibeMenuProps extends BaseMenuProps {
  Renderer?: (props: BaseMenuProps) => ElementContent;
  selectProps?: MenuProps;
}
const Menu: React.FC<MenuProps> = props => {
  const { children, Renderer, selectProps } = props;
  // @ts-ignore TODO fix to right type
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
