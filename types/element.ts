import {IObject} from './values';
import {IComponentConstruct} from './component';
import {ISignalables} from '@protorians/signalable/types';
import {IProps} from './props';
import {IWidget, IWidgetElements} from './widget';


export type IElementSignal<Props extends IObject> = {
  connected: IElement<Props>;
  disconnected: IElement<Props>;
  adopted: IElement<Props>;
  synchronized: Props;
  mounted: IElement<Props>;
}

export type IEditableElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface IElement<Props extends IObject> extends HTMLElement {

  get props(): Props;

  get component(): IComponentConstruct<Props> | undefined;

  get signal(): Readonly<ISignalables<Props, IElementSignal<Props>>>;

  use: IComponentConstruct<Props> | undefined;

  initialize(): this;

  sync(): this;

  mount(component: IComponentConstruct<Props>): this;

  bootstrap(): this;

  mounted(): void;

  unmounted(): void;

  adopted(): void;

}


export interface IElementMetrics<P extends IProps, E extends IWidgetElements> {

  widget: Readonly<IWidget<P, E>>;

  width?: Readonly<number>;

  height?: Readonly<number>;

  x?: Readonly<number>;

  y?: Readonly<number>;

  top?: Readonly<number>;

  right?: Readonly<number>;

  bottom?: Readonly<number>;

  left?: Readonly<number>;

  json?: Readonly<string>;

}


export type IStyleExtended = {

  marginVertical?: string | number;

  marginHorizontal?: string | number;


  paddingVertical?: string | number;

  paddingHorizontal?: string | number;


  borderVertical?: string | number;

  borderHorizontal?: string | number;

}

export type IStyle = IStyleExtended | {

  [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K];

}

export type IStyles = IStyle[]

export type IClassName = string;

export type IClassNames = IClassName | IClassName[];