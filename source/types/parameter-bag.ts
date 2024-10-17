import {IParameters} from './values';

export type IParameterBagConditional<T extends IParameters> = (token : T[keyof T]) => boolean;

export type IParameterBagArgument<T extends IParameters> = Partial<T[keyof T]> | (Partial<T[keyof T]>)[];


export interface IParameterBag<T extends IParameters> {

  get entries () : IterableIterator<[keyof T , T[keyof T]]>;

  get values () : IterableIterator<T[keyof T]>;

  get keys () : IterableIterator<keyof T>;

  get length () : number;

  serializeToken (token : T[keyof T]) : T[keyof T];

  stabilizeToken (tokens : IParameterBagArgument<T>) : T[keyof T][];

  stringifyValue (value : T[keyof T]) : string;

  item (key : number) : T[keyof T] | undefined;

  items () : IterableIterator<[keyof T , T[keyof T]]>;

  indexes (token : IParameterBagArgument<T>) : (keyof T)[];

  index (tokens : IParameterBagArgument<T>) : keyof T | undefined;

  contains (tokens : IParameterBagArgument<T>) : boolean;

  add (tokens : IParameterBagArgument<T>) : this;

  remove (tokens : IParameterBagArgument<T>) : this;

  reset () : this;

  toggle (tokens : IParameterBagArgument<T> , condition? : IParameterBagConditional<T>) : this;

  replace (tokens : IParameterBagArgument<T> , replacements : T[keyof T] | T[keyof T][]) : this;

  toArray () : [keyof T , T[keyof T]][];

  toAttribute () : string[];

  toDeclaration () : string[];

  toString () : string;

}