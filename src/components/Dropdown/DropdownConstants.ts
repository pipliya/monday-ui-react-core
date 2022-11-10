import Chips from "../Chips/Chips";

export const defaultCustomStyles = (baseStyles: Record<string, any>) => baseStyles;
export const DropdownChipColor = {
  PRIMARY: Chips.colors.PRIMARY,
  NEGATIVE: Chips.colors.NEGATIVE,
  POSITIVE: Chips.colors.POSITIVE
};

export enum AutoHeightComponent {
  CONTAINER = "container",
  CONTROL = "control",
  VALUE_CONTAINER = "valueContainer"
}

export enum MenuPlacement {
  BOTTOM = "bottom",
  TOP = "top",
  AUTO = "auto"
}

export type Option = {
  /**
   * The textual label of an option
   */
  label: string;
  /**
   * Unique id of an option
   */
  value: string;
};

/** TODO: check **/
export const defaultNoMessageFunction = (): string => undefined;

/** TODO: check **/
export type selectPropsType = Record<string, unknown>;

/**TODO: check **/
export type customSelectProps = {
  /**
   * For display the drop down menu in overflow hidden/scroll container.
   */
  insideOverflowContainer: boolean;
};
