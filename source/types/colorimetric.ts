import {ColorimetricType} from "../enums";

export type IColorimetricSettings = {
  type: ColorimetricType
}

export type IColorSlots = {
  [K in IColorExtended<string>]: string
}

export type IColorAspects = 'outline' | 'semi' | 'link' | 'semi-outline';

// export type IColorScheme = {
//   light: ISignalController<IColorPalette>;
//   dark: ISignalController<IColorPalette>;
// }

export type IColorOklch = {
  lightness: number;
  chroma: number;
  hue: number;
  alpha?: number;
}

export type IColorLch = IColorOklch

export type IColorLab = {
  l: number;
  a: number;
  b: number;
}

export type IColorXyz = {
  x: number;
  y: number;
  z: number;
}

export type IColorRgb = {
  red: number;
  green: number;
  blue: number;
}

export type IColorRgbAlpha = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export type IColorHslProps = {
  hue: number;
  saturation: number;
  lightness: number;
}



export type IColorKey =
  'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'text'
  | 'tint'
  | 'error'
  | 'warning'
  | 'success'
  | 'white'
  | 'black';


export type IColorSchemeVariants = {
  [K in keyof IColorExtended<string>]: IColorSlots
}

export type IColorSchemes = {
  light: IColorSlots;
  dark: IColorSlots;
}
export type IColorScheme = {
  [K in IColorKey]: string
}

export type IColorIntensities = 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900

export type IColorAlphas =
  'alpha-1'
  | 'alpha-2'
  | 'alpha-3'
  | 'alpha-4'
  | 'alpha-5'
  | 'alpha-6'
  | 'alpha-7'
  | 'alpha-8'
  | 'alpha-9'
  ;

export type IColorExtended<T extends string> = `${T}`
  | `${T}-alpha`
  | `${T}-rgb`
  | `${T}-intensity`
  | `${`${T}`}-${IColorAlphas}`
  | `${`${T}`}-${IColorIntensities}`
  | `${`${T}`}-${IColorIntensities}-${IColorAlphas}`
  | `${T}-invert`
  // | `${`${T}`}-${IColorAlphas}-invert`
  | `${`${T}`}-${IColorIntensities}-invert`
// | `${`${T}`}-${IColorIntensities}-${IColorAlphas}-invert`

export type IColorHex = string;

export type IColorRgbStrictSyntax = `rgb(${number},${number},${number})`;

export type IColorRgbSyntax = IColorRgbStrictSyntax
  | `${number},${number},${number}`
  | [number, number, number];

export type IColorRgbaSyntax = `rgba(${number},${number},${number},${number})`;

export type IColorRgbAlphaSyntax = IColorRgbaSyntax
  | `${number},${number},${number},${number}`
  | [number, number, number, number];

export type IColorValueSyntax = IColorHex | IColorRgbSyntax | IColorRgbAlphaSyntax;

export type IColorAdjustOptions = {
  red?: number,
  green?: number,
  blue?: number,
  hue?: number,
  saturation?: number,
  lightness?: number,
  whiteness?: number,
  blackness?: number,
  alpha?: number
}
