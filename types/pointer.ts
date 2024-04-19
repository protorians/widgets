import {IChildCallback, IChildOnly} from './children';
import {IProps} from './props';
import {IWidget, IWidgetElements} from './widget';
import {ISignalables} from '@protorians/signalable/types';


export type IPointerSignals<P extends IProps, E extends IWidgetElements> = {

  defined: IChildCallback<P, E>|undefined;

  refresh: IPointerRendering;

  destroyed: undefined;

  bound: IWidget<IProps, IWidgetElements> | undefined;

}

export type IPointerRendering = HTMLElement | DocumentFragment | Text | undefined;

export interface IPointer<P extends IProps, E extends IWidgetElements>{

  get parent(): IWidget<IProps, IWidgetElements> | undefined;

  get marker(): IPointerRendering;

  get signal(): Readonly<ISignalables<IChildCallback<P, E> | undefined, IPointerSignals<P, E>>>;

  callback: IChildCallback<P, E> | undefined;

  call(): IChildOnly<P, E> | undefined;

  use(callback: IChildCallback<P, E>): this;

  refresh(): this;

  destroy(): this;

  bind(widget: IWidget<IProps, IWidgetElements>): this;

  render(): IPointerRendering;

}