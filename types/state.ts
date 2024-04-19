import type { ISupportableValue } from "./values";
import {ISignalables} from '@protorians/signalable/types';
import {PointerWidget} from '../foundation/pointer';
import {IPointer} from './pointer';

export type IStateSignals<V extends ISupportableValue> = {

    'pointer:updated': IPointer<any, any>;

    'pointers:updated': IPointer<any, any>[];

    updated: V;

    destroy: IState<V>;

    used: PointerWidget<any, any>;

}

export interface IState<V extends ISupportableValue> {

    get value(): V | undefined;

    get initial(): V | undefined;

    get signal(): Readonly<ISignalables<V | undefined, IStateSignals<V>>>;

    set(value: V): this;

    unset(): this;

}
