import {
  IChildCallback, IContext,
  IPointer, IPointerRendering,
  IPointerSignals,
  IProps,
  IWidget,
  IWidgetElements,
} from '../types';
import {createContext} from './context';
import {Signalables, type ISignalables} from '@protorians/signalable';
import {Widget} from '../supports';

export class PointerWidget<P extends IProps, E extends IWidgetElements> implements IPointer<P, E> {

  #parent: IWidget<IProps, IWidgetElements> | undefined;

  #marker: IPointerRendering;

  #signal: Readonly<ISignalables<IChildCallback<P, E> | undefined, IPointerSignals<P, E>>>;

  #rendering: IPointerRendering | undefined;

  constructor(public callback: IChildCallback<P, E> | undefined) {

    this.#signal = new Signalables(callback);

    this.#marker = document.createDocumentFragment();

  }

  get parent(): IWidget<IProps, IWidgetElements> | undefined {
    return this.#parent;
  }

  get marker() {
    return this.#marker;
  }

  get signal() {
    return this.#signal;
  }

  call() {
    return (this.#parent && this.callback) ? this.callback(
      createContext<IProps, IWidgetElements>({
        widget: this.#parent,
        component: this.#parent?.component,
      }) as IContext<P, E>,
    ) || undefined
      : undefined;
  }

  use(callback: IChildCallback<P, E>): this {
    this.callback = callback;
    this.#signal.dispatch('defined', this.callback);
    return this;
  }

  render(): IPointerRendering {

    const render = this.call();

    if (render) {
      if (render instanceof HTMLElement || render instanceof DocumentFragment) {
        return render;
      } else if (render instanceof Widget) {
        return render.render().element;
      } else if (typeof render == 'object') {
        return document.createTextNode(`${JSON.stringify(render)}`);
      } else {
        return document.createTextNode(`${render}`);
      }
    }

    return undefined;

  }

  refresh(): this {

    this.#marker = this.#rendering || this.#marker;

    this.#rendering = this.render();

    if (this.#rendering && this.#marker) {

      if (this.#marker instanceof Text) {

        const marker = document.createDocumentFragment();

        marker.append(this.#rendering);

        this.#marker.parentElement?.replaceChild(marker, this.#marker);

        this.#marker = marker;

      } else {

        this.#marker.appendChild(this.#rendering);

        this.#marker.parentElement?.replaceChild(this.#rendering, this.#marker);

      }

      this.#signal.dispatch('refresh', this.#rendering);

    }

    return this;
  }

  destroy(): this {
    this.#signal.dispatch('destroyed', undefined);
    this.callback = undefined;
    return this;
  }

  bind(widget: IWidget<IProps, IWidgetElements>): this {
    this.#parent = widget;
    this.#signal.dispatch('bound', this.#parent);
    return this;
  }

}