import {ISupportableValue} from '../types';
import {WidgetState} from '../foundation';


export function takeState<S extends ISupportableValue>(initial: S) {

  return new WidgetState(initial);

}