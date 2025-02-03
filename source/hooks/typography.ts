import {ITypographySettings} from "../types";
import {Environment} from "../environment";


export function useTypography(settings: ITypographySettings) {
  if (Environment.Client) {
    requestAnimationFrame(() =>
      Object.entries(settings)
        .forEach(([key, value]) =>
          document.documentElement.style.setProperty(`--widget-typography-${key}`, value))
    )
  }
}