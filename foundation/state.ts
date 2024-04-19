import type {
  IState,
  ISupportableValue,
  IChildCallback,
  IProps,
  IWidgetElements, IStateSignals, IPointer,
} from '../types';
import {PointerWidget} from './pointer';
import {Signalables, type ISignalables} from '@protorians/signalable';

export class WidgetState<V extends ISupportableValue> implements IState<V> {

  #value?: V;

  #initial?: V;

  #signal: Readonly<ISignalables<V | undefined, IStateSignals<V>>>;

  #pointers: IPointer<any, any>[] = [];

  constructor(value?: V) {

    this.#value = value;

    this.#initial = value;

    this.#signal = new Signalables(value);

  }

  get value(): V | undefined {
    return this.#value;
  }

  get initial(): V | undefined {
    return this.#initial;
  }

  get signal() {
    return this.#signal;
  }

  get pointers() {
    return this.#pointers;
  }

  updatePointers() {

    this.pointers.forEach(pointer => {
      pointer.refresh();
      this.signal.dispatch('pointer:updated', pointer);
    });

    this.signal.dispatch('pointers:updated', this.pointers);

    return this;

  }

  set(value: V): this {

    this.#value = value;

    this.signal.dispatch('updated', value);

    return this.updatePointers();

  }

  unset(): this {

    this.#value = undefined;

    this.signal.dispatch('destroy', this);

    return this.updatePointers();

  }

  use<P extends IProps, E extends IWidgetElements>(callback: IChildCallback<P, E>) {

    const pointer = new PointerWidget(callback);

    this.pointers.push(pointer);

    this.signal.dispatch('used', pointer);

    return pointer;

  }


  increment(value?: number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value + (value || 1)) as V);
    }
    return this;
  }

  decrement(value?: number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value - (value || 1)) as V);
    }
    return this;
  }

  multiply(value?: number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value * (value || 1)) as V);
    }
    return this;
  }

  divide(value?: number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value / (value || 1)) as V);
    }
    return this;
  }

}
