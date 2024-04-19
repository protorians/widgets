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
  IContextuable,
  IObject,
} from '../types';
import {decamelize} from '../utilities/camelization';
import {attribution} from '../utilities/attributionable';
import {IActions} from '../types/actions';
import {createContext} from '../foundation';
import {WIDGET_NATIVE_PROPS} from '../foundation/constants';
import {PointerWidget} from '../foundation/pointer';


export class Widget<P extends IProps, E extends IWidgetElements> implements IWidget<P, E> {

  #element: E;

  #component: IComponent<IObject> | undefined;

  constructor(public props: IWidgetProps<P, E>) {

    this.#element = document.createElement(this.tag) as E;

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


  initialize(): this {

    return this;

  }

  useComponent<Props extends IObject>(component: IComponent<Props> | undefined): this {

    if (component) {

      component.widget = this;

      this.#component = component;

    }

    return this;

  }

  child(value?: IChildren<IProps, IWidgetElements>): this {

    if (value) {

      if (value instanceof PointerWidget) {

        this.#element.append(value.bind(this).refresh().marker || document.createDocumentFragment());

      } else if (typeof value == 'object' && Array.isArray(value)) {

        value.forEach(c => this.child(c));

      } else if (typeof value == 'function') {

        this.child(value(createContext({widget: this, component: this.#component})));

      } else if (value instanceof Promise) {

        value.then(c => this.child(c));
        // .catch(er => this.child(er))

      } else if (value instanceof Widget) {

        this.#element.append(value.useComponent(this.#component).render().element);

      } else if (value instanceof HTMLElement || value instanceof DocumentFragment) {

        this.#element.append(value);

      } else if (typeof value == 'string') {

        this.#element.append(document.createTextNode(value));

      } else {

        this.#element.append(document.createTextNode(`${value}`));
      }

    }

    return this;

  }

  style(value?: IStyle): this {

    if (value && this.#element instanceof HTMLElement)
      Object.entries(value).forEach(({0: property, 1: value}) =>
        // @ts-ignore
        this.#element.style[property] = value as CSSStyleDeclaration[ keyof CSSStyleDeclaration ],
      );

    return this;

  }

  className(values?: IClassNames): this {

    if (values && this.#element instanceof HTMLElement) {

      if (Array.isArray(values)) values.forEach(value => (this.#element instanceof HTMLElement)
        ? this.#element.classList.add(value)
        : undefined,
      );

      else this.#element.classList.add(values);

    }

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
    }

    return this;
  }


  actions(actions: IActions<P, E>) {

    if (this.#element instanceof HTMLElement) {

      Object.entries(actions)
        .forEach(({0: type, 1: callback}) =>
          this.element.addEventListener(type, event =>
            callback(
              createContext({widget: this, event, component: this.#component} as IContextuable<P, E>),
            ),
          ),
        );

    }
    return this;

  }

  render(): this {

    if (this.props.ref) this.props.ref.use(this);

    if (this.props.style) this.style(this.props.style);

    if (this.props.className) this.className(this.props.className);

    if (this.props.data) this.data(this.props.data);

    if (this.props.ns) this.ns(this.props.ns);

    if (this.props.child) this.child(this.props.child);

    if (this.props.actions) this.actions(this.props.actions);

    Object.entries(this.props).forEach(
      ({0: name, 1: value}) => {
        if (!WIDGET_NATIVE_PROPS.includes(name))
          this.attrib(name as keyof P, value as P[keyof P]);
      },
    );

    return this;

  }

}