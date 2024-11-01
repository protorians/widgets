import type {
  IChildren,
  IAttributes,
  IWidget,
  IWidgetElements,
  IAttributesScope,
  IStyle,
  IClassNames,
  IExtendedAttributes,
  IParameterValue,
  IComponent,
  IParameters,
  IChildCallback,
  IManipulateCallback,
  IEventStaticListeners,
  IEventListeners,
  IWidgetSignalable,
  IWidgetSignalableMap,
  IWidgetSignalableMaps,
} from '../types';
import {
  createContext,
  WidgetPassiveElement,
  CoreableProperties,
  WidgetCore,
} from '../foundation';
import {Signalables, type ISignalListenOption} from '@protorians/signalable';


export class WidgetNode<P extends IAttributes, E extends IWidgetElements> implements IWidget<P, E> {

  static style<At extends IAttributes, El extends IWidgetElements>(): Partial<IStyle<At, El>> | undefined {
    return undefined;
  }

  static className<At extends IAttributes, El extends IWidgetElements>(): IClassNames<At, El> | undefined {
    return undefined;
  }

  static data(): IExtendedAttributes | undefined {
    return undefined;
  }

  static ns(): IExtendedAttributes | undefined {
    return undefined;
  }

  static event<At extends IAttributes, El extends IWidgetElements>(): IEventStaticListeners<At, El> | undefined {
    return undefined;
  }

  static listener<At extends IAttributes, El extends IWidgetElements>(): IEventListeners<At, El> | undefined {
    return undefined;
  }

  static child(): IChildren<any, any> | undefined {
    return undefined;
  }

  static signal<At extends IAttributes, El extends IWidgetElements>(): Partial<IWidgetSignalableMap<At, El>> | undefined {
    return undefined;
  }

  static transformProperties<P extends IAttributes, E extends IWidgetElements>(props: Partial<IAttributesScope<P, E>>) {
    return props;
  }

  static properties<P extends IAttributes, E extends IWidgetElements>(): Partial<IAttributesScope<P, E>> | undefined {
    return undefined;
  }

  get tag(): string {
    return this._tag;
  }

  get element() {
    return this._element;
  }

  get composite(): IComponent<IParameters> | undefined {
    return this._composite;
  }

  get parent() {
    return this._parent;
  }

  get isReady() {
    return this._ready;
  }

  protected _element: E;

  protected _composite: IComponent<IParameters> | undefined;

  protected _ready: boolean = false;

  protected _parent: IWidget<IAttributes, IWidgetElements> | undefined;

  protected _tag: string;


  signal: IWidgetSignalable<P, E>;

  props: Readonly<Partial<IAttributesScope<P, E>>>;


  constructor(props: IAttributesScope<P, E>, tag?: string) {

    this._tag = tag || 'div';

    this._element = this.createElement();

    if (this._element instanceof WidgetPassiveElement) this._element.tagName = this.tag;

    this.props = (new CoreableProperties<P, E>(this)).sync(props) as Readonly<Partial<IAttributesScope<P, E>>>;

    this.signal = new Signalables(this.props) as IWidgetSignalable<P, E>;

    this.signal.listen('mount', () => this._ready = true);

    this.construct();

  }

  createElement(): E {
    return WidgetCore.Runtime.createElement<P, E>(this);
  }

  construct(): void {
  }

  defineElement(element: E): this {
    this._element = element;
    this.signal.dispatch('defineElement', createContext({
      payload: element,
      widget: this as IWidget<any, any>,
      composite: this._composite,
      event: undefined
    }));
    return this;
  }

  defineComposite<C extends IParameters>(component: IComponent<C>): this {
    this._composite = component;
    this.signal.dispatch('defineComponent', createContext({
      payload: this._composite as IComponent<any>,
      widget: this as IWidget<any, any>,
      composite: this._composite,
      event: undefined
    }));
    return this;
  }

