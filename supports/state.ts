import type { IState, IStates, IStateEntries, IStateSchema } from "../types/state";
import type { ISupportableValue } from "../types/values";



export class State<V extends ISupportableValue> implements IState<V>{

    #name: string;

    #value?: V;

    #initial?: V;


    constructor(name: string, value?: V) {

        this.#name = name;

        this.#value = value;

        this.#initial = value;

    }


    get name(): string { return this.#name }

    get value(): V | undefined { return this.#value }

    get initial(): V | undefined { return this.#initial }

    set(value: V): this {

        this.#value = value;

        return this;

    }

    unset(): this {

        return this;

    }

}


export class States<S extends IStateSchema> implements IStates<S>{

    #entries: IStateEntries<S> = {} as IStateEntries<S>

    get entries(): IStateEntries<S> { return this.#entries }

    entry(name: keyof IStateEntries<S>) {

        return this.entries[name];

    }

}