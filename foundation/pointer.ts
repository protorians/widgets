import type {
  IChild,
  IChildCallback,
  IContext,
  IPointer,
  IPointerCollectionChild,
  IPointerCollectionChildren,
  IPointerMarker,
  IPointerSignals,
  IAttributes,
  IWidget,
  IWidgetElements, IPointerMarkerElement,
} from '../types';
import {createContext} from './context';
import {Signalables, type ISignalables} from '@protorians/signalable';
import {WidgetNode} from '../supports';
import {setMarkerOnPointer} from '../utilities';



export class PointerWidgetMarkerElement extends HTMLElement implements IPointerMarkerElement {

  #queues: IPointerCollectionChild[] = [];

  queue(child: IPointerCollectionChild): this {
    this.#queues.push(child);
    return this;
  }

  queues(): IPointerCollectionChild[] {
    return this.#queues;
  }

  clearQueues() {

    try {

      this.#queues.forEach(child =>
        child?.parentElement?.removeChild(child));

    } catch (er) {
      console.error('PointerWidgetMarkerElement::queues', er);
    }

    this.#queues = [];
    return this;
  }

  consumeQueue(child: IPointerCollectionChild | undefined) {

    return setMarkerOnPointer(this, child);

  }

  autoload() {
    this.#queues = this.#queues.map(this.consumeQueue.bind(this))
      .filter(c => typeof c != 'undefined');
    return this;
  }

  connectedCallback() {
    this.autoload();
  }

}


export class WidgetPointerSlot implements IPointerMarker {

  #current: IPointerMarkerElement | undefined;


  static tagName: string = 'widget-pointer-slot';

  get current() {
    return this.#current;
  }

  hydrate(): this {
    this.#current = new PointerWidgetMarkerElement;
    this.#current.setAttribute('widget:pointer', '');
    return this;
  }

  queue(child: IPointerCollectionChild): this {
    this.current?.queue(child);
    return this;
  }

  consume(child: IPointerCollectionChild): this {

    if (this.current) {

      this.queue(child).queues()?.map(queue =>
        this.current ? setMarkerOnPointer(this.current, queue) : undefined);

    }

    return this;
  }

  queues(): IPointerCollectionChild[] | undefined {
    return this.current?.queues();
  }

}


export class PointerWidget<Payload, P extends IAttributes, E extends IWidgetElements> implements IPointer<Payload, P, E> {

  #parent: IWidget<IAttributes, IWidgetElements> | undefined;

  #signal: Readonly<ISignalables<IChildCallback<P, E> | undefined, IPointerSignals<P, E>>>;

  marker: Readonly<IPointerMarker>;


  constructor(
    public callback: IChildCallback<P, E> | undefined,
    protected initial: Payload,
  ) {

    this.#signal = new Signalables(callback);

    this.marker = (new WidgetPointerSlot).hydrate();

  }

  get parent(): IWidget<IAttributes, IWidgetElements> | undefined {
    return this.#parent;
  }

  get signal() {
    return this.#signal;
  }

  call(payload: Payload) {
    return (this.#parent && this.callback) ? this.callback(
      createContext<Payload, P, E>({
        widget: this.#parent as IWidget<any, any>,
        component: this.#parent?.component,
        payload,
      }) as IContext<Payload, P, E>,
    ) || undefined
      : undefined;
  }

  use(callback: IChildCallback<P, E>): this {
    this.callback = callback;
    this.#signal.dispatch('defined', this.callback);
    return this;
  }

  renderChild(child: IChild<P, E>): IPointerCollectionChildren {

    if (child) {
      if (Array.isArray(child)) {
        return child.map(c => this.renderChild(c)) as IPointerCollectionChildren;
      } else if (child instanceof HTMLElement || child instanceof DocumentFragment) {
        return child;
      } else if (child instanceof WidgetNode) {
        return child.render().element;
      } else {
        return document.createTextNode(`${typeof child == 'object' ? JSON.stringify(child) : child}`);
      }
    }

    return undefined;

  }

  clear() {
    this.marker.current?.clearQueues();
    return this;
  }

  append(child: IPointerCollectionChild) {
    if (!this.marker.current?.isConnected) {
      this.marker.queue(child);
    } else {
      this.marker.consume(child);
    }
    return this;
  }

  appendChild(child: IPointerCollectionChild): IPointerCollectionChild {
    this.append(child);
    return child;
  }

  render(payload?: Payload): this {
    const children = this.clear().renderChild(this.call(payload || this.initial));
    (Array.isArray(children) ? children : [children])
      .map(child => this.appendChild(child));

    return this;
  }

  destroy(): this {
    this.#signal.dispatch('destroyed', undefined);
    this.callback = undefined;
    this.marker.current?.clearQueues();
    return this;
  }

  bind(widget: IWidget<P, E>): this {
    this.#parent = widget as IWidget<any, any>;
    this.#signal.dispatch('bound', this.#parent);
    return this;
  }

}


if (!customElements.get(WidgetPointerSlot.tagName)) {

  customElements.define(
    WidgetPointerSlot.tagName,
    PointerWidgetMarkerElement, {
      // extends: 'template',
    },
  );

}
