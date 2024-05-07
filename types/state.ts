import type {ISupportableValue} from './values';
import {ISignalables} from '@protorians/signalable/types';
import {IPointer} from './pointer';
import {IProps} from './props';
import {IWidgetElements} from './widget';
import {IChildCallback} from './children';

export type IStateSignals<V extends ISupportableValue> = {

  'pointer:updated': IPointer<any, any>;

  'pointers:updated': IPointer<any, any>[];

  updated: V;

  destroy: IState<V>;

  used: IPointer<any, any>;

}

export interface IState<V extends ISupportableValue> {

  get value(): V | undefined;

  get initial(): V | undefined;

  get signal(): Readonly<ISignalables<V, IStateSignals<V>>>;

  set(value: V): this;

  unset(): this;

  widget<P extends IProps, E extends IWidgetElements>(callback: IChildCallback<P, E>): IPointer<P, E>;

}
