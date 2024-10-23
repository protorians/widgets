import type {
    IStyle,
    IChildren,
    IExtendedAttributes,
    IAttributes,
    IClassNames,
    IParameterValue,
    IComponent,
    IReference,
    IParameters,
    IChildCallback,
    IContext,
    IEventStaticListeners,
    IEventListeners,
    IEventStaticListenerPayload,
    IVideoAttributes,
    ITextareaAttributes,
    ISpanAttributes,
    IParagraphAttributes,
    IStrongAttributes,
    IHeadingAttributes,
    IItalicAttributes,
    IPassiveWidgetElement,
} from './index';
import type {ISignalables, ISignalListenOption} from '@protorians/signalable';


/**
 * Widget Element
 */
export type IWidgetElements = HTMLElement | DocumentFragment | IPassiveWidgetElement;


/**
 * Widget Primitive Props
 */
export type IWidgetPrimitiveProps<P extends IAttributes, E extends IWidgetElements> = {

    /**
     * Signals : Listen events
     */
    signal?: Partial<IWidgetSignalableMaps<P, E>>;

    /**
     * Store widget's instance
     */
    ref?: IReference<P, E> | undefined

    /**
     * Widget Children
     */
    children: IChildren<any, any> | undefined;

    /**
     * Make widget's style
     */
    style?: IStyle<P, E>;

    /**
     * Make widget's CSS class name
     */
    className?: IClassNames<P, E>;

    /**
     * Widget's dataset
     */
    data?: IExtendedAttributes;

    /**
     * Namespace Attributes
     */
    nsa?: IParameters;

    // attribution? : IExtendedAttributes;

    /**
     * Element Events
     */
    on?: IEventStaticListeners<P, E>;

    /**
     * Events listeners
     */
    listen?: IEventListeners<P, E>;

    /**
     * Attributes
     */
    attributes?: Partial<P>;

}

/**
 * Widget Props Callback
 */
export type IPropsCallback<P extends IAttributes, E extends IWidgetElements> = (context: IContext<any, P, E>) => string | undefined;

/**
 * Widget Extensible Props
 */
export type IPropsExtensible<P extends IAttributes, E extends IWidgetElements> = {

    [K in keyof P]: P[keyof P] | IPropsCallback<P, E>

}

/**
 * Widget Attribute Scope
 */
export type IAttributesScope<P extends IAttributes, E extends IWidgetElements> =
    P
    & IPropsExtensible<P, E>
    & IWidgetPrimitiveProps<P, E>;

/**
 * Widget Interface
 */
export interface IWidget<P extends IAttributes, E extends IWidgetElements> {

    /**
     * Widget Props
     */
    props: Readonly<Partial<IAttributesScope<P, E>>>;

    /**
     * Widget Signalable
     */
    signal: IWidgetSignalable<P, E>

    /**
     * Widget's Parent
     */
    get parent(): IWidget<IAttributes, IWidgetElements> | undefined


    /**
     * Widget HTMLElement tag name
     */
    get tag(): string;

    /**
     * Widget HTMLElement instance
     */
    get element(): E;

    /**
     * Widget Component instance
     */
    get composite(): IComponent<IParameters> | undefined;

    /**
     * Widget Ready state
     */
    get isReady(): boolean;

    /**
     * Create Widget element
     */
    createElement(): E;

    /**
     * Call when widget's constructor
     */
    construct(): void

    /**
     * Get widget's composite to use
     */
    useComposite<Props extends IParameters>(composite: IComponent<Props> | undefined): this;

    /**
     * Widget widget's element
     */
    defineElement(element: E): this;

    /**
     * Define widget component
     */
    defineComposite<C extends IParameters>(component: IComponent<C>): this;

    /**
     * Define Widget's current parent
     * @param widget
     */
    defineParent(widget: IWidget<IAttributes, IWidgetElements>): this;

    /**
     * Erase all children
     */
    clear(): this;

