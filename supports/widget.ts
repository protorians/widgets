import type {
  IChildren,
  IProps,
  IWidget,
  IWidgetElements,
  IWidgetProps,
  IStyle,
  IClassNames,
  IPropsExtended,
  IDataValue,
  IComponent,
  IObject,
  IChildCallback,
  IWidgetSignalable,
  IManipulateCallback,
  IWidgetSignalableListeners,
  IEventStaticListeners,
  IEventListeners,
  IWidgetAttributesMap,
  IEventStaticListenerPayload, IWidgetListenerMap,
} from '../types';
import {
  decamelize,
  attribution,
  createWidgetSignalableDispatcher,
} from '../utilities';
import {
  createContext,
  WidgetFactory,
  WIDGET_NATIVE_PROPS,
} from '../foundation';
import {Signalables} from '@protorians/signalable';


export class Widget<P extends IProps, E extends IWidgetElements> implements IWidget<P, E> {

  #element: E;

  #component: IComponent<IObject> | undefined;

  #ready: boolean = false;

  signal: IWidgetSignalable<P, E>;

  constructor(public props: Readonly<Partial<IWidgetProps<P, E>>>) {

    this.#element = document.createElement(this.tag) as E;

    this.signal = new Signalables(props);

  }

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

  child(value?: IChildren<IProps, IWidgetElements>): this {

    return WidgetFactory.setChildren<P, E>(this, value) as typeof this;

  }

  style(value?: IStyle<P, E>): this {

    return WidgetFactory.setStyle<P, E>(this, value) as typeof this;

  }

  className(values?: IClassNames<P, E>): this {

    return WidgetFactory.setClassName<P, E>(this, values) as typeof this;

  }

  value(value?: string): this {

    return WidgetFactory.setValue<P, E>(this, value) as typeof this;

  }

  html(value?: string): this {

    return WidgetFactory.setHtml<P, E>(this, value) as typeof this;

  }


  trigger(type ?: keyof HTMLElementEventMap): this {

    return WidgetFactory.setTrigger<P, E>(this, type) as typeof this;

  }


  listen(type: keyof HTMLElementEventMap, listener: IChildCallback<P, E>, options?: boolean | AddEventListenerOptions): this {

    if (this.element instanceof HTMLElement) {

      this.element.addEventListener(type, event => listener(
        createContext<P, E>({
          widget: this,
          component: this.#component,
          event,
        }),
      ), options);

      this.signal.dispatch(
        'listen',
        createWidgetSignalableDispatcher<IWidgetListenerMap<P, E>, P, E>(this, {
          type,
          listener,
          options,
        }),
      );

    }

    return this;
  }

  listens(listeners: IEventListeners<P, E>): this {

    Object.entries(listeners)
      .forEach(({0: type, 1: callback}) => {

        if (typeof callback == 'function') {
          this.listen(type as keyof HTMLElementEventMap, callback, false);
        } else if (typeof callback == 'object') {
          this.listen(type as keyof HTMLElementEventMap, callback.call, callback.options);
        }

      });

    return this;
  }

  ons(listeners: IEventStaticListeners<P, E>): this {

    Object.entries(listeners)
      .forEach(({0: type, 1: callback}) =>
        this.on(type as keyof IEventStaticListeners<P, E>, callback));

    return this;
  }

  on<V extends keyof IEventStaticListeners<P, E>>(type: V, listener: IEventStaticListeners<P, E>[V]): this {

    if (this.element instanceof HTMLElement) {
      // @ts-ignore
      this.element[`on${type.toLowerCase()}`] = (e: Event) => {

        if (typeof listener == 'undefined') e.preventDefault();

        else if (listener === null) {
          // @ts-ignore
          this.element[`on${type.toLowerCase()}`] = null;
        } else if (typeof listener == 'boolean') {
          return listener;
        } else if (typeof listener == 'function') {
          return listener(
            createContext<P, E>({
              widget: this,
              event: e,
              component: this.#component,
            }),
          );
        }

      };

      this.signal.dispatch(
        'on',
        createWidgetSignalableDispatcher<IEventStaticListenerPayload<V, P, E>, P, E>(this, {
          type,
          listener,
        }),
      );

    }

    return this;
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


  data(data?: IPropsExtended): this {

    if (data && this.#element instanceof HTMLElement) {
      Object.entries(data).forEach(
        ({0: name, 1: value}) =>
          (this.#element instanceof HTMLElement)
            ? this.#element.dataset[decamelize(name, '-')] = `${value}`
            : undefined,
      );

      this.signal.dispatch(
        'data',
        createWidgetSignalableDispatcher<IPropsExtended, P, E>(this, data),
      );

    }

    return this;
  }

  ns(ns?: IPropsExtended): this {

    if (ns && this.#element instanceof HTMLElement) {
      Object.entries(attribution(ns)).forEach(
        ({0: name, 1: value}) =>
          (this.#element instanceof HTMLElement)
            ? this.#element.setAttribute(`${name}`, `${value}`)
            : undefined,
      );

      this.signal.dispatch(
        'ns',
        createWidgetSignalableDispatcher<IPropsExtended, P, E>(this, ns),
      );

    }

    return this;
  }

  attrib(name: keyof P, value: P[keyof P] | IDataValue): this {

    if (this.#element instanceof HTMLElement) {

      if (value === null) {

        this.#element.setAttribute(`${name as string}`, '');

      } else if (value === undefined) {

        this.#element.removeAttribute(`${name as string}`);

      } else if (typeof value == 'string' || typeof value == 'number') {

        this.#element.setAttribute(`${name as string}`, `${value}`);

      } else if (typeof value == 'boolean') {

        if (value) this.#element.setAttribute(`${name as string}`, `${name as string}`);

        else this.#element.removeAttribute(`${name as string}`);

      } else if (typeof value == 'object') {

        this.#element.setAttribute(`${name as string}`, `${JSON.stringify(value)}`);

      } else {

        console.error('Attribute of', name, value);

        throw 'unsupported attribute';

      }

      this.signal.dispatch(
        'attributes',
        createWidgetSignalableDispatcher<IWidgetAttributesMap<P>, P, E>(this, {
          name,
          value,
        }),
      );

    }

    return this;
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

    if (this.props.ns) this.ns(this.props.ns);

    if (this.props.child) this.child(this.props.child);

    if (this.props.on) this.ons(this.props.on);

    if (this.props.listen) this.listens(this.props.listen);


    Object.entries(this.props).forEach(
      ({0: name, 1: value}) => {
        if (!WIDGET_NATIVE_PROPS.includes(name)) {

          switch (typeof value) {

            case 'function':
              this.attrib(name as keyof P, value(
                createContext<P, E>({
                  widget: this,
                  component: this.component,
                }),
              ) as P[keyof P]);
              break;

            default:
              this.attrib(name as keyof P, value as P[keyof P]);
              break;

          }

        }
      },
    );

    this.#ready = true;

    this.signal.dispatch('ready', createWidgetSignalableDispatcher<typeof this, P, E>(this, this));

    return this;

  }

}