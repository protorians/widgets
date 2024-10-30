import type {
  IAttributes ,
  IContextualChildCallback ,
  IState , IStateSignals ,
  ISupportableValue ,
  IWidgetElements ,
} from '../types';
import {createContext , WidgetState} from '../foundation';
import {Environment} from '../foundation/environment';
import {type ISignalables , Signalables} from '@protorians/signalable';
import {WidgetNode} from '../supports';

export function State<V extends ISupportableValue> (initial : V) {

  if(!Environment.Browser()){
    return {
      get value () : V {
        return initial;
      },
      set value(value: V){
        initial = value;
      },
      get initial () : V | undefined {
        return initial;
      },
      get signals () : Readonly<ISignalables<V , IStateSignals<V>>> {
        return new Signalables(initial)
      },
      updatePointers ()  {
        return this;
      },
      set (value : V) {
        initial = value;
        return this;
      },
      unset (){
        initial = undefined as V
        return this;
      },
      widget<P extends IAttributes , E extends IWidgetElements> (callback : IContextualChildCallback<V , P , E>) {
        console.warn('WARN : WidgetState widget property is available only on Client\ncallback :', callback)
        return callback(
          createContext<V, P, E>({
            payload: initial,
            widget: new WidgetNode<any, E>({})
          })
        )
      },
      increment (value? : number) {
        console.warn('WARN : WidgetState.increment() is available only on Client\nvalue :', value)
        return this;
      },
      decrement (value? : number) {
        console.warn('WARN : WidgetState.decrement() is available only on Client\nvalue :', value)
        return this;
      },
      multiply (value? : number) {
        console.warn('WARN : WidgetState.multiply() is available only on Client\nvalue :', value)
        return this;
      },
      divide (value? : number) {
        console.warn('WARN : WidgetState.divide() is available only on Client\nvalue :', value)
        return this;
      },
      activate () {
        console.warn('WARN : WidgetState.activate() is available only on Client')
        return this;
      },
      deactivate () {
        console.warn('WARN : WidgetState.deactivate() is available only on Client Side')
        return this;
      },
      cancel () {
        console.warn('WARN : WidgetState.cancel() is available only on Client Side')
        return this;
      },
      toggle () {
        console.warn('WARN : WidgetState.toggle() is available only on Client Side')
        return this;
      },
      push<D extends V[keyof V]> (value : D) {
        console.warn('WARN : WidgetState.push() is available only on Client Side\nvalue :', value)
        return this;
      }
    } as IState<V>
  }

  const state = new WidgetState<V>(initial);
  const payload : IState<V> = {} as IState<V>;

  Object.defineProperties(
    payload ,
    {
      value: {
        get () {
          return state.value;
        } ,
        set (v : V) {
          state.set(v);
        } ,
      } ,
      initial: {
        value: initial ,
        writable: false ,
      } ,
      signals: {
        value: state.signals ,
        writable: false ,
      } ,
      pointers: {
        value: state.pointers ,
        writable: false ,
      } ,
    } ,
  );

  payload.updatePointers = () => state.updatePointers();

  payload.set = (value : V) => state.set(value);

  payload.unset = () => state.unset();

  payload.widget = <P extends IAttributes , E extends IWidgetElements> (
    callback : IContextualChildCallback<V , P , E> ,
  ) => state.widget(callback);

  payload.increment = (value) => state.increment(value);

  payload.decrement = (value) => state.decrement(value);

  payload.multiply = (value) => state.multiply(value);

  payload.divide = (value) => state.divide(value);

  payload.activate = () => state.activate();

  payload.deactivate = () => state.deactivate();

  payload.cancel = () => state.cancel();

  payload.toggle = () => state.toggle();

  payload.push = <D extends V[keyof V]> (value : D) => state.push(value);

  return payload;
}