    /**
     * Set widget's Child
     */
    children(value: IChildren<P, E>): this;

    /**
     * Set widget's style
     * @param value
     */
    style(value: IStyle<P, E>): this;

    /**
     * Set widget classname
     * @param value
     */
    className(value: IClassNames<P, E>): this;

    /**
     * Set widget's value
     * @param value
     */
    value(value?: string): this;

    /**
     * Set widget's content from `HTML` string
     */
    html(value?: string): this;

    /**
     * Trigger events listened to on a widget
     */
    trigger(fn : keyof HTMLElementEventMap): this;

    /**
     * Listen to an event on a widget
     * @param type
     * @param listener
     * @param options
     */
    listen(
        type: keyof HTMLElementEventMap,
        listener: IChildCallback<P, E>,
        options?: boolean | AddEventListenerOptions,
    ): this;

    listens(listeners: IEventListeners<P, E>): this;

    /**
     * Add listener event
     * @param type
     * @param listener
     */
    on(type: keyof HTMLElementEventMap, listener: IChildCallback<P, E>): this;

    /**
     * Add many listeners events
     * @param listeners
     */
    ons(listeners: IEventStaticListeners<P, E>): this;

    /**
     * Manipulate the widget in callback
     * @param callback
     */
    manipulate(callback: IManipulateCallback<P, E>): this;

    /**
     * Set dataset
     * @param value
     */
    data(value: IExtendedAttributes): this;

    /**
     * Set namespace attributes
     * @param value
     */

    // attribution (value? : IExtendedAttributes) : this;

    /**
     * Set Widget Attributes
     * @param name
     * @param value
     */
    attrib(name: keyof P, value: P[keyof P] | IParameterValue): this;

    /**
     * Set many Widget Attributes
     * @param attributes
     */
    attribs(attributes: P): this;

    /**
     * Remove Widget Element instance
     */
    remove(): this;

    /**
     * Destroy widget instance
     */
    destroy(): void;

    /**
     * Define a signal
     * @param name
     * @param callback
     */
    setSignal<Si extends keyof IWidgetSignalableMap<P, E>>(name: Si, callback: ISignalListenOption<Readonly<Partial<IAttributesScope<P, E>>>, IWidgetSignalableMap<P, E>[Si]>): this

    /**
     * Define many signals
     * @param signals
     */
    setSignals(signals: Partial<IWidgetSignalableMaps<P, E>>): this

    /**
     * Namespace Attributes
     * @param nsa
     */
    nsa(nsa: IParameters): this;

    /**
     * Replace Widget with another widget
     * @param widget
     */
    replaceWith(widget: IWidget<any, any>): this

    /**
     * Render Widget
     */
    render(): this;


    /**
     * To string
     */
    toString(): string;

}


/**
 * Widget Manipulate Callback
 */
export type IManipulateCallback<P extends IAttributes, E extends IWidgetElements> = (context: IContext<any, P, E>) => void;


// export type IManipulateMap<P extends IProps, E extends IWidgetElements> = {
//   type: keyof HTMLElementEventMap,
//   listener: IChildCallback<P, E>,
//   options?: boolean | AddEventListenerOptions
// }

/**
 * Widget Listener Map
 */
export type IWidgetListenerMap<P extends IAttributes, E extends IWidgetElements> = {
    type: keyof HTMLElementEventMap,
    listener: IChildCallback<P, E>,
    options?: boolean | AddEventListenerOptions
}

/**
 * Widget Event Map
 */
export type IWidgetEventMap<P extends IAttributes, E extends IWidgetElements> = {
    type: keyof HTMLElementEventMap,
    listener: IChildCallback<P, E>
}

/**
 * Widget Attribute Map
 */
export type IWidgetAttributesMap<P extends IAttributes> = {
    name: keyof P,
    value: P[keyof P] | IParameterValue
}


/**
 * Widget Signalable
 */
