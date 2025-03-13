import {ITheme} from "../types/index.js";
import {Environment} from "@protorians/core";

export function useTheme(settings: ITheme) {
    if (Environment.Client) {
        Object.entries(settings)
            .forEach(([key, value]) => document.documentElement.style.setProperty(`--widget-theme-${key}`, `${value}`))
    }
}