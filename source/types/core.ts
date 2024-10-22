/**
 * Find all types related to a widget renderer
 * @module TypesEngine
 */
import type {IAttributes, IExtendedAttributes} from "./attributes"
import type {IChildCallback, IChildren} from "./children"
import type {IClassNames, IEventListeners, IEventStaticListeners, IStyle} from "./element";
import type {IStaticWidgetNode} from "./static";
import type {IParameters, IParameterValue} from "./values";
import type {IManipulateCallback, IWidget, IWidgetElements} from "./widget"

/**
 * Typing a Widget Renderer
 */
export type ICoreRuntime = {

  /**
   * Runtime name
   */
  name: string;

  /**
   * Runtime version
   */
  version: string;


  /**
   * Create Widget Element
   */
  createElement<P extends IAttributes, E extends IWidgetElements>(widget: IWidget<P, E>): E;

  /**
   * Clear widget content
   * @param widget
   */
  clear<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>
  ): IWidget<P, E>;

  /**
   * Set widget children
   * @param widget
   * @param value
   */
  children<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value?: IChildren<IAttributes, IWidgetElements>
  ): IWidget<P, E>;

  /**
   * Listens for an event from the element linked to the widget
   * @param widget
   * @param type
   * @param listener
   * @param options
   */
  listen<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    type: keyof HTMLElementEventMap,
    listener: IChildCallback<P, E>,
    options?: boolean | AddEventListenerOptions,
  ): IWidget<P, E>;

  /**
   * Listens for events of the element linked to the widget
   * @param widget
   * @param listeners
   */
  listens<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    listeners: IEventListeners<P, E>,
  ): IWidget<P, E>;

  /**
   * Define Events on widget element
   * @param widget
   * @param listeners
   */
  ons<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    listeners: IEventStaticListeners<P, E>,
  ): IWidget<P, E>;

  /**
   * Define Event on widget element
   * @param widget
   * @param type
   * @param listener
   */
  on<P extends IAttributes, E extends IWidgetElements, V extends keyof IEventStaticListeners<P, E>>(
    widget: IWidget<P, E>,
    type: V,
    listener: IEventStaticListeners<P, E>[V],
  ): IWidget<P, E>;

  /**
   * Callback to use widget context
   * @param widget
   * @param callback
   */
  manipulate<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    callback: IManipulateCallback<P, E>
  ): IWidget<P, E>;

  /**
   * Set data attribute on widget element
   * @param widget
   * @param data
   */
  data<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    data?: IExtendedAttributes,
  ): IWidget<P, E>;

  /**
   * Define widget construct
   * The construct is the static instance of Widget
   * @param widget
   */
  statically<P extends IAttributes, E extends IWidgetElements>(widget: IWidget<P, E>): IStaticWidgetNode<P, E>;


  style<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value: IStyle<P, E>,
  ): IWidget<P, E>;

  className<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    values: IClassNames<P, E>,
  ): IWidget<P, E>;

  value<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value?: string,
  ): IWidget<P, E>;

  html<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    value?: string,
  ): IWidget<P, E>;

  trigger<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    type ?: keyof HTMLElementEventMap,
  ): IWidget<P, E>;

  remove<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
  ): IWidget<P, E>;

  destroy<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E> | undefined,
  ): void

  nsa(nsa: IParameters, ns?: string, separator?: string): IParameters;

  attributes<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    attributes: Partial<P>,
  ): IWidget<P, E>;

  attribute<P extends IAttributes, E extends IWidgetElements, A extends keyof P>(
    widget: IWidget<P, E>,
    name: A,
    value: P[A] | IParameterValue,
  ): IWidget<P, E>;

  attribuable<P extends IAttributes, E extends IWidgetElements>(
    widget: IWidget<P, E>,
    name: string,
    value: IParameterValue,
  ): IWidget<P, E>;

  parseValue<P extends IAttributes, E extends IWidgetElements, V>(
    widget: IWidget<P, E>,
    value: IParameterValue,
  ): V;

  replaceWith<P extends IAttributes, E extends IWidgetElements>(widget: IWidget<any, any>, replacement: IWidget<any, any>): IWidget<P, E>;

}