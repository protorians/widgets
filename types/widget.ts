import type {
  IStyle,
  IChildren,
  IPropsExtended,
  IProps,
  IClassNames,
  IDataValue,
  IComponent,
  IReference,
  IObject,
  IChildCallback,
  IContext,
  IEventStaticListeners,
  IEventListeners,
  IEventStaticListenerPayload,
} from './index';
import {ISignalables} from '@protorians/signalable';


export type IWidgetElements = HTMLElement | DocumentFragment;

export type IWidgetPrimitiveProps<P extends IProps, E extends IWidgetElements> = {

  signal?: Partial<IWidgetSignalableListeners<P, E>>;

  ref?: IReference<P, E> | undefined

  child: IChildren<any, any> | undefined;

  style?: IStyle<P, E>;

  className?: IClassNames<P, E>;

  data?: IPropsExtended;

  ns?: IPropsExtended;

  // actions?: IActions<P, E>;

  on?: IEventStaticListeners<P, E>;

  listen?: IEventListeners<P, E>;

}

export type IPropsCallback<P extends IProps, E extends IWidgetElements> = (context: IContext<P, E>) => string | undefined;

export type IPropsExtensible<P extends IProps, E extends IWidgetElements> = {

  [K in keyof P]: P[keyof P] | IPropsCallback<P, E>

}

export type IWidgetProps<P extends IProps, E extends IWidgetElements> =
  P
  & IPropsExtensible<P, E>
  & IWidgetPrimitiveProps<P, E>;

export interface IWidget<P extends IProps, E extends IWidgetElements> {

  props: Readonly<Partial<IWidgetProps<P, E>>>;

  signal: IWidgetSignalable<P, E>;

  get tag(): string;

  get element(): E;

  get component(): IComponent<IObject> | undefined;

  get ready(): boolean;

  useComponent<Props extends IObject>(component: IComponent<Props> | undefined): this;

  defineElement(element: E): this;

  defineComponent<C extends IObject>(component: IComponent<C>): this;

  child(value: IChildren<P, E>): this;

  style(value?: IStyle<P, E>): this;

  className(value?: IClassNames<P, E>): this;

  value(value?: string): this;

  html(value?: string): this;

  trigger(fn ?: keyof HTMLElementEventMap): this;

  listen(
    type: keyof HTMLElementEventMap,
    listener: IChildCallback<P, E>,
    options?: boolean | AddEventListenerOptions,
  ): this;

  listens(listeners: IEventListeners<P, E>): this;

  on(type: keyof HTMLElementEventMap, listener: IChildCallback<P, E>): this;

  ons(listeners: IEventStaticListeners<P, E>): this;

  manipulate(callback: IManipulateCallback<P, E>): this;

  data(value?: IPropsExtended): this;

  attribution(value?: IPropsExtended): this;

  attrib(name: keyof P, value: P[keyof P] | IDataValue): this;

  // actions(actions: IActions<P, E>): this;

  remove(): this;

  render(): this;


}


export type IManipulateCallback<P extends IProps, E extends IWidgetElements> = (context: Partial<IContext<P, E>>) => void;


// export type IManipulateMap<P extends IProps, E extends IWidgetElements> = {
//   type: keyof HTMLElementEventMap,
//   listener: IChildCallback<P, E>,
//   options?: boolean | AddEventListenerOptions
// }

export type IWidgetListenerMap<P extends IProps, E extends IWidgetElements> = {
  type: keyof HTMLElementEventMap,
  listener: IChildCallback<P, E>,
  options?: boolean | AddEventListenerOptions
}

export type IWidgetEventMap<P extends IProps, E extends IWidgetElements> = {
  type: keyof HTMLElementEventMap,
  listener: IChildCallback<P, E>
}

export type IWidgetAttributesMap<P extends IProps> = {
  name: keyof P,
  value: P[keyof P] | IDataValue
}


export type IWidgetSignalable<P extends IProps, E extends IWidgetElements> = ISignalables<Readonly<Partial<IWidgetProps<P, E>>>, IWidgetSignalables<P, E>>


export type IWidgetSignalableDispatcher<T, P extends IProps, E extends IWidgetElements> = {

  context: Partial<IContext<P, E>>;

  payload: T;

}

export type IWidgetSignalableListener<
  T,
  P extends IProps,
  E extends IWidgetElements
> = (payload: IWidgetSignalableDispatcher<T, P, E>) => void


export interface IWidgetSignalableMap<P extends IProps, E extends IWidgetElements> {

  initialize: IWidget<P, E>;

  ready: IWidget<P, E>;

  defineElement: E;

  defineComponent: IComponent<IObject> | undefined;

  useComponent: IComponent<IObject> | undefined;

  child: IChildren<P, E>;

  style: IStyle<P, E>;

  className: IClassNames<P, E>;

  value: string | undefined;

  html: string | undefined;

  trigger: keyof HTMLElementEventMap;

  on: IEventStaticListenerPayload<keyof HTMLElementEventMap, P, E>;

  listen: IWidgetListenerMap<P, E>;

  event: IWidgetEventMap<P, E>;

  manipulate: IManipulateCallback<P, E>;

  data: IPropsExtended;

  ns: IPropsExtended;

  attributes: IWidgetAttributesMap<P>;

  remove: IWidget<P, E>;

}


export type IWidgetSignalables<P extends IProps, E extends IWidgetElements> = {

  [K in keyof IWidgetSignalableMap<P, E>]: IWidgetSignalableDispatcher<IWidgetSignalableMap<P, E>[ K ], P, E>

}

export type IWidgetSignalableListeners<P extends IProps, E extends IWidgetElements> = {

  [K in keyof IWidgetSignalableMap<P, E>]: IWidgetSignalableListener<IWidgetSignalableMap<P, E>[ K ], P, E>

}