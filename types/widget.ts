import type {
  IStyle ,
  IChildren ,
  IExtendedAttributes ,
  IAttributes ,
  IClassNames ,
  IDataValue ,
  IComponent ,
  IReference ,
  IObject ,
  IChildCallback ,
  IContext ,
  IEventStaticListeners ,
  IEventListeners ,
  IEventStaticListenerPayload ,
  IVideoAttributes ,
  ITextareaAttributes ,
  ISpanAttributes ,
  IParagraphAttributes ,
  IStrongAttributes , IHeadingAttributes ,
} from './index';
import type {ISignalables} from '@protorians/signalable';
import type {IAttribution} from '@protorians/attribution';
import {ISignalListenOption} from '@protorians/signalable/types';


/**
 * Widget Element
 */
export type IWidgetElements = HTMLElement | DocumentFragment;


/**
 * Widget Primitive Props
 */
export type IWidgetPrimitiveProps<P extends IAttributes , E extends IWidgetElements> = {

  signal? : Partial<IWidgetSignalableMaps<P, E>>;

  ref? : IReference<P , E> | undefined

  child : IChildren<any , any> | undefined;

  style? : IStyle<P , E>;

  className? : IClassNames<P , E>;

  data? : IExtendedAttributes;

  attribution? : IExtendedAttributes;

  on? : IEventStaticListeners<P , E>;

  listen? : IEventListeners<P , E>;

  attributes? : Partial<P>;

}

/**
 * Widget Props Callback
 */
export type IPropsCallback<P extends IAttributes , E extends IWidgetElements> = (context : IContext<P , E>) => string | undefined;

/**
 * Widget Extensible Props
 */
export type IPropsExtensible<P extends IAttributes , E extends IWidgetElements> = {

  [K in keyof P] : P[keyof P] | IPropsCallback<P , E>

}

/**
 * Widget Attribute Scope
 */
export type IAttributesScope<P extends IAttributes , E extends IWidgetElements> =
  P
  & IPropsExtensible<P , E>
  & IWidgetPrimitiveProps<P , E>;

/**
 * Widget Interface
 */
export interface IWidget<P extends IAttributes , E extends IWidgetElements> {

  /**
   * Widget Props
   */
  props : Readonly<Partial<IAttributesScope<P , E>>>;

  /**
   * Widget Signalable
   */
  // signal : IWidgetSignalable<P, E>;

  /**
   * Widget Attribution : Get attribution handler
   */
  attributions : IAttribution<Partial<IAttributesScope<P , E>> , IDataValue>;

  /**
   * Widget HTMLElement tag name
   */
  get tag () : string;

  /**
   * Widget HTMLElement instance
   */
  get element () : E;

  /**
   * Widget Component instance
   */
  get component () : IComponent<IObject> | undefined;

  /**
   * Widget Ready state
   */
  get ready () : boolean;

  /**
   * Get widget's component to use
   */
  useComponent<Props extends IObject> (component : IComponent<Props> | undefined) : this;

  /**
   * Widget widget's element
   */
  defineElement (element : E) : this;

  /**
   * Define widget component
   */
  defineComponent<C extends IObject> (component : IComponent<C>) : this;

  /**
   * Set widget's Child
   */
  child (value : IChildren<P , E>) : this;

  /**
   * Set widget's style
   * @param value
   */
  style (value? : IStyle<P , E>) : this;

  /**
   * Set widget classname
   * @param value
   */
  className (value? : IClassNames<P , E>) : this;

  /**
   * Set widget's value
   * @param value
   */
  value (value? : string) : this;

  /**
   * Set widget's content from `HTML` string
   */
  html (value? : string) : this;

  /**
   * Trigger events listened to on a widget
   */
  trigger (fn ? : keyof HTMLElementEventMap) : this;

  /**
   * Listen to an event on a widget
   * @param type
   * @param listener
   * @param options
   */
  listen (
    type : keyof HTMLElementEventMap ,
    listener : IChildCallback<P , E> ,
    options? : boolean | AddEventListenerOptions ,
  ) : this;

  listens (listeners : IEventListeners<P , E>) : this;

  /**
   * Add listener event
   * @param type
   * @param listener
   */
  on (type : keyof HTMLElementEventMap , listener : IChildCallback<P , E>) : this;

  /**
   * Add many listeners events
   * @param listeners
   */
  ons (listeners : IEventStaticListeners<P , E>) : this;

  /**
   * Manipulate the widget in callback
   * @param callback
   */
  manipulate (callback : IManipulateCallback<P , E>) : this;

  /**
   * Set dataset
   * @param value
   */
  data (value? : IExtendedAttributes) : this;

  /**
   * Set namespace attributes
   * @param value
   */
  attribution (value? : IExtendedAttributes) : this;

