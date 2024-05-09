import {
  IComponentConstruct,
  IElement,
  IElementMetrics,
  IElementSignal,
  IObject,
  IAttributes,
  IWidget,
  IWidgetElements,
} from '../types';
import {ISignalables} from '@protorians/signalable/types';
import {Signalables} from '@protorians/signalable/supports';


export class WidgetElement<Props extends IObject> extends HTMLElement implements IElement<Props> {

  #props: Props = {} as Props;

  #signal: Readonly<ISignalables<Props, IElementSignal<Props>>>;

  #component: IComponentConstruct<Props> | undefined;

  use: IComponentConstruct<Props> | undefined;

  constructor() {
    super();
    this.sync();
    this.#signal = new Signalables(this.props);
  }

  get props() {
    return this.#props;
  }

  set props( props ){
    this.#props = props
  }

  get component() {
    return this.#component;
  }

  get signal() {
    return this.#signal;
  }

  bootstrap(): this {
    return this;
  }

  mounted() {
  }

  unmounted() {
  }

  adopted() {
  }

  initialize() {

    return this.sync();

  }

  sync() {

    Object.values(this.attributes).forEach(attribute =>
      this.props[attribute.name as keyof Props] = attribute.value as Props[ keyof Props]);

    if (this.signal) this.signal.dispatch('synchronized', this.props);

    return this;

  }

  mount(component?: IComponentConstruct<Props>) {

    if (component) {
      this.#component = component;
      this.initialize();
      this.innerHTML = '';
      this.append(this.#component(this.props).element);
      this.signal.dispatch('mounted', this);
      this.mounted();

    }

    return this;

  }

  connectedCallback(): void {
    this.bootstrap().mount(this.use);
    this.signal.dispatch('connected', this);
  }

  disconnectedCallback() {
    this.signal.dispatch('disconnected', this);
    this.unmounted();
  }

  adoptedCallback() {
    this.signal.dispatch('adopted', this);
    this.adopted();
  }

}


export class WidgetElementMetrics<P extends IAttributes, E extends IWidgetElements> implements IElementMetrics<P, E> {

  width?: Readonly<number>;

  height?: Readonly<number>;

  x?: Readonly<number>;

  y?: Readonly<number>;

  top?: Readonly<number>;

  right?: Readonly<number>;

  bottom?: Readonly<number>;

  left?: Readonly<number>;

  json?: Readonly<string>;

  constructor(public widget: Readonly<IWidget<P, E>>) {

    const rect = widget.element instanceof HTMLElement ? widget.element.getBoundingClientRect() : undefined;

    if (rect) {

      this.width = rect.width;

      this.height = rect.height;

      this.x = rect.x;

      this.y = rect.y;

      this.top = rect.top;

      this.right = rect.right;

      this.bottom = rect.bottom;

      this.left = rect.left;

      this.json = JSON.stringify(rect.toJSON());

    }

  }

}