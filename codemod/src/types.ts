import { Plugin } from "postcss";
import { PLUGIN_TYPE } from "./enums";

export type PluginData = { plugin: Plugin; type: PLUGIN_TYPE };
