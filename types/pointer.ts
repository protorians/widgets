import {IChildCallback, IChildOnly} from './children';
import {IAttributes} from './attributes';
import {IWidget, IWidgetElements} from './widget';
import {ISignalables} from '@protorians/signalable/types';


export type IPointerSignals<P extends IAttributes, E extends IWidgetElements> = {

  defined: IChildCallback<P, E> | undefined;

  refresh: IPointerBond;

  destroyed: undefined;

  bound: IWidget<IAttributes, IWidgetElements> | undefined;

}


export type IPointerBond = Element | Node | undefined;

export type IPointerCollectionChild = Text | HTMLElement | DocumentFragment | undefined;

export type IPointerCollectionChildren = IPointerCollectionChild | IPointerCollectionChild[];


export interface IPointerMarkerElement extends HTMLSlotElement {

  queue(child: IPointerCollectionChild): this;

  queues(): IPointerCollectionChild[];

  clearQueues(): this;

  autoload(): this;

}


export interface IPointerMarker {

  get current(): IPointerMarkerElement | undefined;

  hydrate(): this;

  queue(child: IPointerCollectionChild): this;

  consume(child: IPointerCollectionChild): this;

  queues(): IPointerCollectionChild[] | undefined;

}

export interface IPointer<Payload, P extends IAttributes, E extends IWidgetElements> {

  marker: Readonly<IPointerMarker>;

  get parent(): IWidget<IAttributes, IWidgetElements> | undefined;

  get signal(): Readonly<ISignalables<IChildCallback<P, E> | undefined, IPointerSignals<P, E>>>;

  callback: IChildCallback<P, E> | undefined;

  call(payload: Payload): IChildOnly<P, E> | undefined;

  use(callback: IChildCallback<P, E>): this;

  render(payload?: Payload): this;

  bind(widget: IWidget<P, E>): this;

  append(child: IPointerCollectionChild): this;

  appendChild(child: IPointerCollectionChild): IPointerCollectionChild;

  destroy(): this;

  clear(): this;

}