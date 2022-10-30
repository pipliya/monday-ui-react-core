import React, {FocusEvent, ForwardedRef, RefObject, useCallback, useMemo, useRef, useState} from "react";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import NOOP from "lodash/noop";
import { WindowedMenuList } from "react-windowed-select";
import PropTypes from "prop-types";
import cx from "classnames";
import { SIZES } from "../../constants";
import MenuComponent from "./components/menu/menu";
import DropdownIndicatorComponent from "./components/DropdownIndicator/DropdownIndicator";
import OptionComponent from "./components/option/option";
import SingleValueComponent from "./components/singleValue/singleValue";
import ClearIndicatorComponent from "./components/ClearIndicator/ClearIndicator";
import ValueContainer from "./components/ValueContainer/ValueContainer";
import {
  AutoHeightComponent,
  defaultCustomStyles,
  MenuPlacement,
  DropdownChipColor,
  Option,
  defaultNoMessageFunction
} from "./DropdownConstants";
import generateBaseStyles, { customTheme } from "./Dropdown.styles";
import Control from "./components/Control/Control";
import {KeyboardEventCallback, VibeComponentProps, ElementContent} from "../../types";
import "./Dropdown.scss";

export interface DropdownProps extends VibeComponentProps {
  /**
   * Placeholder to show when no value was selected
   */
  placeholder: string;
  /**
   * If set to true, dropdown will be disabled
   */
  disabled: boolean;
  /**
   * Called when menu is opened
   */
  onMenuOpen: () => void;
  /**
   * Open dropdown menu by controlled prop received from outside, no matter if the user pressed on the dropdown or not.
   */
  menuIsOpen: boolean;
  /**
   * Called when menu is closed
   */
  onMenuClose: () => void;
  /**
   * Called when key is pressed in the dropdown
   */
  onKeyDown: KeyboardEventCallback;
  /**
   * Called when focused
   */
  onFocus: (event: FocusEvent) => void;
  /**
   * Called when blurred
   */
  onBlur: (event: FocusEvent) => void;
  onClear:  () => void,
  /**
   * Called when selected value has changed
   */
  onChange: (option: Option, event: Event) => void;
  /**
   * Called when the dropdown's input changes.
   */
  onInputChange: (event: Event) => void,
  /**
   * If true, search in options will be enabled
   */
  searchable: boolean;
  /**
   * The dropdown options
   */
  options: Array<Option>,
  /**
   * Text to display when there are no options
   */
  noOptionsMessage: () => string,
  /**
   * If set to true, the menu will open when focused
   */
  openMenuOnFocus: boolean;
  /**
   * If set to true, the menu will open when clicked
   */
  openMenuOnClick: boolean;
  /**
   * If set to true, clear button will be added
   */
  clearable: boolean;
  /**
   * custom option render function
   */
  optionRenderer: (option: Option) => ElementContent
  /**
   * Backward compatibility for optionRenderer - please use optionRenderer instead
   */
  OptionRenderer:  (option: Option) => ElementContent;
  /**
   * custom value render function
   */
  valueRenderer: PropTypes.func,
  /**
   * custom menu render function
   */
  menuRenderer: PropTypes.func,
  /**
   * Default placement of the Dropdown menu in relation to its control. Use "auto" to flip the menu when there isn't enough space below the control.
   */
  menuPlacement: MenuPlacement,
  /**
   * If set to true, the dropdown will be in Right to Left mode
   */
  rtl: boolean;
  /**
   * Set default selected value
   */
  defaultValue: Option | Array<Option>;
  /**
   * The component's value.
   * When passed, makes this a [controlled](https://reactjs.org/docs/forms.html#controlled-components) component.
   */
  value:Option | Array<Option>;
  /**
   * Select menu size from `Dropdown.size` - Dropdown.size.LARGE | Dropdown.size.MEDIUM | Dropdown.size.SMALL
   */
  size: string;
  /**
   * If provided Dropdown will work in async mode. Can be either promise or callback
   */
  asyncOptions: Promise<Array<Option>> | (() => Array<Option>);
  /**
   * If set to true, fetched async options will be cached
   */
  cacheOptions: boolean;
  /**
   * If set, `asyncOptions` will be invoked with its value on mount and the resolved results will be loaded
   */
  defaultOptions: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object)]),
  /**
   * If set to true, the menu will use virtualization. Virtualized async works only with
   */
  isVirtualized: boolean;
  /**
   * Whether the menu should use a portal, and where it should attach
   */
  menuPortalTarget: null | HTMLElement
  /**
   * Custom function to override existing styles (similar to `react-select`'s `style` prop), for example: `base => ({...base, color: 'red'})`, where `base` is the component's default styles
   */
  extraStyles: PropTypes.func,
  /**
   * Maximum height of the menu before scrolling
   */
  maxMenuHeight: number;
  /**
   * Tab index for keyboard navigation purposes
   */
  tabIndex: number;
  /**
   * ID for the select container
   */
  id: string;
  /**
   * focusAuto when component mount
   */
  autoFocus: boolean;
  /**
   * If set to true, the dropdown will be in multi-select mode.
   * When in multi-select mode, the selected value will be an array,
   * and it will be displayed as our [`<Chips>`](/?path=/docs/components-chips--sandbox) component.
   */
  multi: boolean;
  /**
   * If set to true together with `multi`, it will make the dropdown expand to multiple lines when new values are selected.
   */
  multiline: boolean;
  /**
   Pass closeMenuOnSelect to close the multi choose any time an options is chosen.
   */
  closeMenuOnSelect: boolean;
  /**
   * callback to be called when `multiline` is `true` and the option is removed
   */
  onOptionRemove: (option: Option, e: Event) => void;
  /**
   The options set by default will be set as mandatory and the user will not be able to cancel their selection
   */
  withMandatoryDefaultOptions: boolean;
  /**
   * Override the built-in logic to detect whether an option is selected.
   */
  isOptionSelected: (option: Option, selectValue:ReadonlyArray<Option>) => boolean
  /**
   * For display the drop down menu in overflow hidden/scroll container.
   */
  insideOverflowContainer: boolean;
  /**
   * While using insideOverflowContainer, if the on of the dropdown container using transform animation please attached the ref to this container.
   */
  transformContainerRef: ForwardedRef<HTMLElement>,
  ref: RefObject<HTMLElement>;
}

