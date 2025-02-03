import {
  ISignalController,
  ISignalControllerCallable,
  ISignalStack,
  ISignalStackCallable,
  ISignalStackEntries, ISignalStackEntry,
  ISignalStackOptions
} from "../types";
import {TreatmentQueueStatus} from "../enums";

export namespace SignalHook {

  export class Controller<I extends object> implements ISignalController<I> {
    protected effects: ISignalControllerCallable<any>[] = [];

    constructor(target: I) {
      this._current = this.reset(target);
    }

    protected _current: I;

    get current(): I {
      return this._current
    }

    update(target: I): this {
      Object.entries(target).forEach(([key, value]) => this._current[key] = value);
      return this;
    }

    reset(target: I): I {
      const _this = this;
      this._current = new Proxy<I>(target, {
        set(target: I, name: string | symbol, value: any, receiver: any) {
          _this.parse(target, name, value, receiver,);
          // return Reflect.set(target, name, value, receiver);
          return true;
        }
      })
      return this._current
    }

    assign<K extends keyof I>(key: K, value: I[K]): this {
      this._current[key] = value;
      return this;
    }

    effect(callable: ISignalControllerCallable<I>): this {
      this.effects[this.effects.length] = callable
      return this;
    }

    trigger<K extends keyof I>(name: K, value: I[K]): this {
      for (const key in this.effects) {
        this.effects[key]({
          target: this._current,
          name: name as string,
          value,
          receiver: value,
        })
      }
      return this;
    }

    compute(): I {
      const refactor: I = {} as I
      Object.entries(this._current).forEach(([name, value]) => {
        refactor[name] = value;
        this.trigger(name as keyof I, value)
      });
      return refactor;
    }

    parse(target: I, name: string | symbol, value: any, receiver: any): this {
      for (const key in this.effects) {
        this.effects[key]({
          target,
          name,
          value,
          receiver,
        })
      }
      return this
    }
  }


  export class Stack<M> implements ISignalStack<M> {

    protected _entries: ISignalStackEntries<M> = {} as ISignalStackEntries<M>;

    get entities(): ISignalStackEntries<M> {
      return this._entries;
    }

    listen<T extends keyof M>(type: T, callable: ISignalStackCallable<M[T]>, options?: ISignalStackOptions): this {

      this._entries[type] = this._entries[type] || [];

      this._entries[type].push({
        type,
        callable: callable as ISignalStackCallable<M[keyof M]>,
        options,
      })
      return this;
    }

    dispatch<T extends keyof M>(type: T, payload: M[T], embarked?: any): this {
      const entries = this._entries[type] || undefined;

      if (entries) {

        let cancellable: boolean = false;

        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index];

          if (entry.options?.cancellable === true && cancellable) {
            continue;
          }

          const parsed = entry.callable.apply(embarked || entry, [payload]);
          // const parsed = entry.callable(payload);

          if (parsed) {
            if (parsed === TreatmentQueueStatus.Cancel) cancellable = true;
            if (parsed === TreatmentQueueStatus.Exit) break;
          }
        }
      }

      return this;
    }

    remove<T extends keyof M>(type: T, index: number): this {

      if (this._entries[type] || undefined) {
        const refactor: ISignalStackEntry<M, keyof M>[] = []

        Object.entries(this._entries[type]).forEach(([rank, value]) => {
          if (parseInt(rank) !== index) refactor.push(value)
        })

        this._entries[type] = refactor;
      }

      return this;
    }

    removeStack<T extends keyof M>(type: T): this {
      const entries: ISignalStackEntries<M> = {} as ISignalStackEntries<M>;

      Object.keys(this._entries).forEach(key => {
        if (key != type) entries[key] = this._entries[key]
      })

      this._entries = entries;
      return this;
    }

    removeStacks(types: (keyof M)[]): this {
      const entries: ISignalStackEntries<M> = {} as ISignalStackEntries<M>;

      Object.keys(this._entries).forEach(key => {
        if (!types.includes(key as keyof M)) entries[key] = this._entries[key]
      })

      this._entries = entries;
      return this;
    }

    removeCallable<T extends keyof M>(callable: ISignalStackCallable<M[T]>, type?: T | undefined): this {
      const entries: ISignalStackEntries<M> = {} as ISignalStackEntries<M>;

      if (typeof type === "undefined" || type === null) {
        Object.keys(this._entries).forEach(key => {
          Object.values(entries[key] as ISignalStackEntry<M, keyof M>[])
            .forEach(entry => {
              if (entry.callable.toString() !== callable.toString()) entries[key] = this._entries[key]
            })
        })
      } else {
        Object.keys(this._entries).forEach(key => {
          if (key != type) entries[key] = this._entries[key]
        })
      }

      this._entries = entries;

      return this;
    }

    clear(): void {
      this._entries = {} as ISignalStackEntries<M>;
    }

  }

}
