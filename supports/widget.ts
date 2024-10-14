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
  Coreable,
  WidgetPassiveElement,
} from '../foundation';
import {Signalables, type ISignalListenOption} from '@protorians/signalable';


export class WidgetNode<P extends IAttributes, E extends IWidgetElements> implements IWidget<P, E> {

  protected _element: E;

  protected _component: IComponent<IParameters> | undefined;

  protected _ready: boolean = false;

  protected _parent: IWidget<IAttributes, IWidgetElements> | undefined;

  protected _tag: string;


  signal: IWidgetSignalable<P, E>;

  props: Readonly<Partial<IAttributesScope<P, E>>>;


  constructor(props: IAttributesScope<P, E>, tag?: string) {

    this._tag = tag || 'div';

    this._element = (typeof HTMLElement !== 'undefined' ? document.createElement(this.tag) : new WidgetPassiveElement()) as E;

    if (this._element instanceof WidgetPassiveElement) this._element.tagName = this.tag;

    this.props = (new Coreable.Properties<P, E>(this)).sync(props) as Readonly<Partial<IAttributesScope<P, E>>>;

    this.signal = new Signalables(this.props) as IWidgetSignalable<P, E>;

    this.signal.listen('mount', () => this._ready = true);

    this.construct();

  }

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
    return this._component;
  }

  get parent() {
    return this._parent;
  }

  get isReady() {
    return this._ready;
  }

  construct(): void {
  }

  defineElement(element: E): this {
    this._element = element;
    this.signal.dispatch('defineElement', createContext({
      payload: element,
      widget: this as IWidget<any, any>,
      composite: this._component,
      event: undefined
    }));
    return this;
  }

  defineComponent<C extends IParameters>(component: IComponent<C>): this {
    this._component = component;
    this.signal.dispatch('defineComponent', createContext({
      payload: this._component as IComponent<any>,
      widget: this as IWidget<any, any>,
      composite: this._component,
      event: undefined
    }));
    return this;
  }

  useComposite<Props extends IParameters>(composite: IComponent<Props> | undefined): this {
    if (composite) {
      composite.widget = this;
      this._component = composite;
      this.signal.dispatch('useComponent', createContext({
        payload: this._component as IComponent<any>,
        widget: this as IWidget<any, any>,
        composite: this._component,
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
    return this;
  }

  clear(): this {
    return Coreable.clear<P, E>(this) as typeof this;
  }

  children(value?: IChildren<IAttributes, IWidgetElements>): this {
    return Coreable.children<P, E>(this, value) as typeof this;
  }

  style(value: IStyle<P, E>): this {
    return Coreable.style<P, E>(this, value) as typeof this;
  }

  className(values: IClassNames<P, E>): this {
    return Coreable.className<P, E>(this, values) as typeof this;
  }

  value(value?: string): this {
    return Coreable.value<P, E>(this, value) as typeof this;
  }

  html(value?: string): this {
    return Coreable.html<P, E>(this, value) as typeof this;
  }

  trigger(type ?: keyof HTMLElementEventMap): this {
    return Coreable.trigger<P, E>(this, type) as typeof this;
  }

  listen(type: keyof HTMLElementEventMap, listener: IChildCallback<P, E>, options?: boolean | AddEventListenerOptions): this {
    return Coreable.listen<P, E>(this, type, listener, options) as typeof this;
  }

  listens(listeners: IEventListeners<P, E>): this {
    return Coreable.listens<P, E>(this, listeners) as typeof this;
  }

  ons(listeners: IEventStaticListeners<P, E>): this {
    return Coreable.ons<P, E>(this, listeners) as typeof this;
  }

  on<V extends keyof IEventStaticListeners<P, E>>(type: V, listener: IEventStaticListeners<P, E>[V]): this {
    return Coreable.on<P, E, V>(this, type, listener) as typeof this;
  }

  manipulate(callback: IManipulateCallback<P, E>): this {
    callback(createContext<IManipulateCallback<P, E>, P, E>({
      widget: this,
      composite: this._component,
      payload: callback,
    }));
    this.signal.dispatch('manipulate', createContext({
      payload: callback,
      widget: this as IWidget<any, any>,
      composite: this._component,
      event: undefined
    }));

    return this;
  }

  data(data?: IExtendedAttributes): this {
    return Coreable.data<P, E>(this, data) as typeof this;
  }

  // attribution (attribution? : IExtendedAttributes) : this {
  //   return Coreable.attribution<P, E>(this, attribution) as typeof this;
  // }

  attrib<A extends keyof P>(name: A, value: P[A] | IParameterValue): this {
    return Coreable.attribute<P, E, A>(this, name, value) as typeof this;
  }

  attribs(attributes: Partial<P>): this {
    return Coreable.attributes<P, E>(this, attributes) as typeof this;
  }


  remove(): this {
    return Coreable.remove<P, E>(this) as typeof this;
  }

  destroy(): void {
    Coreable.destroy<P, E>(this);
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
    const entries = Coreable.nsa(nsa, undefined, ':');
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
        Coreable.attribuable<P, E>(this, name, value),
    );

    this.signal.dispatch('render', createContext({
      payload: this,
      widget: this as IWidget<any, any>,
      composite: this._component,
      event: undefined
    }));

    return this;
  }

  replaceWith(widget: IWidget<any, any>): this {

    if ('replaceWith' in this.element) {

      if(this._component) widget.defineComponent(this._component)
      if(this._parent) widget.defineParent(this._parent)

      this.element.replaceWith(widget.element)
      widget.signal.dispatch('mount', createContext({
        payload: widget,
        widget,
        composite: this._component,
        event: undefined
      }));
    }

    return this;
  }

  toString(): string {
    if (!this._ready) this.render();
    if (typeof HTMLElement !== 'undefined' && this.element instanceof HTMLElement) {
      return `${this.element.outerHTML}`;
    }
    if (this.element instanceof WidgetPassiveElement) {
      return `${this._element}`;
    }
    return ``;
  }

}