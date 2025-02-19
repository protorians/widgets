import {ColorimetricType} from "../enums";

export type IColorimetricLightnessSetting = {
  min: number;
  max: number;
  middle: number;
  breakpoint: number;
}

export type IColorimetricSettings = {
  type: ColorimetricType;
  lightness: IColorimetricLightnessSetting;
}

export type IColorSlots = {
  [K in IColorExtended<string>]: string
}

export type IColorPalette = {
  [K in IColorExtended<IColorKey>]: string
}

export type IColorPaletteAlias = {
  [K in IColorExtendedAlias<IColorKey>]: string
}

export type IColorCustomScheme = {
  [K in keyof IColorExtended<any>]: string
}

export type IColorCustomAliasScheme = {
  [K in keyof IColorExtendedAlias<any>]: string
}

export type IColorAny = {
  [K in string]: string
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
};

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

export type IColorAlphasAlias =
  'alpha_1'
  | 'alpha_2'
  | 'alpha_3'
  | 'alpha_4'
  | 'alpha_5'
  | 'alpha_6'
  | 'alpha_7'
  | 'alpha_8'
  | 'alpha_9'
  ;

export type IColorExtended<T extends string> = `${T}`
  | `${T}-alpha`
  | `${`${T}`}-${IColorAlphas}`
  | `${`${T}`}-${IColorIntensities}`
  | `${`${T}`}-${IColorIntensities}-${IColorAlphas}`
  | `${T}-invert`
  // | `${`${T}`}-${IColorIntensities}-invert`

export type IColorExtendedAlias<T extends string> = `${T}`
  | `${T}_alpha`
  | `${`${T}`}_${IColorAlphasAlias}`
  | `${`${T}`}_${IColorIntensities}`
  | `${`${T}`}_${IColorIntensities}_${IColorAlphasAlias}`
  | `${T}_invert`
  // | `${`${T}`}_${IColorIntensities}_invert`

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