export type IWidgetSignalable<P extends IAttributes, E extends IWidgetElements> = ISignalables<Readonly<Partial<IAttributesScope<P, E>>>, IWidgetSignalableMap<P, E>>


/**
 * Widget Signalables Dispatcher
 */
// export type IWidgetSignalableDispatcher<T, P extends IAttributes, E extends IWidgetElements> = {
//
//   context : Partial<IContext<P, E>>;
//
//   payload : T;
//
// }


/**
 * Widget Signalable Map
 */
export interface IWidgetSignalableMap<P extends IAttributes, E extends IWidgetElements> {

    // initialize : IWidget<P, E>;

    mount: IContext<IWidget<any, any>, P, E>;

    render: IContext<IWidget<P, E>, P, E>;

    defineElement: IContext<E, IAttributes, IWidgetElements>;

    defineComponent: IContext<IComponent<IParameters>, P, E>;

    defineParent: IContext<IComponent<IParameters>, P, E>;

    useComposite: IContext<IComponent<IParameters> | undefined, P, E>;

    clear: IContext<IComponent<IParameters> | undefined, P, E>;

    child: IContext<IChildren<P, E>, P, E>;

    style: IContext<IStyle<P, E>, P, E>;

    className: IContext<IClassNames<P, E>, P, E>;

    value: IContext<string | undefined, P, E>;

    html: IContext<string | undefined, P, E>;

    trigger: IContext<keyof HTMLElementEventMap, P, E>;

    on: IContext<IEventStaticListenerPayload<keyof HTMLElementEventMap, P, E>, P, E>;

    listen: IContext<IWidgetListenerMap<P, E>, P, E>;

    event: IContext<IWidgetEventMap<P, E>, P, E>;

    manipulate: IContext<IManipulateCallback<P, E>, P, E>;

    data: IContext<IExtendedAttributes, P, E>;

    // attribution: IContext<IExtendedAttributes, P, E>;

    attribute: IContext<IWidgetAttributesMap<P>, P, E>;

    remove: IContext<IWidget<P, E>, P, E>;

}

export type IWidgetSignalableMaps<P extends IAttributes, E extends IWidgetElements> = {

    [K in keyof IWidgetSignalableMap<P, E>]: ISignalListenOption<Readonly<Partial<IAttributesScope<P, E>>>, IWidgetSignalableMap<P, E>[K]>

}


/**
 * Widget Video
 */
export type IVideoWidget = IWidget<IVideoAttributes, HTMLVideoElement>;


/**
 * Widget Textarea
 */
export type ITextareaWidget = IWidget<ITextareaAttributes, HTMLTextAreaElement>;

/**
 * Widget Text
 */
export type ITextWidget = IWidget<ISpanAttributes, HTMLSpanElement>;

/**
 * Widget Text
 */
export type IItalicWidget = IWidget<IItalicAttributes, HTMLElement>;

/**
 * Widget Text Paragraph
 */
export type IParagraphWidget = IWidget<IParagraphAttributes, HTMLParagraphElement>;

/**
 * Widget Text Strong
 */
export type ITextStrongWidget = IWidget<IStrongAttributes, HTMLElement>;


/**
 * Widget Text Heading Larger
 */
export type IHeadingLargerWidget = IWidget<IHeadingAttributes, HTMLHeadingElement>;

/**
 * Widget Text Heading Large
 */
export type IHeadingLargeWidget = IWidget<IHeadingAttributes, HTMLHeadingElement>;

/**
 * Widget Text Heading Medium
 */
export type IHeadingMediumWidget = IWidget<IHeadingAttributes, HTMLHeadingElement>;

/**
 * Widget Text Heading Small
 */
export type IHeadingSmallWidget = IWidget<IHeadingAttributes, HTMLHeadingElement>;

/**
 * Widget Text Heading Smaller
 */
export type IHeadingSmallerWidget = IWidget<IHeadingAttributes, HTMLHeadingElement>;


