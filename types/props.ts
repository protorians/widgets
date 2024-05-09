import type {ICallableValue} from './index';
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
  | ISourceProps
  | IPictureProps
  | IAudioProps
  | IIFrameProps
  | IArticleProps
  | IHeadingProps
  | IParagraphProps
  | IStrongProps
  | IHelmetProps
  | IFrameProps
  | IFooterProps
  | ILinkProps
  | ISpanProps
  | IStackProps
  | ITableProps
  | ITableCellProps
  | ITableRowProps
  | ITableCaption
  | ITableFooterProps
  | ITableHeadProps
  | ITableBody
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


export interface ISpanProps extends ICommonProps{

}

export interface IParagraphProps extends ICommonProps{

}

export interface IHeadingProps extends ICommonProps{

}

export interface IStrongProps extends ICommonProps{

}

export interface IArticleProps extends ICommonProps{

}

export interface IFooterProps extends ICommonProps{

}

export interface IFrameProps extends ICommonProps{

}

export interface IHelmetProps extends ICommonProps{

}

export interface INavbarProps extends ICommonProps{

}

export interface IStackProps extends ICommonProps{

}

export interface ILinkProps extends ICommonProps {

  href: string;

  hreflang?: string;

  ping?: string;

  referrerPolicy?: IReferrerPolicy;

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

  // child: IChildren<IProps, IWidgetElements>;

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

export interface ISourceProps extends ICommonProps {

  srcset?: string;

  media?: string;

  src?: string;

}

export interface IProgressProps extends ICommonProps {

  value?: string;

  min?: string;

  max?: string;

}

export interface IPictureProps extends ICommonProps {

  source?: ISourceProps | ISourceProps[];

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


export interface ITableProps extends ICommonProps {

}

export interface ITableCaption extends ICommonProps {

}

export interface ITableBody extends ICommonProps {

}

export interface ITableFooterProps extends ICommonProps {

}

export interface ITableRowProps extends ICommonProps {

}

export interface ITableHeadProps extends ITableCellProps {

}

export interface ITableCellProps extends ICommonProps {

  scope?: string;

  rowspan?: number;

  colspan?: number;

}



