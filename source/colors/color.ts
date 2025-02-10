import type {
  IColorExtended,
  IColorKey,
  IColorScheme,
  IColorSchemes,
  IColorSlots, IStyleSheet,
  IStyleSheetDeclarations
} from "../types";
import {ColorSchemes} from "../enums";
import {Colorimetric} from "./colorimetric";
import Oklch = Colorimetric.Oklch;
import {Environment} from "../environment";
import {WidgetStyleSheet} from "../style";


const schemes: IColorSchemes = {
  light: {} as IColorSlots,
  dark: {} as IColorSlots,
}

export class ColorScheme {

  static generates(type: ColorSchemes, declarations: IColorScheme): IColorSlots {
    Object.keys(declarations)
      .forEach(key => {
        schemes[type] = {...schemes[type], ...Colorimetric.generates(key as IColorKey, declarations[key])}
      })
    return schemes[type];
  }

  static detect() {
    return (window.matchMedia)
      ? (
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? ColorSchemes.Dark
          : ColorSchemes.Light
      )
      : undefined;
  }


  static set current(scheme) {
    scheme = scheme || this.detect();
    const noUse = document.documentElement.hasAttribute('theme:no-scheme')

    if (!noUse) {
      document.documentElement.setAttribute('theme:scheme', `${scheme as string}`)
    }
  }


  static get current() {
    const noUse = document.documentElement.hasAttribute('theme:no-scheme')

    if (!noUse) {
      return (document.documentElement.getAttribute('theme:scheme') || this.detect()) as ColorSchemes
    }
    return undefined;
  }


}


export class ColorPalette {

  static _stylesheet: IStyleSheet | undefined;

  static light: IColorScheme = {
    one: 'oklch(56.29% 0.1933 256.16)',
    two: 'oklch(67.51% 0.1493 246.05)',
    three: 'oklch(48.7% 0.1959 328.46)',
    four: 'oklch(43.74% 0.1762 297.9)',
    five: 'oklch(37.37% 0.1806 267.58)',
    text: 'oklch(12.75% 0.0375 251.46)',
    tint: 'oklch(95.21% 0 0)',
    error: 'oklch(48.42% 0.1891 28.19)',
    warning: 'oklch(80.81% 0.1613 103.51)',
    success: 'oklch(55.04% 0.1827 142.37)',
    white: 'oklch(100% 0 0)',
    black: 'oklch(0% 0 0)',
  }

  static dark: IColorScheme = {
    one: 'oklch(43.71% 0.1933 256.16)',
    two: 'oklch(32.49% 0.1493 246.05)',
    three: 'oklch(51.3% 0.1959 328.46)',
    four: 'oklch(56.26% 0.1762 297.9)',
    five: 'oklch(62.63% 0.1806 267.58)',
    text: 'oklch(87.25% 0.0375 251.46)',
    tint: 'oklch(4.79% 0 0)',
    error: 'oklch(51.58% 0.1891 28.19)',
    warning: 'oklch(19.19% 0.1613 103.51)',
    success: 'oklch(44.96% 0.1827 142.37)',
    white: 'oklch(100% 0 0)',
    black: 'oklch(0% 0 0)',
  }

  protected static declarations: IStyleSheetDeclarations = {} as IStyleSheetDeclarations;

  static stylesheet(): IStyleSheet {
    return (
      this._stylesheet || (new WidgetStyleSheet({attach: true}))
    )
  }

  static value<T extends IColorExtended<IColorKey>>(key: T) {
    const schemes = Object.values(ColorSchemes);

    const parsed = schemes
      .map(type => {

        if (!type) return undefined;

        const scheme = this[type]
        const xpath = `${key as string}`.split('-')
        const color = scheme[xpath[0]] || undefined

        if (!color) return undefined;

        const parsed = Colorimetric.Oklch.parse(color);
        if (!parsed) return undefined;

        const variants = xpath.slice(1);
        let value = Oklch.toString(parsed);

        if (variants.length === 1) {
          const variant = variants[0].toLowerCase();

          if (!isNaN(parseInt(variant))) {
            value = Oklch.toString({...parsed, lightness: 100 - (parseInt(variant) * .10)})
          } else if (variant === 'alpha') {
          } else if (variant === 'rgb') {
          } else if (variant === 'invert') {
          } else if (variant === 'intensity') {

          }

        } else if (variants.length === 2) {
          // console.warn('Deep 2',color, variants)
        }

        // if (!this.record(key, value)) return undefined

        this.declarations[`--color-${type}-${key}`] = value;

        return {
          type,
          value
        };
      })
      .filter(v => typeof v !== 'undefined')

    if (Environment.Client) {
      this.declarations[`--color-${key}`] = `light-dark(${
        parsed.map(({type}) =>
          `var(--color-${type}-${key})`
        ).join(',')
      })`

      this.stylesheet()?.update({':root': this.declarations,})
    }

    return `var(--color-${key})`;
  }


}

//
// const paletteProxy = new Proxy({}, {
//   get(target: {}, p: string | symbol, receiver: any): any {
//   }
// })

export class Color {

  static hex = '';

  static rgb = '';

  static rgba = '';

  static oklch = '';


  // static palette =

}

