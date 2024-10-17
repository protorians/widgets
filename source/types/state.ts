import type {ISupportableValue} from './values';
import type {ISignalables} from '@protorians/signalable';
import type {IPointer} from './pointer';
import type {IAttributes} from './attributes';
import type {IWidget , IWidgetElements} from './widget';
import type {IContextualChildCallback} from './children';

export type IStateSignals<V extends ISupportableValue> = {

  'pointer:updated' : IPointer<V , any , any>;

  'pointers:updated' : IPointer<V , any , any>[];

  updated : V;

  destroy : IState<V>;

  used : IPointer<V , any , any>;

}

export interface IState<V extends ISupportableValue> {

  /**
   * Get State value
   */
  get value () : V;

  /**
   * Get initial State value
   */
  get initial () : V | undefined;

  /**
   * Get State signals for events
   */
  get signals () : Readonly<ISignalables<V , IStateSignals<V>>>;

  /**
   * Change State value
   * @param value
   */
  set (value : V) : this;

  /**
   * Destroy state
   */
  unset () : this;

  /**
   *
   * @param callback
   */
  widget<P extends IAttributes , E extends IWidgetElements> (callback : IContextualChildCallback<V , P , E>) : IPointer<V , P , E> | IWidget<any , IWidgetElements>;

  /**
   * Trigger pointer's update
   */
  updatePointers () : this;

  /**
   * If `value` is `number`
   * @param value
   */
  increment (value? : number) : this;

  /**
   * If `value` is `number`
   * @param value
   */
  decrement (value? : number) : this;

  /**
   * If `value` is `number`
   * @param value
   */
  multiply (value? : number) : this;

  /**
   * If `value` is `number`
   * @param value
   */
  divide (value? : number) : this;

  /**
   * If `value` is `boolean`
   * Set `value` to `true`
   */
  activate () : this;

  /**
   * If `value` is `boolean`
   * Set `value` to `false`
   */
  deactivate () : this;

  /**
   * Set `value` to `null`
   */
  cancel () : this;

  /**
   * If `value` as `boolean`
   */
  toggle () : this;

  /**
   * Add value in State value if value is `array`
   * @param value
   */
  push<D extends V[keyof V]> (value : D) : this;

}
