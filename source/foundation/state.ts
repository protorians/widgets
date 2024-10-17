import type {
  IState ,
  ISupportableValue ,
  IAttributes ,
  IWidgetElements ,
  IStateSignals ,
  IPointer , IContextualChildCallback , IWidget ,
} from '../types';
import {PointerWidget} from './pointer';
import {Signalables , type ISignalables} from '@protorians/signalable';

export class WidgetState<V extends ISupportableValue> implements IState<V> {

  #value : V;

  #initial? : V;

  #signal : Readonly<ISignalables<V , IStateSignals<V>>>;

  #pointers : IPointer<V , any , any>[] = [];

  constructor (value : V) {

    this.#value = value;

    this.#initial = value;

    this.#signal = new Signalables(value);

  }

  get value () : V {
    return this.#value;
  }

  get initial () : V | undefined {
    return this.#initial;
  }

  get signals () {
    return this.#signal;
  }

  get pointers () {
    return this.#pointers;
  }

  updatePointers () : this {
    this.pointers.forEach(pointer => {
      pointer.render(this.#value);
      this.signals.dispatch('pointer:updated' , pointer);
    });

    this.signals.dispatch('pointers:updated' , this.pointers);
    return this;

  }

  set (value : V) : this {
    this.#value = value;
    this.signals.dispatch('updated' , value);
    return this.updatePointers();
  }

  unset () : this {
    this.set(undefined as V);
    this.signals.dispatch('destroy' , this);
    return this.updatePointers();
  }

  widget<P extends IAttributes , E extends IWidgetElements> (callback : IContextualChildCallback<V , P , E>) : PointerWidget<V , P , E> | IWidget<any , IWidgetElements> {
    const pointer = new PointerWidget<V , P , E>(callback , this.#value);
    this.pointers.push(pointer);
    this.signals.dispatch('used' , pointer);
    return pointer;
  }

  increment (value? : number) : this {
    if (typeof this.#value == 'number') {
      this.set((this.#value + (value || 1)) as V);
    }
    return this;
  }

  decrement (value? : number) : this {
    if (typeof this.#value == 'number') {
      this.set((this.#value - (value || 1)) as V);
    }
    return this;
  }

  multiply (value? : number) : this {
    if (typeof this.#value == 'number') {
      this.set((this.#value * (value || 1)) as V);
    }
    return this;
  }

  divide (value? : number) : this {
    if (typeof this.#value == 'number') {
      this.set((this.#value / (value || 1)) as V);
    }
    return this;
  }

  activate () : this {
    if (typeof this.#value == 'boolean') {
      this.set(true as V);
    }
    return this;
  }

  deactivate () : this {
    if (typeof this.#value == 'boolean') {
      this.set(false as V);
    }
    return this;
  }

  cancel () : this {
    this.set(null as V);
    return this;
  }

  toggle () : this {
    if (typeof this.#value == 'boolean') {
      this.set(!this.#value as V);
    }
    return this;
  }

  push<D extends V[keyof V]> (value : D) : this {
    if (Array.isArray(this.value)) {
      this.set([...this.value || [] , value] as V);
    }
    return this;
  }

}
