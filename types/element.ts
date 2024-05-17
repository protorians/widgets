import {IObject} from './values';
import {IComponentConstruct} from './component';
import {ISignalables} from '@protorians/signalable/types';
import {IAttributes} from './attributes';
import {IWidget, IWidgetElements} from './widget';
import {IContext} from './context';
import {IChildCallback} from './children';


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

  signal: Readonly<ISignalables<Props, IElementSignal<Props>>>;

  use: IComponentConstruct<Props> | undefined;

  widget:  IWidget<any, any> | undefined;

  initialize(): this;

  sync(): this;

  mount(component: IComponentConstruct<Props>): this;

  bootstrap(): this;

  mounted(): void;

  unmounted(): void;

  adopted(): void;

}


export interface IElementMetrics<P extends IAttributes, E extends IWidgetElements> {

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


export type IStyleCallback<P extends IAttributes, E extends IWidgetElements> = (context: Partial<IContext<P, E>>) => CSSStyleDeclaration[ keyof CSSStyleDeclaration ];

export type IStyle<P extends IAttributes, E extends IWidgetElements> = IStyleExtended | {

  [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] | IStyleCallback<P, E>;

}

// export type IStyles = IStyle<IProps, IWidgetElements>[]

export type IClassName<P extends IAttributes, E extends IWidgetElements> = string | IClassNameCallback<P, E> | undefined;

export type IClassNames<P extends IAttributes, E extends IWidgetElements> = IClassName<P, E> | IClassName<P, E>[];

export type IClassNameCallback<P extends IAttributes, E extends IWidgetElements> = (context: Partial<IContext<P, E>>) => string | undefined;


export type IEventStaticListener<P extends IAttributes, E extends IWidgetElements> =
  IChildCallback<P, E>
  | boolean
  | null
  | undefined;

export type IEventStaticListeners<P extends IAttributes, E extends IWidgetElements> = Partial<{
  [K in keyof HTMLElementEventMap]: IEventStaticListener<P, E>
}>


export type IEventStaticListenerPayload<K extends keyof HTMLElementEventMap, P extends IAttributes, E extends IWidgetElements> = {
    type: K,
    listener: IEventStaticListener<P, E>
  }

export type IEventStaticListenersMap<P extends IAttributes, E extends IWidgetElements> = Partial<{
  [K in keyof HTMLElementEventMap]: IEventStaticListenerPayload<K, P, E>
}>


export type IEventListenerMapped<P extends IAttributes, E extends IWidgetElements> = {
  call: IChildCallback<P, E>;
  options?: boolean | AddEventListenerOptions;
}

export type IEventListener<P extends IAttributes, E extends IWidgetElements> =
  IChildCallback<P, E>
  | IEventListenerMapped<P, E>

export type IEventListeners<P extends IAttributes, E extends IWidgetElements> = Partial<{
  [K in keyof HTMLElementEventMap]: IEventListener<P, E>
}>


