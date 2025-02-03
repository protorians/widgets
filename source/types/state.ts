export type IStateCallable<T> = (value: T) => any

export type IStatePayload<T> = {
  data: T | undefined;
}

export type IStateStack = {
  [K: string]: IState<any>
}

export interface IState<T> {
  get value(): T | undefined;

  set(payload: Partial<T>): this;

  effect(callable: IStateCallable<T | undefined>): this;

  reset(): this;
}