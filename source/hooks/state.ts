import type {IState, IStatePayload, ISignalController, IStateCallable} from "../types";
import {SignalHook} from "./signal";


export class StateWidget<T> implements IState<T> {

  protected controller: ISignalController<IStatePayload<T | undefined>>
  protected payload: IStatePayload<T>

  constructor(
    protected initial: T | undefined
  ) {
    this.payload = {data: initial}
    this.controller = new SignalHook.Controller(this.payload);
    this.effect((state) => this.payload.data = state)
  }

  get value(): T | undefined {
    return this.controller.current.data;
  }

  set(data: T): this {
    this.controller.current.data = data;
    return this
  }

  reset(): this {
    this.controller.current.data = this.initial
    return this;
  }

  effect(callable: IStateCallable<T | undefined>): this {
    this.controller.effect(({value}) => callable(value))
    return this;
  }

}