  useComposite<Props extends IParameters>(composite: IComponent<Props> | undefined): this {
    if (composite) {
      composite.widget = this;
      this._composite = composite;
      this.signal.dispatch('useComposite', createContext({
        payload: this._composite as IComponent<any>,
        widget: this as IWidget<any, any>,
        composite: this._composite,
        event: undefined
      }));
    }
    return this;
  }

  defineParent(widget: IWidget<IAttributes, IWidgetElements>): this {
    if (typeof HTMLElement !== 'undefined' && this.element instanceof HTMLElement && !this.element.contains(widget.element as Node)) {
      this._parent = widget;
    } else if (this.element instanceof WidgetPassiveElement) {
      // console.warn('defineParent width WidgetDOM' , this);
    } else {
      throw new Error('This parent is contains in current widget');
    }
    this.signal.dispatch('defineParent', createContext({
      payload: this._composite as IComponent<any>,
      widget: this as IWidget<any, any>,
      composite: this._composite,
      event: undefined
    }));
    return this;
  }

  clear(): this {
    this.signal.dispatch('clear', createContext({
      widget: WidgetCore.Runtime.clear<P, E>(this),
      payload: this._composite as IComponent<any>,
      composite: this._composite,
      event: undefined
    }));
    return this;
  }

  children(value?: IChildren<IAttributes, IWidgetElements>): this {
    this.signal.dispatch('child', createContext({
      widget: WidgetCore.Runtime.children<P, E>(this, value),
      payload: value,
      composite: this._composite,
      event: undefined
    }));
    return this;
  }

  style(value: IStyle<P, E>): this {
    this.signal.dispatch('style', createContext({
      widget: WidgetCore.Runtime.style<P, E>(this, value),
      payload: value,
      composite: this.composite,
      event: undefined
    }));
    return this;
  }

  className(values: IClassNames<P, E>): this {
    this.signal.dispatch('className', createContext({
      widget: WidgetCore.Runtime.className<P, E>(this, values),
      payload: values,
      composite: this.composite,
      event: undefined
    }));
    return this;
  }

  value(value?: string): this {
    this.signal.dispatch('value', createContext({
      widget: WidgetCore.Runtime.value<P, E>(this, value),
      payload: value,
      composite: this.composite,
      event: undefined
    }));
    return this;
  }

  html(value?: string): this {
    this.signal.dispatch('html', createContext({
      widget: WidgetCore.Runtime.html<P, E>(this, value),
      payload: value,
      composite: this.composite,
      event: undefined
    }),);
    return this;
  }

  trigger(type: keyof HTMLElementEventMap): this {
    this.signal.dispatch('trigger', createContext({
      widget: WidgetCore.Runtime.trigger<P, E>(this, type),
      payload: type,
      composite: this.composite,
      event: undefined
    }),);
    return this;
  }

  listen(type: keyof HTMLElementEventMap, listener: IChildCallback<P, E>, options?: boolean | AddEventListenerOptions): this {
    this.signal.dispatch('listen', createContext({
      widget: WidgetCore.Runtime.listen<P, E>(this, type, listener, options),
      payload: {type, listener, options,},
      composite: this.composite,
      event: undefined
    }));
    return this;
  }

  listens(listeners: IEventListeners<P, E>): this {
    return WidgetCore.Runtime.listens<P, E>(this, listeners) as typeof this;
  }

  ons(listeners: IEventStaticListeners<P, E>): this {
    return WidgetCore.Runtime.ons<P, E>(this, listeners) as typeof this;
  }

  on<V extends keyof IEventStaticListeners<P, E>>(type: V, listener: IEventStaticListeners<P, E>[V]): this {
    this.signal.dispatch('on', createContext({
      widget: WidgetCore.Runtime.on<P, E, V>(this, type, listener),
      payload: {type, listener,},
      composite: this.composite,
      event: undefined
    }));
    return this;
  }

