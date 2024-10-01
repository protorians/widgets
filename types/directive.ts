import {IWidget , IWidgetElements} from './widget';
import {IChildren} from './children';
import {IAttributes} from './attributes';
import {IPointerMarkerElement} from './pointer';


export interface IDirectivesDictionary {
  children : IChildren<IAttributes , IWidgetElements>;
  'children.pointer' : IPointerMarkerElement;
}

export type IDirective<T extends keyof IDirectivesDictionary> = {
  widget : IWidget<any , any>;
  payload : IDirectivesDictionary[T];
}

export type IDirectives = {
  [T in keyof IDirectivesDictionary] : IDirective<T>;
};

export type IDirectiveDefinition<T extends keyof IDirectives> = {
  scope : T;
  make : (payload : IDirective<T>) => IDirectivesDictionary[T]
}