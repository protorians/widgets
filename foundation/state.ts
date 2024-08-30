import type {
  IState,
  ISupportableValue,
  IChildCallback,
  IAttributes,
  IWidgetElements,
  IStateSignals,
  IPointer, IParameterValue,
} from '../types';
import { PointerWidget } from './pointer';
import { Signalables,  type ISignalables } from '@protorians/signalable';

export class WidgetState<V extends ISupportableValue> implements IState<V> {

  #value : V;

  #initial? : V;

  #signal : Readonly<ISignalables<V,  IStateSignals<V>>>;

  #pointers : IPointer<any,  any>[] = [];

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

  get signal () {
    return this.#signal;
  }

  get pointers () {
    return this.#pointers;
  }

  updatePointers () {

    this.pointers.forEach(pointer => {
      pointer.render();
      this.signal.dispatch('pointer:updated',  pointer);
    });

    this.signal.dispatch('pointers:updated',  this.pointers);

    return this;

  }

  set (value : V) : this {

    this.#value = value;

    this.signal.dispatch('updated',  value);

    return this.updatePointers();

  }

  unset () : this {

    // @ts-ignore
    this.#value = undefined;

    this.signal.dispatch('destroy',  this);

    return this.updatePointers();

  }

  widget<P extends IAttributes,  E extends IWidgetElements> (callback : IChildCallback<P,  E>) : PointerWidget<P,  E> {

    const pointer = new PointerWidget(callback);

    this.pointers.push(pointer);

    this.signal.dispatch('used',  pointer);

    return pointer;

  }

  change(callback: () => IParameterValue){

    /**
     * Ajouter le `callback` dans un tableau
     * a chaque mise à jour re-rendre ce callback
     */

    return callback();
  }


  increment (value? : number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value + (value || 1)) as V);
    }
    return this;
  }

  decrement (value? : number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value - (value || 1)) as V);
    }
    return this;
  }

  multiply (value? : number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value * (value || 1)) as V);
    }
    return this;
  }

  divide (value? : number) {
    if (typeof this.#value == 'number') {
      this.set((this.#value / (value || 1)) as V);
    }
    return this;
  }

  push<D extends V[keyof V]> (value : D) {
    if (Array.isArray(this.value)) {
      this.set([...this.value || [],  value] as V);
    }
    return this;
  }

}
