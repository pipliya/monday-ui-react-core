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

class BaseMenuPropsImpl implements BaseMenuProps {
  children: ElementContent;
  className: string | undefined;

  clearValue(): void {}

  cx(state: ClassNamesState, className: string | undefined): string {
    return "";
  }

  getStyles<Key>(propertyName: Key, props: StylesProps<unknown, boolean, GroupBase<unknown>>[Key]): CSSObjectWithLabel {
    return undefined;
  }

  getValue(): Options<unknown> {
    return undefined;
  }

  hasValue: boolean;
  innerProps: JSX.IntrinsicElements["div"];
  innerRef: React.Ref<HTMLDivElement>;
  isLoading: boolean;
  isMulti: boolean;
  isRtl: boolean;
  maxMenuHeight: number;
  menuPlacement: MenuPlacement;
  menuPosition: MenuPosition;
  menuShouldScrollIntoView: boolean;
  minMenuHeight: number;
  options: OptionsOrGroups<unknown, GroupBase<unknown>>;
  placement: CoercedMenuPlacement;

  selectOption(newValue: unknown): void {}

  selectProps: Props<unknown, boolean, GroupBase<unknown>> & { selectProps?: MenuProps & selectPropsType };

  setValue(newValue: OnChangeValue<unknown, boolean>, action: SetValueAction, option: unknown | undefined): void {}

  theme: Theme;
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
