import type {IParameterBag , IParameterBagArgument , IParameterBagConditional , IParameters} from '../types';
import {decamelize} from '../utilities';

export class ParameterBag<T extends IParameters> implements IParameterBag<T> {
  protected readonly _tokens : Map<keyof T , T[keyof T]> = new Map<keyof T , T[keyof T]>();

  get entries () : IterableIterator<[keyof T , T[keyof T]]> {
    return this._tokens.entries();
  }

  get values () : IterableIterator<T[keyof T]> {
    return this._tokens.values();
  }

  get keys () : IterableIterator<keyof T> {
    return this._tokens.keys();
  }

  get length () : number {
    return this._tokens.size;
  }

  public constructor (tokens ?: IParameterBagArgument<T>) {
    if(tokens) this.stabilizeToken(tokens).forEach((token) => this.add(token));
  }

  public serializeToken (token : T[keyof T]) : T[keyof T] {
    return (token && typeof token.toString == 'function') ? token.toString().trim() as T[keyof T] : token;
  }

  public stabilizeToken (tokens : IParameterBagArgument<T>) : T[keyof T][] {
    return (Array.isArray(tokens) ? tokens : [tokens]) as T[keyof T][];
  }

  public stringifyValue (value : T[keyof T]) : string {
    switch (typeof value) {
      case 'object':
        return Array.isArray(value) ? value.toString() : JSON.stringify(value);
      default:
        return `${value}`;
    }
  }

  public toArray () : [keyof T , T[keyof T]][] {
    return [...this.items()];
  }

  public toAttribute () : string[] {
    return this.toArray()
      .map(([key , value]) => {
        return `${key.toString()}="${this.stringifyValue(value)}"`;
      });
  }

  public toDeclaration (): string[] {
    return this.toArray()
      .map(([key , value]) => {
        return `${decamelize(key.toString())}:${this.stringifyValue(value)}`;
      });
  }

  public toString() : string {
    return JSON.stringify(this.toArray());
  }


  public add (tokens : IParameterBagArgument<T>) : this {
    this.stabilizeToken(tokens).forEach((token) => {
      this._tokens.set(this._tokens.size , this.serializeToken(token));
    });
    return this;
  }

  public remove (tokens : IParameterBagArgument<T>) : this {
    this.indexes(tokens).forEach((token) => this._tokens.delete(token));
    return this;
  }

  public reset () : this {
    this._tokens.clear();
    return this;
  }

  public toggle (tokens : IParameterBagArgument<T> , condition? : IParameterBagConditional<T>) : this {
    const conditional : IParameterBagConditional<T> = condition || ((token) => {
      const index = this.index(token);
      if (typeof index !== 'undefined') return this._tokens.has(index);
      return false;
    });

    this.stabilizeToken(tokens)
      .forEach((token : T[keyof T]) => {
        if (conditional(token)) this.remove(token);
        else this.add(token);
      });
    return this;
  }

  public replace (tokens : IParameterBagArgument<T> , replacements : T[keyof T] | T[keyof T][]) : this {
    const replaces = this.stabilizeToken(replacements);
    this.indexes(tokens).forEach((index) => {
      replaces.forEach((replacement) => {
        this._tokens.set(index , replacement);
      });
    });
    return this;
  }

  public item (key : number): T[keyof T]|undefined {
    return this._tokens.get(key);
  }

  public items () : IterableIterator<[keyof T , T[keyof T]]> {
    return this._tokens.entries();
  }

  public indexes (token : IParameterBagArgument<T>) : (keyof T)[] {
    const tokens = this.stabilizeToken(token);
    return [...this._tokens.entries()].map(([key , value]) => {
      return tokens.includes(value) ? key : undefined;
    }).filter(key => typeof key !== 'undefined') as (keyof T)[];
  }

  public index (tokens : IParameterBagArgument<T>) : keyof T | undefined {
    tokens = this.stabilizeToken(tokens);
    for (const [key , value] of this._tokens.entries()) {
      if (tokens.includes(value)) return key;
    }
    return undefined;
  }

  public contains (tokens : IParameterBagArgument<T>) : boolean {
    return typeof this.index(tokens) !== 'undefined';
  }

}
