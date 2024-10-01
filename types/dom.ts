import {IPrimitiveParameters} from './values';
import {IPrimitiveClassName , IStyleOnly} from './element';
import {IParameterBag} from './parameter-bag';

export interface IPassiveWidgetElementInnerHTML {

  set innerHTML (html : string);

  get innerHTML () : string;

}

export interface IPassiveWidgetElementTagName {

  set tagName (name : string);

  get tagName () : string;

}

export interface IPassiveWidgetElementAttribute {

  get attributes () : IPrimitiveParameters;

  setAttribute<T extends keyof IPrimitiveParameters> (name : T | string , value : IPrimitiveParameters[T]) : void;

  getAttribute<T extends keyof IPrimitiveParameters> (name : T | string) : IPrimitiveParameters[T] | null;

  hasAttribute<T extends keyof IPrimitiveParameters> (name : T | string) : boolean;

  removeAttribute<T extends keyof IPrimitiveParameters> (name : T | string) : void;

}

export interface IPassiveWidgetElement extends IPassiveWidgetElementInnerHTML , IPassiveWidgetElementTagName , IPassiveWidgetElementAttribute {

  get textContent () : string;

  set textContent (text : string);

  get dataset (): IPrimitiveParameters;

  get classList(): IParameterBag<IPrimitiveClassName>;

  get style(): IStyleOnly;

  append (value : IPassiveWidgetElement | string) : void;

  remove(): void;

  toString () : string;

}