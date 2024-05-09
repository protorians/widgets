import type {
  IChildren,
  IAttributes,
  IWidget,
  IWidgetElements,
  IAttributesScope,
  IStyle,
  IClassNames,
  IExtendedAttributes,
  IDataValue,
  IComponent,
  IObject,
  IChildCallback,
  IWidgetSignalable,
  IManipulateCallback,
  IWidgetSignalableListeners,
  IEventStaticListeners,
  IEventListeners,
} from '../types';
import {
  createWidgetSignalableDispatcher,
} from '../utilities';
import {
  createContext,
  WidgetCore,
} from '../foundation';
import {Signalables} from '@protorians/signalable';


export class WidgetNode<P extends IAttributes, E extends IWidgetElements> implements IWidget<P, E> {

  #element: E;

  #component: IComponent<IObject> | undefined;

  #ready: boolean = false;

  signal: IWidgetSignalable<P, E>;

  get tag(): string {
    return 'div';
  }

  get element() {
    return this.#element;
  }

  get component(): IComponent<IObject> | undefined {
    return this.#component;
  }

  get ready() {
    return this.#ready;
  }

  constructor(public props: Readonly<Partial<IAttributesScope<P, E>>>) {

    this.#element = document.createElement(this.tag) as E;

    this.signal = new Signalables(props);

  }

  defineElement(element: E): this {
    this.#element = element;
    this.signal.dispatch(
      'defineElement',
      createWidgetSignalableDispatcher<E, P, E>(this, element),
    );

    return this;
  }

  defineComponent<C extends IObject>(component: IComponent<C>): this {
    this.#component = component;
    this.signal.dispatch(
      'defineComponent',
      createWidgetSignalableDispatcher<IComponent<C>, P, E>(this, component),
    );

    return this;
  }

  useComponent<Props extends IObject>(component: IComponent<Props> | undefined): this {

    if (component) {
      component.widget = this;
      this.#component = component;

      this.signal.dispatch(
        'useComponent',
        createWidgetSignalableDispatcher<IComponent<Props>, P, E>(this, component),
      );

    }

    return this;

  }

  child(value?: IChildren<IAttributes, IWidgetElements>): this {

    return WidgetCore.setChildren<P, E>(this, value) as typeof this;

  }

  style(value?: IStyle<P, E>): this {

    return WidgetCore.setStyle<P, E>(this, value) as typeof this;

  }

  className(values?: IClassNames<P, E>): this {

    return WidgetCore.setClassName<P, E>(this, values) as typeof this;

  }

  value(value?: string): this {

    return WidgetCore.setValue<P, E>(this, value) as typeof this;

  }

  html(value?: string): this {

    return WidgetCore.setHtml<P, E>(this, value) as typeof this;

  }

  trigger(type ?: keyof HTMLElementEventMap): this {

    return WidgetCore.setTrigger<P, E>(this, type) as typeof this;

  }

  listen(type: keyof HTMLElementEventMap, listener: IChildCallback<P, E>, options?: boolean | AddEventListenerOptions): this {

    return WidgetCore.setListen<P, E>(this, type, listener, options) as typeof this;

  }

  listens(listeners: IEventListeners<P, E>): this {

    return WidgetCore.setListens<P, E>(this, listeners) as typeof this;

  }

  ons(listeners: IEventStaticListeners<P, E>): this {

    return WidgetCore.setOns<P, E>(this, listeners) as typeof this;

  }

  on<V extends keyof IEventStaticListeners<P, E>>(type: V, listener: IEventStaticListeners<P, E>[V]): this {

    return WidgetCore.setOn<P, E, V>(this, type, listener) as typeof this

  }

  manipulate(callback: IManipulateCallback<P, E>): this {

    callback(
      createContext<P, E>({
        widget: this,
        component: this.#component,
      }),
    );

    this.signal.dispatch('manipulate', createWidgetSignalableDispatcher<typeof callback, P, E>(this, callback));

    return this;
  }

  data(data?: IExtendedAttributes): this {

    return WidgetCore.setData<P,E>(this, data) as typeof this;

  }

  attribution(ns?: IExtendedAttributes): this {

    return WidgetCore.attribution<P,E>(this, ns) as typeof this;

  }

  attrib<A extends keyof P>(name: A, value: P[A] | IDataValue): this {

    return WidgetCore.setAttribute<P, E, A>(this, name, value) as typeof this;

  }


  remove(): this {

    if (this.#element instanceof HTMLElement) this.#element.remove();

    else this.#element.parentElement?.removeChild(this.#element);

    this.signal.dispatch('remove', createWidgetSignalableDispatcher<typeof this, P, E>(this, this));

    return this;

  }


  onSignal<Si extends keyof IWidgetSignalableListeners<P, E>>(name: Si, callback: IWidgetSignalableListeners<P, E>[Si]) {
    // @ts-ignore
    this.signal.listen(name, callback);
    return this;
  }


  onSignals(signals: Partial<IWidgetSignalableListeners<P, E>>): this {

    Object.entries(signals).forEach(({0: name, 1: callback}) =>
      this.onSignal(name as keyof IWidgetSignalableListeners<P, E>, callback));

    return this;
  }

  render(): this {

    this.signal.dispatch('initialize', createWidgetSignalableDispatcher<typeof this, P, E>(this, this));

    if (this.props.signal) this.onSignals(this.props.signal);

    if (this.props.ref) this.props.ref.use(this);

    if (this.props.style) this.style(this.props.style);

    if (this.props.className) this.className(this.props.className);

    if (this.props.data) this.data(this.props.data);

    if (this.props.ns) this.attribution(this.props.ns);

    if (this.props.child) this.child(this.props.child);

    if (this.props.on) this.ons(this.props.on);

    if (this.props.listen) this.listens(this.props.listen);


    Object.entries(this.props).forEach(
      ({0: name, 1: value}) =>
        WidgetCore.setAttribuable<P, E>(this, name, value),
    );

    this.#ready = true;

    this.signal.dispatch('ready', createWidgetSignalableDispatcher<typeof this, P, E>(this, this));

    return this;

  }

}