import type {IDirective , IDirectiveDefinition , IDirectives , IDirectivesDictionary} from '../types';

class Directives {
  static dictionary : IDirectiveDefinition<any>[] = [];

  static define<T extends keyof IDirectives> (definition : IDirectiveDefinition<T>) {
    this.dictionary[this.dictionary.length] = definition;
    return this;
  }

  static parse<T extends keyof IDirectives> (scope : T , data : IDirective<T>) {
    let value : IDirectivesDictionary[T] = data.payload;
    this.dictionary
      .filter(definition => typeof definition !== 'undefined' && definition.scope && definition.scope === scope)
      .map(definition => value = definition.make(data));
    return value;
  }
}

globalThis.WidgetDirectives = typeof globalThis.WidgetDirectives !== 'undefined' ? globalThis.WidgetDirectives : Directives;

export const WidgetDirectives = globalThis.WidgetDirectives;

export {Directives};