  /**
   * Set Widget Attributes
   * @param name
   * @param value
   */
  attrib (name : keyof P , value : P[keyof P] | IDataValue) : this;

  /**
   * Set many Widget Attributes
   * @param attributes
   */
  attribs (attributes : P) : this;

  /**
   * Remove Widget Element instance
   */
  remove () : this;

  /**
   * Destroy widget instance
   */
  destroy () : void;

  /**
   * Render Widget
   */
  render () : this;


}


/**
 * Widget Manipulate Callback
 */
export type IManipulateCallback<P extends IAttributes , E extends IWidgetElements> = (context : Partial<IContext<P , E>>) => void;


// export type IManipulateMap<P extends IProps, E extends IWidgetElements> = {
//   type: keyof HTMLElementEventMap,
//   listener: IChildCallback<P, E>,
//   options?: boolean | AddEventListenerOptions
// }

/**
 * Widget Listener Map
 */
export type IWidgetListenerMap<P extends IAttributes , E extends IWidgetElements> = {
  type : keyof HTMLElementEventMap,
  listener : IChildCallback<P , E>,
  options? : boolean | AddEventListenerOptions
}

/**
 * Widget Event Map
 */
export type IWidgetEventMap<P extends IAttributes , E extends IWidgetElements> = {
  type : keyof HTMLElementEventMap,
  listener : IChildCallback<P , E>
}

/**
 * Widget Attribute Map
 */
export type IWidgetAttributesMap<P extends IAttributes> = {
  name : keyof P,
  value : P[keyof P] | IDataValue
}


/**
 * Widget Signalable
 */
export type IWidgetSignalable<P extends IAttributes , E extends IWidgetElements> = ISignalables<Readonly<Partial<IAttributesScope<P , E>>> , IWidgetSignalableMap<P , E>>


/**
 * Widget Signalables Dispatcher
 */
// export type IWidgetSignalableDispatcher<T , P extends IAttributes , E extends IWidgetElements> = {
//
//   context : Partial<IContext<P , E>>;
//
//   payload : T;
//
// }


/**
 * Widget Signalable Map
 */
export interface IWidgetSignalableMap<P extends IAttributes , E extends IWidgetElements> {

  initialize : IWidget<P , E>;

  ready : IWidget<P , E>;

  defineElement : E;

  defineComponent : IComponent<IObject> | undefined;

  useComponent : IComponent<IObject> | undefined;

  child : IChildren<P , E>;

  style : IStyle<P , E>;

  className : IClassNames<P , E>;

  value : string | undefined;

  html : string | undefined;

  trigger : keyof HTMLElementEventMap;

  on : IEventStaticListenerPayload<keyof HTMLElementEventMap , P , E>;

  listen : IWidgetListenerMap<P , E>;

  event : IWidgetEventMap<P , E>;

  manipulate : IManipulateCallback<P , E>;

  data : IExtendedAttributes;

  attribution : IExtendedAttributes;

  attributes : IWidgetAttributesMap<P>;

  remove : IWidget<P , E>;

}

export type IWidgetSignalableMaps<P extends IAttributes , E extends IWidgetElements> = {

  [K in keyof IWidgetSignalableMap<P , E>] : ISignalListenOption<Readonly<Partial<IAttributesScope<P, E>>>, IWidgetSignalableMap<P, E>[K]>

}

/**
 * Widget Video
 */
export type IVideoWidget = IWidget<IVideoAttributes , HTMLVideoElement>;


/**
 * Widget Textarea
 */
export type ITextareaWidget = IWidget<ITextareaAttributes , HTMLTextAreaElement>;

/**
 * Widget Text
 */
export type ITextWidget = IWidget<ISpanAttributes , HTMLSpanElement>;

/**
 * Widget Text Paragraph
 */
export type IParagraphWidget = IWidget<IParagraphAttributes , HTMLParagraphElement>;

/**
 * Widget Text Strong
 */
export type ITextStrongWidget = IWidget<IStrongAttributes , HTMLElement>;


/**
 * Widget Text Heading Larger
 */
export type IHeadingLargerWidget = IWidget<IHeadingAttributes , HTMLHeadingElement>;

/**
 * Widget Text Heading Large
 */
export type IHeadingLargeWidget = IWidget<IHeadingAttributes , HTMLHeadingElement>;

/**
 * Widget Text Heading Medium
 */
export type IHeadingMediumWidget = IWidget<IHeadingAttributes , HTMLHeadingElement>;

/**
 * Widget Text Heading Small
 */
export type IHeadingSmallWidget = IWidget<IHeadingAttributes , HTMLHeadingElement>;

/**
 * Widget Text Heading Smaller
 */
export type IHeadingSmallerWidget = IWidget<IHeadingAttributes , HTMLHeadingElement>;


