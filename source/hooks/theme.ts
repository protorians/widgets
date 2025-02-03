import {Environment} from "../environment";
import {ITheme} from "../types";

export function useTheme(settings: ITheme) {
  if (Environment.Client) {
    Object.entries(settings)
      .forEach(([key, value]) => document.documentElement.style.setProperty(`--widget-theme-${key}`, `${value}`))
  }
}