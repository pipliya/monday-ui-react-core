import { replaceTypographyTokensPlugin } from "./replace-typography-tokens";
import { PluginData } from "../types";
import { PLUGIN_TYPE } from "../enums";

const STYLE_PLUGINS_ARRAY = [replaceTypographyTokensPlugin];

export const plugins = new Map<string, PluginData>(
  STYLE_PLUGINS_ARRAY.map(plugin => [plugin.postcssPlugin, { plugin, type: PLUGIN_TYPE.STYLE }])
);
