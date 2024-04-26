import type {ICallableValue, IChildren, IWidgetElements} from './index';
import type {
  IBoolean,
  IDataValue,
  IFormRelationship,
  ILoading,
  IOnOff,
  IReferrerPolicy,
  ISandbox,
  ITarget,
  IYesNo,
} from './values';


export type IPropsExtended = {

  [K: string]: IDataValue;

}

export type IProps = Partial<
  ICommonProps
  | IVideoProps
  | IPictureSourceProps
  | IPictureProps
  | IAudioProps
  | IIFrameProps
>

export type IOperatingProps<T> = {
  [K in keyof T]: T[keyof T] | ICallableValue
}

export interface ICommonProps {

  accesskey?: string;

  contenteditable?: string;

  dir?: string;

  id?: string;

  lang?: string;

  title?: string;

  tabindex?: number;

  spellcheck?: boolean;

  draggable?: boolean;

  hidden?: boolean;

  translate?: IYesNo;

  rel?: string;

}


export interface IAnchorProps extends ICommonProps {

  href: string;

  hreflang?: string;

  ping?: string;

  referrerpolicy?: IReferrerPolicy;

  target?: ITarget;

  type?: string;

  download?: string;

  media?: string;

}


export type IInputableType = 'text'

  | 'button'

  | 'color'

  | 'date'

  | 'datetime-local'

  | 'email'

  | 'file'

  | 'hidden'

  | 'image'

  | 'month'

  | 'number'

  | 'password'

  | 'radio'

  | 'range'

  | 'reset'

  | 'search'

  | 'submit'

  | 'tel'

  | 'time'

  | 'url'

  | 'week'

  | 'checkbox';


export type IInputableCommonProps = {

  form?: string;

  formAction?: string;

  formEnctype?: string;

  formMethod?: 'get' | 'post';

  formNovalidate?: boolean;

  formTarget?: ITarget;

}


export type IButtonType = 'button' | 'reset' | 'submit' | 'menu'

export interface IButtonProps extends IInputableProps {

  popoverTarget?: string;

  popoverTargetAction?: string;

  type?: IButtonType;

}

export interface IInputProps extends IInputableProps {

  type?: IInputableType;

  child?: undefined;

}


export interface IOptionGroupProps extends ICommonProps {

  disabled?: boolean;

  label: string;

}


export interface IOptionProps extends ICommonProps {

  disabled?: boolean;

  selected?: boolean;

  label: string;

  value?: string | number;

}

export interface ISelectProps extends IInputableProps {

}

export interface ITextareaProps extends IInputableProps {

}

export interface IInputableProps extends ICommonProps, IInputableCommonProps {

  name?: string;

  alt?: string;

  autocomplete?: IOnOff;

  autofocus?: boolean;

  checked?: boolean;

  dirname?: string;

  disabled?: boolean;

  list?: string;

  max?: number | string;

  min?: number | string;

  maxlength?: number;

  minlength?: number;

  multiple?: boolean;

  pattern?: RegExp;

  placeholder?: string;

  readonly?: boolean;

  required?: boolean;

  size?: number;

  // src?: string;

  step?: number;

  value?: string;

}

export interface IFormProps extends ICommonProps {

  acceptCharset?: string;

  action?: string;

  autocomplete?: 'on' | 'off';

  enctype?: string;

  method?: 'get' | 'post';

  name?: string;

  novalidate?: boolean;

  rel?: IFormRelationship;

  target?: ITarget;

  child: IChildren<IProps, IWidgetElements>;

}

export interface IVideoProps extends ICommonProps {

  autoplay?: boolean;

  controls?: boolean;

  loop?: boolean;

  muted?: boolean;

  width?: string;

  height?: string;

  poster?: string;

  preload?: 'auto' | 'metadata' | 'none';

  src?: string;

}

export interface IPictureSourceProps extends ICommonProps {

  srcset?: string;

  media?: string;

  src?: string;

}

export interface IPictureProps extends ICommonProps {

  source?: IPictureSourceProps | IPictureSourceProps[];

  src?: string;

  alt?: string;

}

export interface IAudioProps extends ICommonProps {

  autoplay?: boolean;

  controls?: boolean;

  loop?: boolean;

  muted?: boolean;

  preload?: boolean;

  src: string;

}

export interface IIFrameProps extends ICommonProps {

  allow?: string;

  allowfullscreen?: IBoolean;

  allowpaymentrequest?: IBoolean;

  loading?: ILoading;

  name?: string;

  referrerpolicy?: IReferrerPolicy;

  sandbox?: ISandbox;

  src: string;

}
