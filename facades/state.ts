import {
  IAttributes ,
  IContextualChildCallback ,
  IState ,
  ISupportableValue ,
  IWidgetElements ,
} from '../types';
import {WidgetState} from '../foundation';


// export function takeState<S extends ISupportableValue> (initial : S) {
//
//   return new WidgetState(initial);
//
// }

export function State<V extends ISupportableValue> (initial : V) {

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