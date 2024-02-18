import type { ISupportableValue } from "./values";

export interface IStateSchema {

    [K: string]: ISupportableValue

}


export type IStateProps = {

    name: string;

    initial?: ISupportableValue;

}

export type IStatePayload<S extends IStateSchema> = {

    [K in keyof S]?: ISupportableValue

}

export interface IState<V extends ISupportableValue> {

    get name(): string;

    get value(): V | undefined;

    get initial(): V | undefined;

    set(value: V): this;

    unset(): this;

}


export type IStateEntries<S extends IStateSchema> = {

    [K in keyof S]: S[K]

}

export interface IStates<S extends IStateSchema> {

    get entries(): IStateEntries<S>

}