const Dropdown = ({
  className,
  placeholder = "",
  disabled,
  onMenuOpen = NOOP,
  onMenuClose = NOOP,
  onFocus = NOOP,
  onBlur = NOOP,
  onChange: customOnChange = NOOP,
  searchable = true,
  options = [],
  defaultValue,
  value: customValue,
  noOptionsMessage = defaultNoMessageFunction,
  openMenuOnFocus,
  openMenuOnClick,
  clearable = false,
  OptionRenderer,
  optionRenderer,
  ValueRenderer,
  valueRenderer,
  menuRenderer,
  menuPlacement = MenuPlacement.BOTTOM,
  rtl,
  size = SIZES.MEDIUM,
  asyncOptions,
  cacheOptions,
  defaultOptions,
  isVirtualized,
  menuPortalTarget,
  extraStyles = defaultCustomStyles,
  maxMenuHeight,
  menuIsOpen,
  tabIndex = 0,
  id,
  autoFocus = false,
  multi = false,
  multiline = false,
  onOptionRemove: customOnOptionRemove,
  onOptionSelect,
  onClear,
  onInputChange = NOOP,
  closeMenuOnSelect = !multi,
  ref,
  withMandatoryDefaultOptions = false,
  isOptionSelected,
  insideOverflowContainer = false,
  transformContainerRef
} : DropdownProps) => {
  const controlRef = useRef();
  const overrideDefaultValue = useMemo(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue)
        ? defaultValue.map(df => ({ ...df, isMandatory: true }))
        : { ...defaultValue, isMandatory: true };
    }

    return defaultValue;
  }, [defaultValue]);

  const [selected, setSelected] = useState(overrideDefaultValue || []);
  const [isDialogShown, setIsDialogShown] = useState(false);
  const finalOptionRenderer = optionRenderer || OptionRenderer;
  const finalValueRenderer = valueRenderer || ValueRenderer;
  const isControlled = !!customValue;
  const selectedOptions = customValue ?? selected;
  const selectedOptionsMap = useMemo(() => {
    if (Array.isArray(selectedOptions)) {
      return selectedOptions.reduce((acc, option) => ({ ...acc, [option.value]: option }), {});
    }
    return {};
  }, [selectedOptions]);

  const value = multi ? selectedOptions : customValue;

  const styles = useMemo(() => {
    // We first want to get the default stylized groups (e.g. "container", "menu").
    const baseStyles = generateBaseStyles({
      size,
      rtl,
      insideOverflowContainer,
      controlRef,
      transformContainerRef
    });

    // Then we want to run the consumer's root-level custom styles with our "base" override groups.
    const customStyles = extraStyles(baseStyles);

    // Lastly, we create a style groups object that makes sure we run each custom group with our basic overrides.
    const mergedStyles = Object.entries(customStyles).reduce((accumulator, [stylesGroup, stylesFn]) => {
      return {
        ...accumulator,
        [stylesGroup]: (defaultStyles, state) => {
          const provided = baseStyles[stylesGroup] ? baseStyles[stylesGroup](defaultStyles, state) : defaultStyles;

          return stylesFn(provided, state);
        }
      };
    }, {});

    if (multi) {
      if (multiline) {
        AutoHeightComponent.forEach(component => {
          const original = mergedStyles[component];
          mergedStyles[component] = (provided, state) => ({
            ...original(provided, state),
            height: "auto"
          });
        });
      }

      const originalValueContainer = mergedStyles.valueContainer;
      mergedStyles.valueContainer = (provided, state) => ({
        ...originalValueContainer(provided, state),
        paddingLeft: 6
      });
    }

    return mergedStyles;
  }, [size, rtl, insideOverflowContainer, transformContainerRef, extraStyles, multi, multiline]);

  const Menu = useCallback(props => <MenuComponent {...props} Renderer={menuRenderer} />, [menuRenderer]);

  const DropdownIndicator = useCallback(props => <DropdownIndicatorComponent {...props} size={size} />, [size]);

  const Option = useCallback(
    props => <OptionComponent {...props} Renderer={finalOptionRenderer} />,
    [finalOptionRenderer]
  );

  const Input = useCallback(props => <components.Input {...props} aria-label="Dropdown input" />, []);

  const SingleValue = useCallback(
    props => <SingleValueComponent {...props} Renderer={finalValueRenderer} />,
    [finalValueRenderer]
  );

  const ClearIndicator = useCallback(props => <ClearIndicatorComponent {...props} size={size} />, [size]);

  const onOptionRemove = useMemo(() => {
    if (customOnOptionRemove) {
      return (optionValue, e) => customOnOptionRemove(selectedOptionsMap[optionValue], e);
    }
    return function (optionValue, e) {
      setSelected(selected.filter(option => option.value !== optionValue));
      e.stopPropagation();
    };
  }, [customOnOptionRemove, selected, selectedOptionsMap]);

  const customProps = useMemo(
    () => ({
      selectedOptions,
      onSelectedDelete: onOptionRemove,
      setIsDialogShown,
      isDialogShown,
      isMultiline: multiline,
      insideOverflowContainer,
      controlRef
    }),
    [selectedOptions, onOptionRemove, isDialogShown, multiline, insideOverflowContainer]
  );

  /** TODO: check after update**/
      // TODO: find better type for event
  const onChange = (option: Option, event: Event & {action: string}) => {
    if (customOnChange) {
      customOnChange(option, event);
    }

    switch (event.action) {
      case "select-option": {
        const selectedOption = multi ? event.option : option;

        if (onOptionSelect) {
          onOptionSelect(selectedOption);
        }

        if (!isControlled) {
          setSelected([...selected, selectedOption]);
        }
        break;
      }

      case "clear":
        if (onClear) {
          onClear();
        }

        if (!isControlled) {
          if (withMandatoryDefaultOptions) setSelected(overrideDefaultValue);
          else setSelected([]);
        }
        break;
    }
  };

  const DropDownComponent = asyncOptions ? AsyncSelect : Select;

  const asyncAdditions = {
    ...(asyncOptions && {
      loadOptions: asyncOptions,
      cacheOptions,
      ...(defaultOptions && { defaultOptions })
    })
  };

  const additions = {
    ...(!asyncOptions && { options }),
    ...(multi && {
      isMulti: true
    })
  };

  const closeMenuOnScroll = useCallback(() => insideOverflowContainer, [insideOverflowContainer]);

  return (
    <DropDownComponent
      className={cx("dropdown-wrapper", className)}
      selectProps={customProps}
      components={{
        DropdownIndicator,
        Menu,
        ClearIndicator,
        Input,
        Option,
        Control,
        ...(finalValueRenderer && { SingleValue }),
        ...(multi && {
          MultiValue: NOOP, // We need it for react-select to behave nice with "multi"
          ValueContainer
        }),
        ...(isVirtualized && { MenuList: WindowedMenuList })
      }}
      // When inside scroll we set the menu position by js and we can't follow the drop down location while use scrolling
      closeMenuOnScroll={closeMenuOnScroll}
      size={size}
      noOptionsMessage={noOptionsMessage}
      placeholder={placeholder}
      isDisabled={disabled}
      isClearable={clearable}
      isSearchable={searchable}
      defaultValue={defaultValue}
      value={value}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onInputChange={onInputChange}
      openMenuOnFocus={openMenuOnFocus}
      openMenuOnClick={openMenuOnClick}
      isRtl={rtl}
      styles={styles}
      theme={customTheme}
      maxMenuHeight={maxMenuHeight}
      menuPortalTarget={menuPortalTarget}
      menuPlacement={menuPlacement}
      menuIsOpen={menuIsOpen}
      tabIndex={tabIndex}
      id={id}
      autoFocus={autoFocus}
      closeMenuOnSelect={closeMenuOnSelect}
      ref={ref}
      withMandatoryDefaultOptions={withMandatoryDefaultOptions}
      isOptionSelected={isOptionSelected}
      {...asyncAdditions}
      {...additions}
    />
  );
};

Object.assign(Dropdown, {
  size: SIZES,
  chipColors: DropdownChipColor,
  autoHeightComponents: AutoHeightComponent
});

export default Dropdown;
