import type {
  IContext ,
  IAttributes ,
  IWidget ,
  IWidgetElements ,
} from './index';

export type IPrimitiveValue = string | number | boolean | null | undefined | Symbol | BigInt;

export type IParameterValue = IPrimitiveValue | object;

export type ICallableValue = (context : Partial<IContext<any , IAttributes , IWidgetElements>>) => IParameterValue;

export type IParameters = {
  [A : string] : IParameterValue
}

export type IPrimitiveParameters = {
  [A : string] : IPrimitiveValue
}

export type ISupportableValue = IParameterValue | IWidget<IAttributes , IWidgetElements>

export type IOnOff = 'on' | 'off';

export type IYesNo = 'yes' | 'no';

export type IBoolean = 'true' | 'false';

export type ILoading = 'eager' | 'lazy';

export type ISandbox =
  'allow-forms'
  | 'allow-pointer-lock'
  | 'allow-popups'
  | 'allow-same-origin'
  | 'allow-scripts'
  | 'allow-top-navigation';

export type ICrossOrigin = 'anonymous' | 'use-credentials';

export type ILinkRel = 'alternate'
  | 'author'
  | 'dns-prefetch'
  | 'help'
  | 'icon'
  | 'license'
  | 'next'
  | 'pingback'
  | 'preconnect'
  | 'prefetch'
  | 'preload'
  | 'prerender'
  | 'prev'
  | 'search'
  | 'stylesheet';

export type IReferrerPolicy = 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | ' origin-when-cross-origin'
  | 'unsafe-url';

export type ITarget =
  '_blank'
  | '_self'
  | '_parent'
  | '_top'
  | string;


export type IFormRelationship = 'external'

  | 'license'

  | 'next'

  | 'nofollow'

  | 'noopener'

  | 'noreferrer'

  | 'opener'

  | 'prev'

  | 'search'

  | 'help';