  manipulate(callback: IManipulateCallback<P, E>): this {
    this.signal.dispatch('manipulate', createContext({
      widget: WidgetCore.Runtime.manipulate<P, E>(this, callback),
      payload: callback,
      composite: this._composite,
      event: undefined
    }));
    return this;
  }

  data(data: IExtendedAttributes): this {
    this.signal.dispatch('data', createContext({
      widget: WidgetCore.Runtime.data<P, E>(this, data),
      payload: data,
      composite: this.composite,
      event: undefined
    }));
    return this;
  }

  // attribution (attribution? : IExtendedAttributes) : this {
  //   return Coreable.attribution<P, E>(this, attribution) as typeof this;
  // }

  attrib<A extends keyof P>(name: A, value: P[A] | IParameterValue): this {
    this.signal.dispatch('attribute', createContext({
      widget: WidgetCore.Runtime.attribute<P, E, A>(this, name, value),
      payload: {name, value},
      composite: this.composite,
      event: undefined
    }));
    return this;
  }

  attribs(attributes: Partial<P>): this {
    return WidgetCore.Runtime.attributes<P, E>(this, attributes) as typeof this;
  }


  remove(): this {
    return WidgetCore.Runtime.remove<P, E>(this) as typeof this;
  }

  destroy(): void {
    WidgetCore.Runtime.destroy<P, E>(this);
  }

  setSignal<Si extends keyof IWidgetSignalableMap<P, E>>(name: Si, callback: ISignalListenOption<Readonly<Partial<IAttributesScope<P, E>>>, IWidgetSignalableMap<P, E>[Si]>): this {
    this.signal.listen(name, callback);
    return this;
  }

  setSignals(signals: Partial<IWidgetSignalableMaps<P, E>>): this {
    Object.entries(signals).forEach(({0: name, 1: callback}) =>
      this.setSignal(name as keyof IWidgetSignalableMap<P, E>, callback as ISignalListenOption<Readonly<Partial<IAttributesScope<P, E>>>, IParameterValue>));
    return this;
  }


  nsa(nsa: IParameters): this {
    const entries = WidgetCore.Runtime.nsa(nsa, undefined, ':');
    Object.entries(entries)
      .forEach(([key, value]) => {
        if ('setAttribute' in this.element) {
          this.element.setAttribute(key as string, `${value}`);
        }
      });
    return this;
  }


  render(): this {

    // this.signal.dispatch('initialize', this);

    if (this.props.signal) this.setSignals(this.props.signal);

    if (this.props.ref) this.props.ref.use(this);

    if (this.props.style) this.style(this.props.style);

    if (this.props.className) this.className(this.props.className);

    if (this.props.data) this.data(this.props.data);

    if (this.props.nsa) this.nsa(this.props.nsa);

    if (this.props.children) this.children(this.props.children);

    if (this.props.on) this.ons(this.props.on);

    if (this.props.listen) this.listens(this.props.listen);

    if (this.props.attributes) this.attribs(this.props.attributes);

    Object.entries(this.props).forEach(
      ({0: name, 1: value}) =>
        WidgetCore.Runtime.attribuable<P, E>(this, name, value),
    );

    this.signal.dispatch('render', createContext({
      payload: this,
      widget: this as IWidget<any, any>,
      composite: this._composite,
      event: undefined
    }));

    this._ready = true;

    return this;
  }

  replaceWith(widget: IWidget<any, any>): this {

    if (this._composite) widget.defineComposite(this._composite)
    if (this._parent) widget.defineParent(this._parent)

    WidgetCore.Runtime.replaceWith<P, E>(this, widget)

    widget.signal.dispatch('mount', createContext({
      payload: widget,
      widget,
      composite: this._composite,
      event: undefined
    }));

    return this;
  }

  toString(): string {
    if (!this._ready) this.render();
    if (typeof HTMLElement !== 'undefined' && this.element instanceof HTMLElement) return `${this.element.outerHTML}`;
    if (this.element instanceof WidgetPassiveElement) return `${this._element}`;
    return ``;
  }

}