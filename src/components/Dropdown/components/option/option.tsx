/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { components, OptionProps as SelectOptionProps } from "react-select";
import Tooltip from "../../../Tooltip/Tooltip";
import "./option.scss";

export type OptionProps = SelectOptionProps & { Renderer: FC; data: { tooltipProps: Record<string, any> } };
const Option: FC<OptionProps> = ({ Renderer, data, ...props }) => {
  const { content, ...tooltipProps } = data.tooltipProps || {};
  const RendererComponent = Renderer as FC<typeof data>;

  return (
    <Tooltip content={content} {...tooltipProps} position={Tooltip.positions.RIGHT}>
      {Renderer ? (
        <components.Option data={data} {...props} className="dropdown-wrapper__option--reset">
          <RendererComponent {...data} />
        </components.Option>
      ) : (
        <components.Option data={data} {...props} className="dropdown-wrapper__option--reset" />
      )}
    </Tooltip>
  );
};

export default Option;
