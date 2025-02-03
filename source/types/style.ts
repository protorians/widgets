import type {ISignalController, IWidgetNode} from "./index";
import {AbsoluteUnit, RelativeUnit} from "../enums";

export type IStyleSupportedValue = object | string | number | undefined

export type IStyleExtendedDeclaration = {
  'padding-x': IStyleSupportedValue;
  'padding-y': IStyleSupportedValue;
  'margin-x': IStyleSupportedValue;
  'margin-y': IStyleSupportedValue;
}

export type IStyleDeclaration = {
  [K in (keyof CSSStyleDeclaration | keyof IStyleExtendedDeclaration)]: IStyleSupportedValue;
}

export type IStyleSettings = {
  bytes: number;
  unit: AbsoluteUnit | RelativeUnit;
  spacing?: string | number;
  corner?: string | number;
}

export type IStyleOptions = {
  attach?: boolean;
}

export type IStyleDeclarationController = ISignalController<Partial<IStyleDeclaration>>

export type IStyleCascadeCallable = (fingerprint: string, computed: string) => void

export interface IStyleCascades {
  [K: string]: IStyleDeclarationController | undefined
}

export interface IStyleCascadesDeclarations {
  [K: string]: Partial<IStyleDeclaration> | undefined
}

export interface IStyleCascadesComputed {
  [K: string]: string
}

export interface IStyleCascadesAttaches {
  [K: string]: HTMLStyleElement | undefined;
}

export interface IStyle {
  get fingerprint(): string | undefined;

  get options(): IStyleOptions;

  get declaration(): Partial<IStyleDeclaration>;

  bind(widget: IWidgetNode<any, any>): Partial<IStyleDeclaration> | HTMLStyleElement | undefined;

  upgrade(): this;

  update(property: keyof IStyleDeclaration, value: IStyleSupportedValue): this;

  merge(style: IStyle, enforce?: boolean): this;

  remove(properties: (keyof IStyleDeclaration)[]): this;

  clear(): this;

  detach(): void;
}
